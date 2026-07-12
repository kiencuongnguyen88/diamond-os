# PG-U02 — DRC16/DRC17 Public Runtime Contracts

PG-U02 consolidates the current public response and audit contracts into one DRC16 contract and one DRC17 contract. It does not copy the four legacy source files verbatim.

## Authority selection

- DRC16 v0.6.0 and DRC17 v0.6.0 are the current primary semantic sources.
- DRC16 v0.5.8 contributes the complete visible 11-item frame.
- DRC17 v0.5.5 contributes the one-word `Audit` invocation and canonical-lane BFL protocol.
- Older versions and DRC19 imported duplicates are excluded from active repository surfaces.

## Cross-contract behavior

DRC17 audits the DRC16 machine-work and visible-surface contract. DRC16 surfaces the DRC17 verdict and proof. Neither contract authorizes durable mutation.

## PG-U01 compatibility update

PG-U02 records the verified PG-U01 commit, consumes the PG-U01 repository commit gate, adds post-push evidence and changes PG-U01 checksum validation to unit-owned files plus record-level checks. This permits later units without weakening PG-U01 regression coverage.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
python -S tests/validate_pg_u02.py
```
