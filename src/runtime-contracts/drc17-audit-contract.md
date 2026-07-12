# DRC17 Public Audit Runtime Contract v0.1

DRC17 audits DRC16 execution, source discipline, BFL behavior, proof and Human Gate boundaries.

## Invocation

`Audit`, `audit`, or `RUN_AUDIT` invokes the full audit protocol without requiring the long prompt to be pasted again.

## Canonical-lane rule

Read the required canonical role lane. Do not blind-load the full runtime ZIP. Classify missing source explicitly and stop when an authority decision cannot be resolved from source.

## BFL audit

Check mainline drift, force loss, wrong source role, role collision, missing gate, missing proof/readback, writeback boundary, blocked claims and machine work pushed back to Human.

## Verdicts

- `PASS`
- `BLOCKED`
- `REPAIR_REQUIRED`
- `FAIL_RETRY`

The readback records `pass_for`, `not_done`, `blocked_claims` and `next_valid_move` through the DRC16 response surface.

## Peer-audit boundary

Architecture, source, DB/RLDB/CRM, activation-risk or repeated-failure implementation requires real independent peer output before the Human implementation gate. Simulated peer audit is a fail condition.

## Source lineage

- Current primary: `PGU02-SRC-A02` — DRC17 v0.6.0 autonomous-run/Human-Gate audit.
- Compatibility semantics merged from: `PGU02-SRC-A04` — DRC17 v0.5.5 `Audit` key/BFL protocol.
- Historical DRC17 files remain traceable; no parallel active contract is copied.
