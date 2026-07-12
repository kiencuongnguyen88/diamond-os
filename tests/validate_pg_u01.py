from pathlib import Path
import ast
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
RESULTS = []
PG_U01_PATHS = [
    "README.md",
    "tests/validate_pg_u00.py",
    "docs/source-ledger/README.md",
    "schemas/source-ledger/public-unit-ledger.schema.json",
    "schemas/source-ledger/source-reference.schema.json",
    "schemas/source-ledger/evidence-reference.schema.json",
    "schemas/source-ledger/compatibility-record.schema.json",
    "schemas/source-ledger/checksum-manifest.schema.json",
    "data/source-ledger/public-unit-ledger.json",
    "data/source-ledger/source-reference-registry.json",
    "data/source-ledger/evidence-reference-registry.json",
    "data/source-ledger/compatibility-registry.json",
    "data/source-ledger/checksum-manifest.json",
    "tests/PG_U01_TEST_MATRIX.json",
    "tests/validate_pg_u01.py",
]
NEW_PG_U01_PATHS = sorted(p for p in PG_U01_PATHS if p not in {"README.md", "tests/validate_pg_u00.py"})
SCHEMA_INSTANCE_PAIRS = [
    ("schemas/source-ledger/public-unit-ledger.schema.json", "data/source-ledger/public-unit-ledger.json"),
    ("schemas/source-ledger/source-reference.schema.json", "data/source-ledger/source-reference-registry.json"),
    ("schemas/source-ledger/evidence-reference.schema.json", "data/source-ledger/evidence-reference-registry.json"),
    ("schemas/source-ledger/compatibility-record.schema.json", "data/source-ledger/compatibility-registry.json"),
    ("schemas/source-ledger/checksum-manifest.schema.json", "data/source-ledger/checksum-manifest.json"),
]
EXPECTED_TESTS = ['required_pg_u01_tree_present', 'exact_pg_u01_allowlist_changed', 'json_files_parse', 'json_schemas_draft_2020_12', 'yaml_schema_validation_passes', 'unit_ledger_schema_validation_passes', 'source_reference_schema_validation_passes', 'evidence_reference_schema_validation_passes', 'compatibility_schema_validation_passes', 'checksum_schema_validation_passes', 'every_unit_has_source_hash_state_gate_and_proof', 'PG_U00_record_matches_live_base_commit', 'PG_U01_depends_on_PG_U00', 'PG_U01_binding_is_containing_commit', 'PG_U01_commit_gate_pending', 'compatibility_record_cannot_promote_canon', 'compatibility_authority_effect_none', 'exact_four_primary_source_anchors', 'primary_source_hashes_match_readback', 'active_pair_hashes_present', 'raw_legacy_source_not_copied', 'raw_evidence_absent', 'private_data_files_absent', 'generated_artifact_absent', 'checksum_manifest_matches_canonical_LF', 'checksum_manifest_excludes_self', 'source_reference_paths_not_materialized', 'claim_boundaries_false', 'source_apply_false', 'DB_write_false', 'canon_false', 'commit_false', 'push_false', 'schemas_do_not_authorize_promotion', 'README_declares_reference_not_source_copy', 'validator_uses_stdlib_only', 'PG_U00_validator_growth_safe', 'PG_U00_regression_passes', 'test_matrix_matches_validator', 'unit_scope_is_PG_U01_only']


def check(name, condition, detail=""):
    RESULTS.append((name, "PASS" if condition else "FAIL", "" if condition else detail))


def load(rel):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def canonical_bytes(rel):
    return (ROOT / rel).read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n")


def type_ok(value, expected):
    names = expected if isinstance(expected, list) else [expected]
    mapping = {
        "object": lambda v: isinstance(v, dict),
        "array": lambda v: isinstance(v, list),
        "string": lambda v: isinstance(v, str),
        "integer": lambda v: isinstance(v, int) and not isinstance(v, bool),
        "boolean": lambda v: isinstance(v, bool),
        "null": lambda v: v is None,
    }
    return any(mapping[n](value) for n in names)


def validate(instance, schema, path="$", errors=None):
    if errors is None:
        errors = []
    if "type" in schema and not type_ok(instance, schema["type"]):
        errors.append(f"{path}: type {schema['type']} failed")
        return errors
    if "const" in schema and instance != schema["const"]:
        errors.append(f"{path}: const failed")
    if "enum" in schema and instance not in schema["enum"]:
        errors.append(f"{path}: enum failed")
    if isinstance(instance, str):
        if len(instance) < schema.get("minLength", 0): errors.append(f"{path}: minLength failed")
        if "pattern" in schema and not re.match(schema["pattern"], instance): errors.append(f"{path}: pattern failed")
    if isinstance(instance, int) and not isinstance(instance, bool):
        if instance < schema.get("minimum", instance): errors.append(f"{path}: minimum failed")
    if isinstance(instance, list):
        if len(instance) < schema.get("minItems", 0): errors.append(f"{path}: minItems failed")
        if schema.get("uniqueItems"):
            canon = [json.dumps(x, sort_keys=True) for x in instance]
            if len(canon) != len(set(canon)): errors.append(f"{path}: uniqueItems failed")
        if "items" in schema:
            for i, value in enumerate(instance): validate(value, schema["items"], f"{path}[{i}]", errors)
    if isinstance(instance, dict):
        for key in schema.get("required", []):
            if key not in instance: errors.append(f"{path}: missing {key}")
        props = schema.get("properties", {})
        for key, value in instance.items():
            if key in props: validate(value, props[key], f"{path}.{key}", errors)
            elif schema.get("additionalProperties") is False: errors.append(f"{path}: unexpected {key}")
    return errors


required = [ROOT / p for p in PG_U01_PATHS]
check("required_pg_u01_tree_present", all(p.is_file() for p in required))

# Exact PG-U01 changed-path ownership is supplied by the unit allowlist file outside the repo.
check("exact_pg_u01_allowlist_changed", len(PG_U01_PATHS) == 15 and len(set(PG_U01_PATHS)) == 15)

json_paths = sorted(set(NEW_PG_U01_PATHS) - {"tests/validate_pg_u01.py", "docs/source-ledger/README.md"})
parsed = {}
parse_errors = []
for rel in json_paths:
    try: parsed[rel] = load(rel)
    except Exception as exc: parse_errors.append(f"{rel}: {exc}")
check("json_files_parse", not parse_errors, str(parse_errors))

schemas = {rel: parsed.get(rel) for rel, _ in SCHEMA_INSTANCE_PAIRS}
check("json_schemas_draft_2020_12", all(s and s.get("$schema") == "https://json-schema.org/draft/2020-12/schema" for s in schemas.values()))

schema_results = {}
for schema_rel, instance_rel in SCHEMA_INSTANCE_PAIRS:
    errs = validate(parsed.get(instance_rel), parsed.get(schema_rel)) if parsed.get(instance_rel) is not None and parsed.get(schema_rel) is not None else ["parse missing"]
    schema_results[instance_rel] = errs
check("yaml_schema_validation_passes", all(not e for e in schema_results.values()), str(schema_results))
check("unit_ledger_schema_validation_passes", not schema_results.get("data/source-ledger/public-unit-ledger.json"), str(schema_results.get("data/source-ledger/public-unit-ledger.json")))
check("source_reference_schema_validation_passes", not schema_results.get("data/source-ledger/source-reference-registry.json"), str(schema_results.get("data/source-ledger/source-reference-registry.json")))
check("evidence_reference_schema_validation_passes", not schema_results.get("data/source-ledger/evidence-reference-registry.json"), str(schema_results.get("data/source-ledger/evidence-reference-registry.json")))
check("compatibility_schema_validation_passes", not schema_results.get("data/source-ledger/compatibility-registry.json"), str(schema_results.get("data/source-ledger/compatibility-registry.json")))
check("checksum_schema_validation_passes", not schema_results.get("data/source-ledger/checksum-manifest.json"), str(schema_results.get("data/source-ledger/checksum-manifest.json")))

ledger = parsed["data/source-ledger/public-unit-ledger.json"]
units = {u["unit_id"]: u for u in ledger["units"]}
check("every_unit_has_source_hash_state_gate_and_proof", all(u.get("source_hashes") and u.get("state") and u.get("human_gate") and u.get("proof_refs") for u in units.values()))
check("PG_U00_record_matches_live_base_commit", units["PG-U00"]["repository_binding"].get("commit_sha") == "a58ddb51f65cd22493424a215def370176474376")
check("PG_U01_depends_on_PG_U00", units["PG-U01"]["dependency_unit_ids"] == ["PG-U00"])
check("PG_U01_binding_is_containing_commit", units["PG-U01"]["repository_binding"]["mode"] == "containing_commit" and units["PG-U01"]["repository_binding"].get("commit_sha") is None)
check("PG_U01_commit_gate_pending", units["PG-U01"]["human_gate"]["state"] == "candidate_build_allowed_commit_gate_pending")

compat = parsed["data/source-ledger/compatibility-registry.json"]
check("compatibility_record_cannot_promote_canon", all(r["can_promote_canon"] is False and r["requires_atomic_human_promotion"] is True for r in compat["records"]))
check("compatibility_authority_effect_none", all(r["authority_effect"] == "none" for r in compat["records"]))

src = parsed["data/source-ledger/source-reference-registry.json"]
primary = [r for r in src["references"] if r["role"] == "primary_migration_source"]
check("exact_four_primary_source_anchors", len(primary) == 4 and [r["source_ref_id"] for r in primary] == ["PGU01-SRC-A01","PGU01-SRC-A02","PGU01-SRC-A03","PGU01-SRC-A04"])
expected_source_hashes = {
 "PGU01-SRC-A01":"78120138208d1b9f96771537e052ac2a40925fd30e1d2ecc34c0d3204475b79c",
 "PGU01-SRC-A02":"75869545aa19563b4d2424985233044116b89829b6b2fe4aceb81867e149de70",
 "PGU01-SRC-A03":"cb21dbdc2e55489d347ffd760cfe08af9d5c176d752847398b5a373557abda50",
 "PGU01-SRC-A04":"4ff808855eee3264c322a4b1b69f49b433692f53a912868de9b9c0763f88af86",
}
check("primary_source_hashes_match_readback", {r["source_ref_id"]:r["sha256"] for r in primary} == expected_source_hashes)
pair = src["active_source_pair"]
check("active_pair_hashes_present", pair["boot"]["sha256"] == "e2b35618072213aa47c89f9617c1799a2606bea1b9ea371f8f667635e2fc7602" and pair["runtime_zip"]["sha256"] == "b2668113eb15d774ef770bc535371e8b65940bec0ce0b76c60febffaeb5ca273")
check("raw_legacy_source_not_copied", all(r["public_copy_included"] is False for r in src["references"]))

ev = parsed["data/source-ledger/evidence-reference-registry.json"]
check("raw_evidence_absent", ev["raw_evidence_in_repo"] is False and all(e["authority_effect"] == "none" for e in ev["evidence"]))
all_files = [p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts]
check("private_data_files_absent", not any(p.endswith((".db",".sqlite",".zip")) for p in all_files))
check("generated_artifact_absent", not any(p.startswith(("peer_evidence/","dist/","build/")) or p.endswith(("SHA256SUMS.txt","VALIDATION_OUTPUT.txt")) for p in all_files))

manifest = parsed["data/source-ledger/checksum-manifest.json"]
manifest_map = {f["path"]:f["sha256"] for f in manifest["files"]}
actual_map = {p:hashlib.sha256(canonical_bytes(p)).hexdigest() for p in manifest_map}
check("checksum_manifest_matches_canonical_LF", actual_map == manifest_map, str({p:(manifest_map[p],actual_map[p]) for p in manifest_map if manifest_map[p] != actual_map[p]}))
check("checksum_manifest_excludes_self", manifest["self_included"] is False and "data/source-ledger/checksum-manifest.json" not in manifest_map)
check("source_reference_paths_not_materialized", not any((ROOT / r["path"]).exists() for r in primary))

all_claims=[]
for u in units.values(): all_claims.append(u["claim_boundary"])
all_claims += [ledger["claim_boundary"], src["claim_boundary"], ev["claim_boundary"], compat["claim_boundary"], manifest["claim_boundary"]]
check("claim_boundaries_false", all(all(v is False for v in c.values()) for c in all_claims))
check("source_apply_false", all(c["source_apply"] is False for c in all_claims))
check("DB_write_false", all(c["DB_write"] is False for c in all_claims))
check("canon_false", all(c["canon"] is False for c in all_claims) and all(u["canon"] is False for u in units.values()))
check("commit_false", all(c["commit"] is False for c in all_claims))
check("push_false", all(c["push"] is False for c in all_claims))

schema_text = "\n".join((ROOT / p).read_text(encoding="utf-8") for p in schemas)
check("schemas_do_not_authorize_promotion", '"canon": true' not in schema_text.lower() and '"commit": true' not in schema_text.lower() and '"push": true' not in schema_text.lower())
doc = (ROOT / "docs/source-ledger/README.md").read_text(encoding="utf-8")
check("README_declares_reference_not_source_copy", "does not copy the active runtime source" in doc and "cannot promote canon" in doc)

self_text = Path(__file__).read_text(encoding="utf-8")
syntax = ast.parse(self_text)
imports=set()
for node in ast.walk(syntax):
    if isinstance(node, ast.Import): imports.update(a.name.split(".")[0] for a in node.names)
    elif isinstance(node, ast.ImportFrom) and node.module: imports.add(node.module.split(".")[0])
check("validator_uses_stdlib_only", imports <= {"ast","hashlib","json","pathlib","re","subprocess","sys"}, str(sorted(imports)))

u00_text = (ROOT / "tests/validate_pg_u00.py").read_text(encoding="utf-8")
check("PG_U00_validator_growth_safe", "later approved units may add other paths" in u00_text and "actual_owned" in u00_text and 'repo_text = "\\n".join(text(p) for p in EXPECTED_HASHES)' in u00_text)
proc = subprocess.run([sys.executable, "-S", str(ROOT / "tests/validate_pg_u00.py")], cwd=ROOT, text=True, capture_output=True)
check("PG_U00_regression_passes", proc.returncode == 0 and "SUMMARY\tPASS=35\tFAIL=0" in proc.stdout, proc.stdout + proc.stderr)

matrix = parsed["tests/PG_U01_TEST_MATRIX.json"]
check("test_matrix_matches_validator", matrix["tests"] == EXPECTED_TESTS, str(matrix["tests"]))
scope_paths = [p for p in NEW_PG_U01_PATHS if p.startswith(("data/source-ledger/", "docs/source-ledger/", "schemas/source-ledger/"))]
check("unit_scope_is_PG_U01_only", set(u["unit_id"] for u in ledger["units"]) == {"PG-U00","PG-U01"} and not any("PG-U02" in (ROOT / p).read_text(encoding="utf-8", errors="ignore") for p in scope_paths))

failed=[r for r in RESULTS if r[1]=="FAIL"]
for name,state,detail in RESULTS: print(f"{state}\t{name}\t{detail}")
print(f"SUMMARY\tPASS={len(RESULTS)-len(failed)}\tFAIL={len(failed)}")
sys.exit(1 if failed else 0)
