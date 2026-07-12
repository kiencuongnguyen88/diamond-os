from pathlib import Path
import ast
import hashlib
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
RESULTS = []
EXPECTED_HASHES = {'README.md': 'b997e976f34cf3a429f787628832bd81ccf1b6e8835e944257084f1d775cd6b8',
 'governance/ATOMIC_AUTHORITY_PROMOTION_TRANSACTION.yaml': '806acc007527a83d209fe7a75c977c6ea89345ba3f791745352be817623e14e7',
 'governance/CLAIM_BOUNDARY_DEFAULTS.yaml': '80b81b44856cd295b537e9c46f51a852ab9e7b939dfbbd39dfecb43d4bb1d782',
 'governance/CONFLICT_AND_FAIL_STOP_POLICY.yaml': '031eb7efef8961f36a278a2172daa09729561d9c7900c58eb4a1ed10558c9f57',
 'governance/CURRENT_POINTER_FRESHNESS_GATE.yaml': '8bd917f8300de1d975792f29414b1fd34c31a905943892fbd7a756fd03458c3b',
 'governance/CURRENT_POINTER_POLICY.yaml': '4439ac8aff76a14598053ba75f306009e8d3c594fa22b8bb07a755bfd8fdcb29',
 'governance/GENERATED_ARTIFACT_NON_AUTHORITY_POLICY.yaml': '6796e829e5e086f0b7fdd19984876a897b3a3dec7865b62b053c6c3c0650f167',
 'governance/HUMAN_GATE_AND_RUN_POLICY.yaml': '34e7b68a12127be4c66f4fc1613ee9adb0e961a791c26416d737357e3fb2f3a8',
 'governance/LEGACY_SOURCE_STATE_MACHINE.yaml': '68274e257efbf8798f99697785d531d4d1b0c8d520a95b2bbe64f868788d975a',
 'governance/PARTIAL_OVERLAP_AUTHORITY_RESOLUTION.yaml': '0d08bb68f86040390dab2c922dba48c403b7cec51f982ee1128e2cb92a1d3f34',
 'governance/PEER_AUDIT_GATE.yaml': '311b7ca36365e6173ef56fc8de76aa22f39e5c2702166d1e2c424e90dc1d8211',
 'governance/PG_U00_SOURCE_SCOPE_LOCK.yaml': 'ba8065ece4233c6ed786a0ebecdc347240391dc505c4ee6f1f7addc2cd2950da',
 'governance/PUBLIC_GIT_UNIT_STATE_MACHINE.yaml': '7df9262b7c4260bc0997e4823f0263cafa07f726287e7dc4d4ffe1ba33bb883e',
 'governance/PUBLIC_PRIVATE_DENY_RULES.yaml': '9b6b7c0cad610deb4a686d73f9c4d41c02e49e9bcba38f54bb6b056aeb501e5b',
 'governance/SOURCE_AUTHORITY_PRECEDENCE.yaml': '1cb209daf5c9fb4ea7c6855fcec8c383941ff1d65e3f69bfd7d98a29290e50dd',
 'governance/SOURCE_LINEAGE_MAP.yaml': '094c0d4daa9bdcaeacc3039cf78555d69745b0ecd8158d25935b780823d948d4',
 'schemas/governance/PG_U00_SOURCE_FINGERPRINTS.yaml': 'ea0fee4cff6c4e973d7f47492a4f557f0fd13fb6db95664062d1cbf5bc04f22e',
 'tests/TEST_MATRIX.yaml': 'e99acabb88a9b4fd2a667cdbf73cf82e288b6653982898fdce2f0174f6345f6c'}
EXPECTED_TESTS = ['required_tree_present',
 'exact_expected_file_set',
 'content_hash_manifest_matches',
 'yaml_files_utf8_nonempty',
 'yaml_files_tab_free',
 'exact_six_source_fingerprints',
 'anchor_hashes_locked',
 'current_document_hashes_present',
 'raw_peer_evidence_absent',
 'package_metadata_absent',
 'private_data_files_absent',
 'scope_is_PG_U00_only',
 'scope_state_GIT_CANDIDATE',
 'canon_false',
 'source_apply_false',
 'DB_write_false',
 'commit_default_false',
 'push_default_false',
 'current_pointer_uses_fingerprint_registry',
 'freshness_gate_uses_public_source_paths',
 'freshness_gate_blocks_stale_evidence',
 'partial_overlap_policy_present',
 'partial_overlap_unsegmentable_blocks',
 'atomic_promotion_requires_freshness',
 'atomic_promotion_requires_repo_validation',
 'Git_and_legacy_state_machines_separate',
 'generated_artifact_non_authority',
 'public_private_deny_rules_present',
 'peer_audit_gate_present',
 'no_dangling_peer_evidence_reference',
 'no_repo_import_packet_reference',
 'all_policy_refs_resolve',
 'README_declares_candidate_not_canon',
 'validator_uses_stdlib_only',
 'test_matrix_matches_validator']


def check(name, condition, detail=""):
    RESULTS.append((name, "PASS" if condition else "FAIL", "" if condition else detail))


def text(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def is_public_tree_file(path):
    rel = path.relative_to(ROOT)
    return path.is_file() and ".git" not in rel.parts


def all_repo_files():
    return sorted(p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if is_public_tree_file(p))


def all_text():
    chunks=[]
    for p in ROOT.rglob("*"):
        if is_public_tree_file(p) and p.resolve() != Path(__file__).resolve():
            chunks.append(p.read_text(encoding="utf-8", errors="strict"))
    return "\n".join(chunks)


required = sorted(list(EXPECTED_HASHES) + ["tests/validate_pg_u00.py"])
actual = all_repo_files()
check("required_tree_present", all((ROOT / p).is_file() for p in required))
check("exact_expected_file_set", actual == required, f"expected={required} actual={actual}")

def canonical_content_bytes(rel):
    # Git may materialize text files as CRLF on Windows when core.autocrlf=true.
    # PG-U00 content fingerprints are defined over canonical LF bytes so the
    # same tracked content validates on Linux, macOS, and Windows checkouts.
    raw = (ROOT / rel).read_bytes()
    return raw.replace(b"\r\n", b"\n").replace(b"\r", b"\n")


actual_hashes = {p: hashlib.sha256(canonical_content_bytes(p)).hexdigest() for p in EXPECTED_HASHES}
check("content_hash_manifest_matches", actual_hashes == EXPECTED_HASHES)

yaml_files = sorted(ROOT.rglob("*.yaml"))
yaml_utf8_ok = True
yaml_nonempty_ok = True
for p in yaml_files:
    try:
        value = p.read_text(encoding="utf-8")
        yaml_nonempty_ok = yaml_nonempty_ok and bool(value.strip())
    except UnicodeDecodeError:
        yaml_utf8_ok = False
check("yaml_files_utf8_nonempty", yaml_utf8_ok and yaml_nonempty_ok)
check("yaml_files_tab_free", all("\t" not in p.read_text(encoding="utf-8") for p in yaml_files))

fp = text("schemas/governance/PG_U00_SOURCE_FINGERPRINTS.yaml")
scope = text("governance/PG_U00_SOURCE_SCOPE_LOCK.yaml")
claims = text("governance/CLAIM_BOUNDARY_DEFAULTS.yaml")
ptr = text("governance/CURRENT_POINTER_POLICY.yaml")
fresh = text("governance/CURRENT_POINTER_FRESHNESS_GATE.yaml")
partial = text("governance/PARTIAL_OVERLAP_AUTHORITY_RESOLUTION.yaml")
atomic = text("governance/ATOMIC_AUTHORITY_PROMOTION_TRANSACTION.yaml")
gitstate = text("governance/PUBLIC_GIT_UNIT_STATE_MACHINE.yaml")
legacy = text("governance/LEGACY_SOURCE_STATE_MACHINE.yaml")
gen = text("governance/GENERATED_ARTIFACT_NON_AUTHORITY_POLICY.yaml")
priv = text("governance/PUBLIC_PRIVATE_DENY_RULES.yaml")
peer = text("governance/PEER_AUDIT_GATE.yaml")
repo_text = all_text()

anchor_ids = re.findall(r"^\s*-?\s*anchor_id:\s*(A\d{2})\s*$", fp, re.M)
check("exact_six_source_fingerprints", "primary_source_anchor_count: 6" in fp and anchor_ids == ["A01","A02","A03","A04","A05","A06"])
expected_anchor_hashes = [
"dd44d7474430d028d1142fc15b4dc578089fffb5a9982d8ab40886db75b84265",
"78120138208d1b9f96771537e052ac2a40925fd30e1d2ecc34c0d3204475b79c",
"28a225c1b44cb5905a2f98c63529bcf58deb6036478a4b33c651abb64e6481dd",
"e148669659ca01de742d6dc0f276ef6df165a2364901a68018c39cf926ad0856",
"d6337f38ae5541d08646ad69220a08f0c5ba3deb97a83b1b5a4b6b666e8bef74",
"96b757af7d4f05d22022a490f53afe0eeae982f66bf17998a9b70161fd2ed781",
]
check("anchor_hashes_locked", all(h in fp for h in expected_anchor_hashes))
current_hashes = re.findall(r"current_document_sha256:\s*([0-9a-f]{64})", fp)
check("current_document_hashes_present", len(current_hashes) == 2)
check("raw_peer_evidence_absent", not any(p.startswith("peer_evidence/") for p in actual))
check("package_metadata_absent", not any(p in actual for p in ["PACKAGE_MANIFEST.yaml","SHA256SUMS.txt","tests/VALIDATION_OUTPUT.txt"]))
check("private_data_files_absent", not any(p.endswith((".db",".sqlite",".zip")) for p in actual))
check("scope_is_PG_U00_only", re.search(r"^unit_id:\s*PG-U00\s*$", scope, re.M) is not None and "primary_source_anchor_count: 6" in scope)
check("scope_state_GIT_CANDIDATE", re.search(r"^state:\s*GIT_CANDIDATE\s*$", scope, re.M) is not None)
check("canon_false", re.search(r"^canon:\s*false\s*$", gitstate, re.M) is not None and re.search(r"^\s*canon:\s*false\s*$", claims, re.M) is not None)
check("source_apply_false", re.search(r"^\s*source_apply:\s*false\s*$", claims, re.M) is not None)
check("DB_write_false", re.search(r"^\s*DB_write:\s*false\s*$", claims, re.M) is not None)
check("commit_default_false", re.search(r"^\s*commit:\s*false\s*$", claims, re.M) is not None)
check("push_default_false", re.search(r"^\s*push:\s*false\s*$", claims, re.M) is not None)
check("current_pointer_uses_fingerprint_registry", "source_fingerprint_registry: schemas/governance/PG_U00_SOURCE_FINGERPRINTS.yaml" in ptr)
check("freshness_gate_uses_public_source_paths", "peer_evidence/" not in fresh and "fingerprint_registry: schemas/governance/PG_U00_SOURCE_FINGERPRINTS.yaml" in fresh)
check("freshness_gate_blocks_stale_evidence", "mismatch_result: BLOCKED_STALE_PROMOTION_EVIDENCE" in fresh)
check("partial_overlap_policy_present", "policy_id: PG_U00_PARTIAL_OVERLAP" in partial)
check("partial_overlap_unsegmentable_blocks", "fail_stop: BLOCKED_PARTIAL_SCOPE_AUTHORITY_AMBIGUITY" in partial)
check("atomic_promotion_requires_freshness", "current_pointer_freshness_proof:" in atomic)
check("atomic_promotion_requires_repo_validation", "public_repo_unit_validation:" in atomic)
check("Git_and_legacy_state_machines_separate", "object_type: public_Git_unit" in gitstate and "object_type: legacy_source_object" in legacy)
check("generated_artifact_non_authority", "existence_or_validation_confers_authority: false" in gen)
deny_items = re.findall(r"^\s{2}-[ ]+", priv, re.M)
check("public_private_deny_rules_present", len(deny_items) >= 5)
check("peer_audit_gate_present", "policy_id: PG_U00_PEER_AUDIT_GATE" in peer)
check("no_dangling_peer_evidence_reference", "peer_evidence/" not in repo_text)
check("no_repo_import_packet_reference", "repo_import/" not in repo_text and "PACKAGE_MANIFEST" not in repo_text)
refs = []
for rel in ["governance/CURRENT_POINTER_POLICY.yaml","governance/SOURCE_AUTHORITY_PRECEDENCE.yaml","governance/PUBLIC_PRIVATE_DENY_RULES.yaml"]:
    refs.extend(re.findall(r"(?:^|\s)(governance/[A-Za-z0-9_.-]+\.yaml|schemas/[A-Za-z0-9_./-]+\.yaml)(?:\s|$)", text(rel), re.M))
check("all_policy_refs_resolve", all((ROOT / r).is_file() for r in refs), str(refs))
readme = text("README.md")
check("README_declares_candidate_not_canon", "GIT_CANDIDATE" in readme and "Canonical authority: `false`" in readme)
self_text = Path(__file__).read_text(encoding="utf-8")
syntax = ast.parse(self_text)
imports = set()
for node in ast.walk(syntax):
    if isinstance(node, ast.Import):
        imports.update(alias.name.split(".")[0] for alias in node.names)
    elif isinstance(node, ast.ImportFrom) and node.module:
        imports.add(node.module.split(".")[0])
check("validator_uses_stdlib_only", imports <= {"ast", "hashlib", "pathlib", "re", "sys"} and "python -S" in readme, str(sorted(imports)))
matrix_tests = re.findall(r"^- ([A-Za-z0-9_]+)\s*$", text("tests/TEST_MATRIX.yaml"), re.M)
check("test_matrix_matches_validator", matrix_tests == EXPECTED_TESTS, f"matrix={matrix_tests}")

failed = [r for r in RESULTS if r[1] == "FAIL"]
for name, state, detail in RESULTS:
    print(f"{state}\t{name}\t{detail}")
print(f"SUMMARY\tPASS={len(RESULTS)-len(failed)}\tFAIL={len(failed)}")
sys.exit(1 if failed else 0)
