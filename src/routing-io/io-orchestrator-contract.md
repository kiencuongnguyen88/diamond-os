# PG-U03 — IO Orchestrator Public Contract

This contract consolidates the current IO-first runtime into a public, model-invariant surface. The current source is **DZN32 IO Orchestrator v0.1.4**, which preserves v0.1.3 and adds a bounded Agency × Orchestration envelope.

## Visible operator flow

```text
Input readback → Output contract → Result → Proof → Human Gate
```

Human owns input, desired output and boundary. The system owns the internal ordered work. Internal prompts are machinery, not the Human review layer.

## Autonomy envelope

- Agency and orchestration are independent axes.
- Current ceiling: `AG3_BOUNDED_GOAL_DRIVEN` + `OR1_SEQUENTIAL_HANDOFF`.
- AG4/AG5 and OR2/OR3/OR4 are reference-only until adapters and proof paths exist.
- Use the lowest Agency and smallest topology sufficient for the bounded goal and proof.

## Authority

A mutation approval is valid only when the authority tuple is internally consistent and the Human authority reference has been verified. Package claim boundaries remain false.

## Boundary

No adapter, background worker, manager-worker subsystem, DB write, source apply, runtime activation, publish or canon promotion is created by PG-U03.
