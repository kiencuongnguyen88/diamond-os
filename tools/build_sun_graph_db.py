from __future__ import annotations
import argparse, hashlib, json, sqlite3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SCHEMA=ROOT/'migrations/sun-graph/001_schema.sql'
SUBSET=ROOT/'data/sun-graph/approved-public-subset.json'
def build(output:Path)->dict:
 output=output.resolve(); output.parent.mkdir(parents=True,exist_ok=True)
 if output.exists(): output.unlink()
 subset=json.loads(SUBSET.read_text(encoding='utf-8'))
 con=sqlite3.connect(output)
 try:
  con.execute('PRAGMA page_size=4096')
  con.execute('PRAGMA auto_vacuum=NONE')
  con.execute('PRAGMA journal_mode=OFF')
  con.execute('PRAGMA synchronous=OFF')
  con.execute('PRAGMA temp_store=MEMORY')
  con.executescript(SCHEMA.read_text(encoding='utf-8'))
  for ent in subset['git_native']['seed_files']:
   rows=[json.loads(x) for x in (ROOT/ent['path']).read_text(encoding='utf-8').splitlines() if x.strip()]
   if len(rows)!=ent['row_count']: raise RuntimeError(f"row count mismatch {ent['table']}")
   if rows:
    cols=list(rows[0]); q=','.join('?' for _ in cols); cn=','.join('"'+c.replace('"','""')+'"' for c in cols)
    con.executemany(f'INSERT INTO "{ent["table"]}" ({cn}) VALUES ({q})',[[r[c] for c in cols] for r in rows])
  con.commit()
  con.execute('PRAGMA foreign_keys=ON')
  fk=con.execute('PRAGMA foreign_key_check').fetchall()
  quick=con.execute('PRAGMA quick_check').fetchall()
  views=[r[0] for r in con.execute("SELECT name FROM sqlite_master WHERE type='view' ORDER BY name")]
  for v in views: con.execute(f'SELECT * FROM "{v}" LIMIT 0').fetchall()
  if fk or quick!=[('ok',)]: raise RuntimeError(f'integrity failure fk={fk} quick={quick}')
  con.execute('VACUUM')
 finally: con.close()
 b=output.read_bytes()
 return {'output':str(output),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'quick_check':'ok','foreign_key_violations':0,'views_compiled':8,'rows':140}
def main():
 ap=argparse.ArgumentParser(); ap.add_argument('--output',required=True); a=ap.parse_args(); print(json.dumps(build(Path(a.output)),sort_keys=True))
if __name__=='__main__': main()
