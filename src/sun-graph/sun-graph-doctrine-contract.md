# PG-U04 Sun Graph Doctrine Git-native Core

PG-U04 publishes the Human-approved Sun Graph doctrine/mechanism schema as reviewed text and canonical JSONL seed records. The SQLite database is generated, disposable and not tracked.

## Authority boundary

- Review basis: `DZN32_SUN_GRAPH_DOCTRINE_CORE_v0_1_2_repaired.db`.
- Human selection: Option A, 57 tables, 8 views, 140 rows across 11 seed tables.
- Git does not promote this unit to canon.
- Private P1/P2/P7 operational records, bulk archive data and SQLite binaries are excluded.

## Build contract

`migrations/sun-graph/001_schema.sql` + `data/sun-graph/seeds/*.jsonl` -> `tools/build_sun_graph_db.py` -> generated SQLite -> quick check, FK check, view compile and rowset verification.
