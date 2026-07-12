# PG-U01 — Source Ledger and Reference Schema

PG-U01 defines public, machine-readable contracts for unit state, source identity, proof references, compatibility and checksums. It does not copy the active runtime source into Git and a reference does not transfer authority.

## Current repository truth

- PG-U00 root commit: `a58ddb51f65cd22493424a215def370176474376`.
- PG-U01 exact commit: `df735725a1a724ca3c138a373fdb6dfd3372e4ed`.
- PG-U02 exact commit: `d1e293703cbb5e504327228dff3aa32a8f71807c`; its post-commit snapshot residual is resolved.
- PG-U03 is a candidate with commit gate pending.
- Active source pair read for PG-U03 build: `v0.6.2.17`.
- All public units remain `GIT_CANDIDATE`; canon is false.

## Growth-safe ownership
Shared registries grow as later public units are added. PG-U01 hashes only PG-U01-owned stable files. Shared records are validated at record level. The active source-pair version field is pattern-validated so a later source pair can be registered without freezing the schema to one version.

## Source and evidence boundary
Raw runtime source, DBs, private records, ZIPs and proof packets remain outside the public repository.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
```
