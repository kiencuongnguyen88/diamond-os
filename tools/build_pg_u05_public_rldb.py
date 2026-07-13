from __future__ import annotations
import json, sqlite3, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
TARGET=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'build'/'generated'/'pg_u05_public_rldb.db'
TARGET.parent.mkdir(parents=True,exist_ok=True)
if TARGET.exists(): TARGET.unlink()
con=sqlite3.connect(TARGET)
try:
    con.executescript((ROOT/'schemas/rldb-public-core.sql').read_text(encoding='utf-8'))
    rows=[json.loads(x) for x in (ROOT/'data/rldb/public-system-protocol-rows.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
    for item in rows:
        row=item['row']; cols=list(row); q=','.join('?' for _ in cols)
        con.execute(f'INSERT INTO "{item["source_table"]}" ({",".join(cols)}) VALUES ({q})',[row[c] for c in cols])
    fixtures=[json.loads(x) for x in (ROOT/'data/rldb/synthetic-public-fixtures.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
    project=fixtures[0]['rows']['project_map_dependency']
    cols=list(project); con.execute(f'INSERT OR IGNORE INTO project_map ({",".join(cols)}) VALUES ({",".join("?" for _ in cols)})',[project[c] for c in cols])
    order=['learning_records','lifecycle_log','rldb_recall_index','drc_import_rldb_eval_cases','rldb_protocol_decision_queue']
    for fixture in fixtures:
        for table in order:
            if table not in fixture['rows']: continue
            row=fixture['rows'][table]; cols=list(row)
            con.execute(f'INSERT INTO "{table}" ({",".join(cols)}) VALUES ({",".join("?" for _ in cols)})',[row[c] for c in cols])
    con.commit()
    qc=con.execute('PRAGMA quick_check').fetchone()[0]
    fk=con.execute('PRAGMA foreign_key_check').fetchall()
    print(json.dumps({'target':str(TARGET),'quick_check':qc,'foreign_key_violations':len(fk),'system_rows':len(rows),'fixture_bundles':len(fixtures)},indent=2))
    raise SystemExit(0 if qc=='ok' and not fk else 1)
finally:
    con.close()
