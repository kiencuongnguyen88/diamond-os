# PG-U01 — Source Ledger and Reference Schema

PG-U01 defines public, machine-readable contracts for unit state, source identity, proof references, compatibility and checksums. It does not copy the active runtime source into Git.

## Format

Records use JSON syntax and JSON Schema 2020-12. JSON is a valid YAML 1.2 subset, so the original `yaml_schema_validation_passes` acceptance requirement is met without adding a YAML runtime dependency.

## Authority boundary

- A source reference records identity, hash, role and proof location; it does not transfer authority.
- A compatibility record cannot promote canon.
- A Git commit proves history only.
- PG-U01 remains `GIT_CANDIDATE` until a separate exact-scope Human promotion transaction.
- `source_apply`, `DB_write`, `RLDB_writeback`, `commit`, `push`, `publish`, `runtime_activation` and `canon` default to `false` in every contract.

## Primary source anchors

PG-U01 derives its contract shape from four active v0.6.2.16 surfaces:

1. current source manifest;
2. DRC19 package manifest;
3. DRC19 source route index;
4. source-pair build readback.

Only paths, sizes, SHA256 values and public-safe roles are stored. Raw source/evidence is excluded.

## Self-commit binding

A unit cannot embed its own final Git commit SHA without changing that SHA. PG-U01 therefore uses `repository_binding.mode = containing_commit`; Git resolves the record to the commit containing it. Post-push proof records the exact remote SHA outside the self-hashed unit.

## PG-U00 compatibility repair

The original PG-U00 validator compared the entire repository against its 19-file initial tree, which would reject every later unit. PG-U01 changes it to validate PG-U00's exact owned-path allowlist and content hashes while still scanning the repository for forbidden binary/private artifacts. The 35 PG-U00 test names remain unchanged.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
```
