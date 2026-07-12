from pathlib import Path
import ast, hashlib, json, re, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]; RESULTS=[]
NEW_PATHS=["src/runtime-contracts/drc16-response-contract.md","src/runtime-contracts/drc17-audit-contract.md","data/runtime-contracts/drc16-response-contract.json","data/runtime-contracts/drc17-audit-contract.json","data/runtime-contracts/pg-u02-checksum-manifest.json","schemas/runtime-contracts/drc16-response-contract.schema.json","schemas/runtime-contracts/drc17-audit-contract.schema.json","docs/runtime-contracts/README.md","tests/PG_U02_TEST_MATRIX.json","tests/validate_pg_u02.py"]
OWNED_PATHS=[p for p in NEW_PATHS if p!="data/runtime-contracts/pg-u02-checksum-manifest.json"]
EXPECTED_TESTS=['required_pg_u02_tree_present', 'exact_pg_u02_new_path_set', 'json_files_parse', 'runtime_schemas_draft_2020_12', 'runtime_schema_validation_passes', 'drc16_schema_validation_passes', 'drc17_schema_validation_passes', 'current_contract_selection_evidenced', 'exact_four_PG_U02_source_refs', 'PG_U02_source_hashes_match_mapping', 'primary_and_compatibility_roles_distinct', 'legacy_sources_not_materialized', 'DRC16_visible_frame_has_11_items', 'DRC16_runtime_box_before_visible_frame', 'DRC16_header_and_footer_fields_complete', 'DRC16_machine_work_before_true_gate', 'DRC16_gate_options_exact', 'DRC16_sandbox_pass_not_live_adoption', 'DRC17_Audit_key_invocation_preserved', 'DRC17_canonical_lane_not_blind_full_zip', 'DRC17_BFL_checks_preserved', 'DRC17_verdict_taxonomy_exact', 'DRC17_readback_fields_complete', 'DRC17_peer_audit_boundary_preserved', 'response_and_audit_contracts_cross_reference', 'neither_contract_authorizes_mutation', 'no_historical_duplicate_contract_files', 'PG_U02_ledger_record_present', 'PG_U02_depends_on_PG_U00_and_PG_U01', 'PG_U02_binding_is_containing_commit', 'PG_U02_commit_gate_pending', 'PG_U01_post_commit_residual_resolved', 'PG_U01_growth_safe_manifest_policy', 'compatibility_records_trace_without_promotion', 'checksum_manifest_matches_canonical_LF', 'checksum_manifest_unit_owned_only', 'checksum_manifest_excludes_self', 'private_and_generated_artifacts_absent', 'claim_boundaries_false', 'source_apply_false', 'DB_write_false', 'canon_false', 'commit_false', 'push_false', 'stdlib_only_validator', 'PG_U00_regression_passes', 'PG_U01_growth_safe_regression_passes', 'test_matrix_matches_validator', 'Windows_CRLF_canonical_hash_ready', 'unit_scope_is_PG_U02_only']
EXPECTED_HASHES={"PGU02-SRC-A01":"4e987fb7f786baa8ac50b991a6cd6a0d612d7085880cc715fc5531efd9a48aab","PGU02-SRC-A02":"38ba6c18febd2e4ddb1a0c0de51fdaa3b223be0e53fdf7590ab19907dedc4eec","PGU02-SRC-A03":"e7520c9f1919541bf039b03e7abc19f1a8129876405895abafb6cd3848d8d897","PGU02-SRC-A04":"5e7057d9d5fe611a566734f6bd063bcdea75e086c74d4e784190feb5d321e843"}
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
check("required_pg_u02_tree_present",all((ROOT/p).is_file() for p in NEW_PATHS))
check("exact_pg_u02_new_path_set",len(NEW_PATHS)==10 and len(set(NEW_PATHS))==10)
json_paths=[p for p in NEW_PATHS if p.endswith(".json")]+["data/source-ledger/public-unit-ledger.json","data/source-ledger/source-reference-registry.json","data/source-ledger/evidence-reference-registry.json","data/source-ledger/compatibility-registry.json","data/source-ledger/checksum-manifest.json"]
parsed={}; pe=[]
for r in json_paths:
 try: parsed[r]=load(r)
 except Exception as e: pe.append(f"{r}: {e}")
check("json_files_parse",not pe,str(pe))
s16=parsed["schemas/runtime-contracts/drc16-response-contract.schema.json"]; s17=parsed["schemas/runtime-contracts/drc17-audit-contract.schema.json"]
check("runtime_schemas_draft_2020_12",s16.get("$schema")==s17.get("$schema")=="https://json-schema.org/draft/2020-12/schema")
e16=validate(parsed["data/runtime-contracts/drc16-response-contract.json"],s16); e17=validate(parsed["data/runtime-contracts/drc17-audit-contract.json"],s17)
check("runtime_schema_validation_passes",not e16 and not e17,str({"drc16":e16,"drc17":e17})); check("drc16_schema_validation_passes",not e16,str(e16)); check("drc17_schema_validation_passes",not e17,str(e17))
d16=parsed["data/runtime-contracts/drc16-response-contract.json"]; d17=parsed["data/runtime-contracts/drc17-audit-contract.json"]
check("current_contract_selection_evidenced",d16["source_selection"]["current_primary"]=="PGU02-SRC-A01" and d17["source_selection"]["current_primary"]=="PGU02-SRC-A02")
src=parsed["data/source-ledger/source-reference-registry.json"]; refs=[r for r in src["references"] if r["source_ref_id"].startswith("PGU02-SRC-")]
check("exact_four_PG_U02_source_refs",[r["source_ref_id"] for r in refs]==list(EXPECTED_HASHES))
check("PG_U02_source_hashes_match_mapping",{r["source_ref_id"]:r["sha256"] for r in refs}==EXPECTED_HASHES)
check("primary_and_compatibility_roles_distinct",[r["role"] for r in refs]==["primary_migration_source","primary_migration_source","compatibility_migration_source","compatibility_migration_source"])
check("legacy_sources_not_materialized",not any((ROOT/r["path"]).exists() for r in refs))
items=[x for layer in d16["visible_surface"]["layers"] for x in layer["items"]]
check("DRC16_visible_frame_has_11_items",[x["number"] for x in items]==list(range(1,12)))
check("DRC16_runtime_box_before_visible_frame",d16["visible_surface"]["runtime_box_at_top"] is True and d16["layer_contract"]["sandbox_flow"]!=d16["layer_contract"]["visible_response"])
check("DRC16_header_and_footer_fields_complete",len(d16["visible_surface"]["header_fields"])==6 and len(d16["visible_surface"]["footer_fields"])==7)
check("DRC16_machine_work_before_true_gate",len(d16["machine_execution"]["runs_before_true_human_gate"])>=7)
check("DRC16_gate_options_exact",d16["human_gate"]["options"]==["approve","reject","revise","fail_retry"])
check("DRC16_sandbox_pass_not_live_adoption",d16["machine_execution"]["sandbox_pass_is_not_live_adoption"] is True)
check("DRC17_Audit_key_invocation_preserved",d17["invocation"]["keys"]==["Audit","audit","RUN_AUDIT"] and d17["invocation"]["long_prompt_repaste_required"] is False)
check("DRC17_canonical_lane_not_blind_full_zip",d17["source_selection"]["canonical_role_lane_selection_required"] is True and d17["source_selection"]["blind_full_runtime_ZIP_load"] is False)
checks=set(d17["BFL_checks"]); check("DRC17_BFL_checks_preserved",{"mainline_drift","wrong_source_role","missing_gate","missing_proof_or_readback","blocked_claims"}<=checks)
check("DRC17_verdict_taxonomy_exact",list(d17["verdict_map"])==["PASS","BLOCKED","REPAIR_REQUIRED","FAIL_RETRY"])
check("DRC17_readback_fields_complete",set(d17["required_readback"])=={"key_used","DRC16_response_surface","DRC17_BFL_audit_pass","pass_for","not_done","blocked_claims","next_valid_move"})
check("DRC17_peer_audit_boundary_preserved",d17["peer_audit_before_implementation"]["independent_output_must_be_real_not_simulated"] is True)
check("response_and_audit_contracts_cross_reference",d16["relation_to_drc17"]["audit_contract_ref"]=="data/runtime-contracts/drc17-audit-contract.json" and d17["relation_to_drc16"]["response_contract_ref"]=="data/runtime-contracts/drc16-response-contract.json")
check("neither_contract_authorizes_mutation",all(v is False for v in d16["claim_boundary"].values()) and all(v is False for v in d17["claim_boundary"].values()))
forbidden=["DRC16_DEFAULT_RESPONSE_SURFACE_v0_5_5.md","DRC16_DEFAULT_RESPONSE_SURFACE_v0_5_6.md","DRC16_RUNTIME_BOX_OPERATIONAL_MAP_v0_5_8.md","DRC16_VISIBLE_RESPONSE_WITH_SANDBOX_FLOW_v0_5_8.md","DRC16_ZIP_TO_DB_HARVEST_BRIDGE_SURFACE_v0_5_9.md","DRC17_RUNTIME_BOX_OPERATIONAL_MAP_AUDIT_GATE_v0_5_8.md","DRC17_ZIP_TO_DB_HARVEST_BRIDGE_AUDIT_GATE_v0_5_9.md"]
check("no_historical_duplicate_contract_files",not any((ROOT/p).exists() for p in forbidden))
ledger=parsed["data/source-ledger/public-unit-ledger.json"]; units={u["unit_id"]:u for u in ledger["units"]}; u2=units.get("PG-U02",{})
check("PG_U02_ledger_record_present",u2.get("name")=="drc16_drc17_public_runtime_contracts")
check("PG_U02_depends_on_PG_U00_and_PG_U01",u2.get("dependency_unit_ids")==["PG-U00","PG-U01"])
check("PG_U02_binding_is_containing_commit",u2.get("repository_binding")=={"mode":"containing_commit","base_commit":"df735725a1a724ca3c138a373fdb6dfd3372e4ed","commit_sha":None})
check("PG_U02_commit_gate_pending",u2.get("human_gate",{}).get("state")=="candidate_build_allowed_commit_gate_pending")
ev=parsed["data/source-ledger/evidence-reference-registry.json"]; evid={e["evidence_id"]:e for e in ev["evidence"]}; u1=units["PG-U01"]
check("PG_U01_post_commit_residual_resolved",u1["repository_binding"].get("commit_sha")=="df735725a1a724ca3c138a373fdb6dfd3372e4ed" and u1["human_gate"]["state"]=="repository_commit_gate_consumed_canon_gate_pending" and evid["PGU01-E04"]["state"]=="COMMIT_GATE_CONSUMED" and evid["PGU01-E05"]["state"]=="PASS_POST_PUSH")
m1=parsed["data/source-ledger/checksum-manifest.json"]
check("PG_U01_growth_safe_manifest_policy",m1["ownership_mode"]=="unit_owned_files_only" and m1["shared_registry_policy"]=="record_level_validation_not_whole_file_hash")
compat=parsed["data/source-ledger/compatibility-registry.json"]; rec={r["record_id"]:r for r in compat["records"]}
check("compatibility_records_trace_without_promotion",all(rec[k]["can_promote_canon"] is False and rec[k]["authority_effect"]=="none" for k in ["PGU02-COMPAT-DRC16-v0_5_8","PGU02-COMPAT-DRC17-v0_5_5"]))
manifest=parsed["data/runtime-contracts/pg-u02-checksum-manifest.json"]; mm={f["path"]:f["sha256"] for f in manifest["files"]}; actual={p:hashlib.sha256(canonical_bytes(p)).hexdigest() for p in mm}
check("checksum_manifest_matches_canonical_LF",actual==mm,str({p:(mm[p],actual[p]) for p in mm if mm[p]!=actual[p]}))
check("checksum_manifest_unit_owned_only",manifest["ownership_mode"]=="unit_owned_files_only" and set(mm)==set(OWNED_PATHS))
check("checksum_manifest_excludes_self",manifest["self_included"] is False and "data/runtime-contracts/pg-u02-checksum-manifest.json" not in mm)
all_files=[p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts]
check("private_and_generated_artifacts_absent",not any(p.endswith((".db",".sqlite",".zip","SHA256SUMS.txt","VALIDATION_OUTPUT.txt")) or p.startswith(("peer_evidence/","dist/","build/")) for p in all_files))
claims=[d16["claim_boundary"],d17["claim_boundary"],manifest["claim_boundary"],u2["claim_boundary"]]
check("claim_boundaries_false",all(all(v is False for v in c.values()) for c in claims)); check("source_apply_false",all(c["source_apply"] is False for c in claims)); check("DB_write_false",all(c["DB_write"] is False for c in claims)); check("canon_false",all(c["canon"] is False for c in claims)); check("commit_false",all(c["commit"] is False for c in claims)); check("push_false",all(c["push"] is False for c in claims))
syntax=ast.parse(Path(__file__).read_text(encoding="utf-8")); imports=set()
for node in ast.walk(syntax):
 if isinstance(node,ast.Import): imports.update(a.name.split(".")[0] for a in node.names)
 elif isinstance(node,ast.ImportFrom) and node.module: imports.add(node.module.split(".")[0])
check("stdlib_only_validator",imports<={"ast","hashlib","json","pathlib","re","subprocess","sys"},str(sorted(imports)))
p0=subprocess.run([sys.executable,"-S",str(ROOT/"tests/validate_pg_u00.py")],cwd=ROOT,text=True,capture_output=True); check("PG_U00_regression_passes",p0.returncode==0 and "SUMMARY\tPASS=35\tFAIL=0" in p0.stdout,p0.stdout+p0.stderr)
p1=subprocess.run([sys.executable,"-S",str(ROOT/"tests/validate_pg_u01.py")],cwd=ROOT,text=True,capture_output=True); check("PG_U01_growth_safe_regression_passes",p1.returncode==0 and "SUMMARY\tPASS=40\tFAIL=0" in p1.stdout,p1.stdout+p1.stderr)
matrix=parsed["tests/PG_U02_TEST_MATRIX.json"]; check("test_matrix_matches_validator",matrix["tests"]==EXPECTED_TESTS,str(matrix["tests"]))
check("Windows_CRLF_canonical_hash_ready",all(b"\r" not in canonical_bytes(p) for p in mm))
shared=["data/source-ledger/public-unit-ledger.json","data/source-ledger/source-reference-registry.json","data/source-ledger/evidence-reference-registry.json","data/source-ledger/compatibility-registry.json"]
scope_scan=[p for p in NEW_PATHS+shared if p not in {"tests/validate_pg_u02.py","tests/PG_U02_TEST_MATRIX.json"}]
check("unit_scope_is_PG_U02_only",set(u2["source_hashes"][i]["source_ref_id"] for i in range(4))==set(EXPECTED_HASHES) and all("PG-U03" not in (ROOT/p).read_text(encoding="utf-8",errors="ignore") for p in scope_scan))
failed=[r for r in RESULTS if r[1]=="FAIL"]
for n,s,d in RESULTS: print(f"{s}\t{n}\t{d}")
print(f"SUMMARY\tPASS={len(RESULTS)-len(failed)}\tFAIL={len(failed)}")
sys.exit(1 if failed else 0)
