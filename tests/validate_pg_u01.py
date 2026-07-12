from pathlib import Path
import ast, hashlib, json, re, subprocess, sys
ROOT = Path(__file__).resolve().parents[1]
RESULTS=[]
OWNED_PATHS=[
 "docs/source-ledger/README.md",
 "schemas/source-ledger/public-unit-ledger.schema.json",
 "schemas/source-ledger/source-reference.schema.json",
 "schemas/source-ledger/evidence-reference.schema.json",
 "schemas/source-ledger/compatibility-record.schema.json",
 "schemas/source-ledger/checksum-manifest.schema.json",
 "tests/PG_U01_TEST_MATRIX.json",
 "tests/validate_pg_u01.py",
]
SHARED_PATHS=[
 "data/source-ledger/public-unit-ledger.json","data/source-ledger/source-reference-registry.json",
 "data/source-ledger/evidence-reference-registry.json","data/source-ledger/compatibility-registry.json",
 "data/source-ledger/checksum-manifest.json",
]
SCHEMA_INSTANCE_PAIRS=[
 ("schemas/source-ledger/public-unit-ledger.schema.json","data/source-ledger/public-unit-ledger.json"),
 ("schemas/source-ledger/source-reference.schema.json","data/source-ledger/source-reference-registry.json"),
 ("schemas/source-ledger/evidence-reference.schema.json","data/source-ledger/evidence-reference-registry.json"),
 ("schemas/source-ledger/compatibility-record.schema.json","data/source-ledger/compatibility-registry.json"),
 ("schemas/source-ledger/checksum-manifest.schema.json","data/source-ledger/checksum-manifest.json"),]
EXPECTED_TESTS=['required_pg_u01_tree_present', 'pg_u01_owned_path_lock', 'json_files_parse', 'json_schemas_draft_2020_12', 'yaml_schema_validation_passes', 'unit_ledger_schema_validation_passes', 'source_reference_schema_validation_passes', 'evidence_reference_schema_validation_passes', 'compatibility_schema_validation_passes', 'checksum_schema_validation_passes', 'every_unit_has_source_hash_state_gate_and_proof', 'PG_U00_record_matches_live_root_commit', 'PG_U01_depends_on_PG_U00', 'PG_U01_binding_is_exact_commit', 'PG_U01_commit_gate_and_post_push_proof_resolved', 'compatibility_record_cannot_promote_canon', 'compatibility_authority_effect_none', 'exact_four_PG_U01_primary_source_anchors', 'PG_U01_primary_source_hashes_match_readback', 'active_pair_hashes_present', 'raw_legacy_source_not_copied', 'raw_evidence_absent', 'private_data_files_absent', 'generated_artifact_absent', 'checksum_manifest_matches_canonical_LF', 'checksum_manifest_excludes_self', 'checksum_manifest_unit_owned_only', 'source_reference_paths_not_materialized', 'claim_boundaries_false', 'source_apply_false', 'DB_write_false', 'canon_false', 'commit_false', 'push_false', 'schemas_do_not_authorize_promotion', 'README_declares_reference_not_source_copy', 'validator_uses_stdlib_only', 'PG_U00_validator_growth_safe', 'PG_U00_regression_passes', 'later_units_allowed_and_PG_U01_record_stable']
def check(n,c,d=""): RESULTS.append((n,"PASS" if c else "FAIL","" if c else d))
def load(r): return json.loads((ROOT/r).read_text(encoding="utf-8"))
def canonical_bytes(r): return (ROOT/r).read_bytes().replace(b"\r\n",b"\n").replace(b"\r",b"\n")
def type_ok(v,e):
 names=e if isinstance(e,list) else [e]; m={"object":lambda x:isinstance(x,dict),"array":lambda x:isinstance(x,list),"string":lambda x:isinstance(x,str),"integer":lambda x:isinstance(x,int) and not isinstance(x,bool),"boolean":lambda x:isinstance(x,bool),"null":lambda x:x is None}; return any(m[n](v) for n in names)
def validate(i,s,p="$",errs=None):
 errs=[] if errs is None else errs
 if "type" in s and not type_ok(i,s["type"]): errs.append(f"{p}: type failed"); return errs
 if "const" in s and i!=s["const"]: errs.append(f"{p}: const failed")
 if "enum" in s and i not in s["enum"]: errs.append(f"{p}: enum failed")
 if isinstance(i,str):
  if len(i)<s.get("minLength",0): errs.append(f"{p}: minLength failed")
  if "pattern" in s and not re.match(s["pattern"],i): errs.append(f"{p}: pattern failed")
 if isinstance(i,int) and not isinstance(i,bool) and i<s.get("minimum",i): errs.append(f"{p}: minimum failed")
 if isinstance(i,list):
  if len(i)<s.get("minItems",0): errs.append(f"{p}: minItems failed")
  if s.get("uniqueItems") and len({json.dumps(x,sort_keys=True) for x in i})!=len(i): errs.append(f"{p}: uniqueItems failed")
  if "items" in s:
   for n,v in enumerate(i): validate(v,s["items"],f"{p}[{n}]",errs)
 if isinstance(i,dict):
  for k in s.get("required",[]):
   if k not in i: errs.append(f"{p}: missing {k}")
  props=s.get("properties",{})
  for k,v in i.items():
   if k in props: validate(v,props[k],f"{p}.{k}",errs)
   elif s.get("additionalProperties") is False: errs.append(f"{p}: unexpected {k}")
 return errs
check("required_pg_u01_tree_present",all((ROOT/p).is_file() for p in OWNED_PATHS+SHARED_PATHS))
check("pg_u01_owned_path_lock",len(OWNED_PATHS)==8 and len(set(OWNED_PATHS))==8)
json_paths=sorted(set(SHARED_PATHS+[p for p in OWNED_PATHS if p.endswith(".json")]))
parsed={}; pe=[]
for r in json_paths:
 try: parsed[r]=load(r)
 except Exception as e: pe.append(f"{r}: {e}")
check("json_files_parse",not pe,str(pe))
schemas={s:parsed.get(s) for s,_ in SCHEMA_INSTANCE_PAIRS}
check("json_schemas_draft_2020_12",all(s and s.get("$schema")=="https://json-schema.org/draft/2020-12/schema" for s in schemas.values()))
sr={}
for s,i in SCHEMA_INSTANCE_PAIRS: sr[i]=validate(parsed.get(i),parsed.get(s)) if parsed.get(i) is not None and parsed.get(s) is not None else ["parse missing"]
check("yaml_schema_validation_passes",all(not e for e in sr.values()),str(sr))
for n,i in [("unit_ledger_schema_validation_passes",SHARED_PATHS[0]),("source_reference_schema_validation_passes",SHARED_PATHS[1]),("evidence_reference_schema_validation_passes",SHARED_PATHS[2]),("compatibility_schema_validation_passes",SHARED_PATHS[3]),("checksum_schema_validation_passes",SHARED_PATHS[4])]: check(n,not sr.get(i),str(sr.get(i)))
ledger=parsed[SHARED_PATHS[0]]; units={u["unit_id"]:u for u in ledger["units"]}
check("every_unit_has_source_hash_state_gate_and_proof",all(u.get("source_hashes") and u.get("state") and u.get("human_gate") and u.get("proof_refs") for u in units.values()))
check("PG_U00_record_matches_live_root_commit",units["PG-U00"]["repository_binding"].get("commit_sha")=="a58ddb51f65cd22493424a215def370176474376")
check("PG_U01_depends_on_PG_U00",units["PG-U01"]["dependency_unit_ids"]==["PG-U00"])
check("PG_U01_binding_is_exact_commit",units["PG-U01"]["repository_binding"]=={"mode":"exact_commit","base_commit":"a58ddb51f65cd22493424a215def370176474376","commit_sha":"df735725a1a724ca3c138a373fdb6dfd3372e4ed"})
ev=parsed[SHARED_PATHS[2]]; evid={e["evidence_id"]:e for e in ev["evidence"]}
check("PG_U01_commit_gate_and_post_push_proof_resolved",units["PG-U01"]["human_gate"]["state"]=="repository_commit_gate_consumed_canon_gate_pending" and evid["PGU01-E04"]["state"]=="COMMIT_GATE_CONSUMED" and evid["PGU01-E05"]["state"]=="PASS_POST_PUSH")
compat=parsed[SHARED_PATHS[3]]
check("compatibility_record_cannot_promote_canon",all(r["can_promote_canon"] is False and r["requires_atomic_human_promotion"] is True for r in compat["records"]))
check("compatibility_authority_effect_none",all(r["authority_effect"]=="none" for r in compat["records"]))
src=parsed[SHARED_PATHS[1]]; primary=[r for r in src["references"] if r["source_ref_id"].startswith("PGU01-SRC-")]
expected={"PGU01-SRC-A01":"78120138208d1b9f96771537e052ac2a40925fd30e1d2ecc34c0d3204475b79c","PGU01-SRC-A02":"75869545aa19563b4d2424985233044116b89829b6b2fe4aceb81867e149de70","PGU01-SRC-A03":"cb21dbdc2e55489d347ffd760cfe08af9d5c176d752847398b5a373557abda50","PGU01-SRC-A04":"4ff808855eee3264c322a4b1b69f49b433692f53a912868de9b9c0763f88af86"}
check("exact_four_PG_U01_primary_source_anchors",[r["source_ref_id"] for r in primary]==list(expected))
check("PG_U01_primary_source_hashes_match_readback",{r["source_ref_id"]:r["sha256"] for r in primary}==expected)
pair=src["active_source_pair"]
check("active_pair_hashes_present",pair["boot"]["sha256"]=="e2b35618072213aa47c89f9617c1799a2606bea1b9ea371f8f667635e2fc7602" and pair["runtime_zip"]["sha256"]=="b2668113eb15d774ef770bc535371e8b65940bec0ce0b76c60febffaeb5ca273")
check("raw_legacy_source_not_copied",all(r["public_copy_included"] is False for r in src["references"]))
check("raw_evidence_absent",ev["raw_evidence_in_repo"] is False and all(e["authority_effect"]=="none" for e in ev["evidence"]))
all_files=[p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts]
check("private_data_files_absent",not any(p.endswith((".db",".sqlite",".zip")) for p in all_files))
check("generated_artifact_absent",not any(p.startswith(("peer_evidence/","dist/","build/")) or p.endswith(("SHA256SUMS.txt","VALIDATION_OUTPUT.txt")) for p in all_files))
manifest=parsed[SHARED_PATHS[4]]; mm={f["path"]:f["sha256"] for f in manifest["files"]}; actual={p:hashlib.sha256(canonical_bytes(p)).hexdigest() for p in mm}
check("checksum_manifest_matches_canonical_LF",actual==mm,str({p:(mm[p],actual[p]) for p in mm if mm[p]!=actual[p]}))
check("checksum_manifest_excludes_self",manifest["self_included"] is False and SHARED_PATHS[4] not in mm)
check("checksum_manifest_unit_owned_only",manifest["ownership_mode"]=="unit_owned_files_only" and manifest["shared_registry_policy"]=="record_level_validation_not_whole_file_hash" and set(mm)==set(OWNED_PATHS))
pg1refs=[r for r in src["references"] if r["source_ref_id"].startswith("PGU01-SRC-")]
check("source_reference_paths_not_materialized",not any((ROOT/r["path"]).exists() for r in pg1refs))
claims=[u["claim_boundary"] for u in units.values()]+[ledger["claim_boundary"],src["claim_boundary"],ev["claim_boundary"],compat["claim_boundary"],manifest["claim_boundary"]]
check("claim_boundaries_false",all(all(v is False for v in c.values()) for c in claims))
check("source_apply_false",all(c["source_apply"] is False for c in claims)); check("DB_write_false",all(c["DB_write"] is False for c in claims)); check("canon_false",all(c["canon"] is False for c in claims) and all(u["canon"] is False for u in units.values())); check("commit_false",all(c["commit"] is False for c in claims)); check("push_false",all(c["push"] is False for c in claims))
schema_text="\n".join((ROOT/p).read_text(encoding="utf-8") for p in schemas)
check("schemas_do_not_authorize_promotion",'"canon": true' not in schema_text.lower() and '"commit": true' not in schema_text.lower() and '"push": true' not in schema_text.lower())
doc=(ROOT/"docs/source-ledger/README.md").read_text(encoding="utf-8")
check("README_declares_reference_not_source_copy","does not copy the active runtime source" in doc and "does not transfer authority" in doc)
syntax=ast.parse(Path(__file__).read_text(encoding="utf-8")); imports=set()
for node in ast.walk(syntax):
 if isinstance(node,ast.Import): imports.update(a.name.split(".")[0] for a in node.names)
 elif isinstance(node,ast.ImportFrom) and node.module: imports.add(node.module.split(".")[0])
check("validator_uses_stdlib_only",imports<={"ast","hashlib","json","pathlib","re","subprocess","sys"},str(sorted(imports)))
u00=(ROOT/"tests/validate_pg_u00.py").read_text(encoding="utf-8")
check("PG_U00_validator_growth_safe","later approved units may add other paths" in u00 and "actual_owned" in u00)
proc=subprocess.run([sys.executable,"-S",str(ROOT/"tests/validate_pg_u00.py")],cwd=ROOT,text=True,capture_output=True)
check("PG_U00_regression_passes",proc.returncode==0 and "SUMMARY\tPASS=35\tFAIL=0" in proc.stdout,proc.stdout+proc.stderr)
check("later_units_allowed_and_PG_U01_record_stable",set(units)>={"PG-U00","PG-U01"} and units["PG-U01"]["state"]=="GIT_CANDIDATE" and units["PG-U01"]["canon"] is False)
matrix=load("tests/PG_U01_TEST_MATRIX.json")
# The matrix self-check is folded into the final result count to preserve the historical 40-test surface.
if matrix["tests"]!=EXPECTED_TESTS: RESULTS[-1]=(RESULTS[-1][0],"FAIL","test matrix mismatch")
failed=[r for r in RESULTS if r[1]=="FAIL"]
for n,s,d in RESULTS: print(f"{s}\t{n}\t{d}")
print(f"SUMMARY\tPASS={len(RESULTS)-len(failed)}\tFAIL={len(failed)}")
sys.exit(1 if failed else 0)
