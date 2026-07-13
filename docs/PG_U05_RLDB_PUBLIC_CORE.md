# PG-U05 — RLDB Public Protocol and Schema Core

PG-U05 publishes a bounded, testable RLDB protocol surface without publishing the live learning corpus.

## Included

- 15 table contracts and 11 view contracts from the active RLDB v12.60 source;
- 30 Human-approved system lookup/protocol rows;
- four synthetic public fixture bundles;
- deterministic standard-library builder and validator;
- record-level provenance, privacy classification, redaction state, and content hashes.

## Excluded

- the active SQLite database;
- every live `learning_records`, capture, recall, linked action, decision queue, and raw-edge row;
- P1, P2, Family, finance, CRM, personal identifiers, credentials, and local user paths;
- source apply, DB/RLDB writeback, canon promotion, runtime activation, or publish authority.

The generated SQLite database is a disposable validation artifact and must not be committed.
