# DIAMOND OS

Source-governed, Human-gated AI operating system built one clean public unit at a time.

## Public units

### PG-U00 — Governance / Authority Seed

Defines source-authority precedence, Human Gate and claim boundaries, Git/legacy state machines, atomic promotion, partial-overlap resolution, current-pointer freshness, public/private exclusions, generated-artifact non-authority, peer audit and fail-stop behavior.

- Repository unit state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Root commit: `a58ddb51f65cd22493424a215def370176474376`

### PG-U01 — Source Ledger and Reference Schema

Defines machine-readable public-unit ledger, source-reference, evidence-reference, compatibility and checksum contracts. Source files remain outside the public repository; only public-safe identities, hashes, states, gates and proof references are recorded.

- Repository unit state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Dependency: `PG-U00`
- Self commit binding: resolved as the Git commit containing the ledger record; the record does not embed its own commit SHA.

## Authority state

- Canonical authority: `false`
- Active legacy source remains authoritative until an exact-scope Human promotion transaction completes.
- A Git commit proves repository history; it does not by itself promote a unit to canon.

## Public-source boundary

This repository does **not** contain raw legacy source evidence, private P1/P2/Family/P7/RLDB data, generated DBs, runtime ZIPs, sandbox proofs or audit packets.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
```

Both bootstrap validators use only the Python standard library.

## Build rule

Each later unit must be added separately, validated, read back and approved through its own Human Gate.
