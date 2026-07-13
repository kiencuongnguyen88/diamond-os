# DIAMOND OS

Source-governed, Human-gated AI operating system built one clean public unit at a time.

## Public units

### PG-U00 — Governance / Authority Seed
Defines source-authority precedence, Human Gate, claim boundaries and fail-stop behavior. Root commit: `a58ddb51f65cd22493424a215def370176474376`.

### PG-U01 — Source Ledger and Reference Schema
Defines machine-readable public-unit, source, evidence, compatibility and checksum records. Exact commit: `df735725a1a724ca3c138a373fdb6dfd3372e4ed`.

### PG-U02 — DRC16/DRC17 Public Runtime Contracts
Consolidates Human-visible response and audit contracts. Exact commit: `d1e293703cbb5e504327228dff3aa32a8f71807c`. Repository commit gate is consumed; canon remains false.

### PG-U03 — Routing and IO Public Core
Publishes bounded task classification, IO orchestration, source-sync and Project/local source-mode contracts.

- Candidate state: `GIT_CANDIDATE`
- Dependencies: `PG-U00`, `PG-U01`, `PG-U02`
- Repository commit gate: pending
- Active source pair read for build: `v0.6.2.17`

### PG-U04 — Sun Graph Doctrine Git-native Core
Publishes the Human-approved 57-table/8-view schema and 140 doctrine/mechanism seed rows as Git-native source. SQLite is generated deterministically and is not tracked.

- Candidate state: `GIT_CANDIDATE`
- Dependencies: `PG-U00`, `PG-U01`, `PG-U03`
- Repository commit gate: pending

## Authority state
A Git commit proves repository history; it does not itself promote a unit to canon. Canonical authority: `false`. Source apply, DB write, publish and runtime activation remain Human-gated.

## Public-source boundary
This repository does **not** contain private P1/P2/Family/P7/RLDB records, DB files, runtime ZIPs, raw legacy source, sandbox proofs or peer-evidence packets.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
python -S tests/validate_pg_u02.py
python -S tests/validate_pg_u03.py
python -S tests/validate_pg_u04.py
```

The validators use only the Python standard library.
