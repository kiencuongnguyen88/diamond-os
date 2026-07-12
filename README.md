# DIAMOND OS

Source-governed, Human-gated AI operating system built one clean public unit at a time.

## Public units

### PG-U00 — Governance / Authority Seed

Defines source-authority precedence, Human Gate and claim boundaries, Git/legacy state machines, atomic promotion, partial-overlap resolution, current-pointer freshness, public/private exclusions, generated-artifact non-authority, peer audit and fail-stop behavior.

- Repository unit state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Root commit: `a58ddb51f65cd22493424a215def370176474376`

### PG-U01 — Source Ledger and Reference Schema

Defines machine-readable public-unit ledger, source-reference, evidence-reference, compatibility and checksum contracts.

- Repository unit state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Exact commit: `df735725a1a724ca3c138a373fdb6dfd3372e4ed`
- Repository commit gate: consumed

### PG-U02 — DRC16/DRC17 Public Runtime Contracts

Consolidates the current Human-visible DRC16 response contract and DRC17 audit/BFL contract without copying historical duplicates.

- Candidate state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Dependencies: `PG-U00`, `PG-U01`
- Repository commit gate: pending

## Authority state

- Active legacy source remains authoritative until an exact-scope Human promotion transaction completes.
- A Git commit proves repository history; it does not itself promote a unit to canon.

## Public-source boundary

This repository does **not** contain raw legacy source evidence, private P1/P2/Family/P7/RLDB data, generated DBs, runtime ZIPs, sandbox proofs or audit packets.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
python -S tests/validate_pg_u02.py
```

The validators use only the Python standard library.

## Build rule

Each later unit must be added separately, validated, read back and approved through its own Human Gate.
