# DIAMOND OS

Source-governed, Human-gated AI operating system built one clean public unit at a time.

## Current public unit

**PG-U00 — Governance / Authority Seed**

This first unit defines:

- source-authority precedence by exact scope;
- Human Gate and claim boundaries;
- Git and legacy source state machines;
- atomic authority promotion;
- partial-overlap resolution;
- current-pointer freshness checks;
- public/private exclusion rules;
- generated-artifact non-authority rules;
- peer-audit and fail-stop behavior.

## Authority state

- Repository unit state: `GIT_CANDIDATE`
- Canonical authority: `false`
- Active legacy source remains authoritative until an exact-scope Human promotion transaction completes.
- A Git commit proves repository history; it does not by itself promote the unit to canon.

## Public-source boundary

This repository does **not** contain raw legacy source evidence, private P1/P2/Family/P7/RLDB data, generated DBs, runtime ZIPs, sandbox proofs, or audit packets. Public-safe source identities are recorded as hashes in `schemas/governance/PG_U00_SOURCE_FINGERPRINTS.yaml`.

## Validate

```bash
python -S tests/validate_pg_u00.py
```

The validator uses only the Python standard library; no `PyYAML` or other package is required.

## Build rule

Each later unit must be added separately, validated, read back, and approved through its own Human Gate.
