# Sun Graph Git-native Core

This directory documents PG-U04. The reviewed source is Git-native schema and seed records; `.db` files are generated artifacts and are not tracked in the repository.

Build locally:

```bash
python -S tools/build_sun_graph_db.py --output /tmp/sun-graph.db
python -S tests/validate_pg_u04.py
```

The approved subset has 57 table definitions, 8 view definitions and 140 seed rows in 11 tables. The Human explicitly accepted the repaired-candidate count deltas recorded in `data/sun-graph/approved-public-subset.json`.
