# PG-U01 — Source Ledger and Reference Schema

PG-U01 defines public, machine-readable contracts for unit state, source identity, proof references, compatibility and checksums. It does not copy the active runtime source into Git.

## Format

Records use JSON syntax and JSON Schema 2020-12. JSON is a valid YAML 1.2 subset, so validation needs no YAML runtime dependency.

## Current repository truth

- PG-U00 root commit: `a58ddb51f65cd22493424a215def370176474376`.
- PG-U01 exact commit: `df735725a1a724ca3c138a373fdb6dfd3372e4ed`.
- PG-U01 repository commit gate: consumed; canon gate remains pending.
- PG-U01 remains `GIT_CANDIDATE`; source apply, DB write and canon promotion remain false.

## Growth-safe ownership

Shared registries grow as later public units are added. PG-U01 therefore hashes only PG-U01-owned stable files. Its own ledger, source, evidence and compatibility records are validated at record level rather than freezing whole shared files. Later units may add records without invalidating PG-U01.

## Source and evidence boundary

A source or evidence reference records identity, hash, state, role and proof location. It does not transfer authority. Raw runtime source, DBs, private records, ZIPs and proof packets remain outside the public repository.

## PG-U00 compatibility repair

The PG-U00 validator checks PG-U00-owned paths and hashes while still scanning the growing repository for forbidden private/binary artifacts.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
```
