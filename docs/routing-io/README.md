# PG-U03 — Routing and IO Public Core

PG-U03 publishes bounded task classification, IO orchestration, source-sync and Project/local source-representation contracts.

## Source selection

The locked PG-U03 mapping was produced on source pair v0.6.2.16. Before build, active source readback found v0.6.2.17. The candidate therefore refreshes only `PGU03-SRC-A01` from IO Orchestrator v0.1.3 to current v0.1.4; the other three mapped sources are unchanged. This is a source refresh within the locked PG-U03 semantic scope, not a new unit.

## Non-goals

No runtime executor, adapter, manager-worker topology, full ZIP loader, DB, source-apply tool, publish control or Super App implementation is added.

## Validate

```bash
python -S tests/validate_pg_u00.py
python -S tests/validate_pg_u01.py
python -S tests/validate_pg_u02.py
python -S tests/validate_pg_u03.py
```
