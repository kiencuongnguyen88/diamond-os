# DRC16 Public Response Runtime Contract v0.1

DRC16 is the mandatory Human-visible response contract for DIAMOND OS / DZN32 work. It separates the underlying sandbox execution loop from the visible answer frame.

## Visible frame

1. A full `runtime_box.md — MAINLINE MAP` block appears first.
2. The state header follows: `HeaderMode`, `Writeback State`, `Source State`, `Artifact State`, `Box State`, `Human Gate`.
3. The answer preserves all eleven numbered sections across three layers.
4. The Footer records current task, pending tasks, priority, mode, phase, next step and status.
5. Section depth may shrink; the frame does not disappear unless Human explicitly permits a non-DRC short answer.

## Machine-work boundary

GPT performs machine-fit work before asking for authority: source readback, role routing, BFL, schema and proof inspection, candidate building, dry runs and readback packaging. Human Gate is reserved for durable authority actions.

## Human Gate

Gate options are `approve`, `reject`, `revise`, and `fail_retry`. A sandbox PASS does not mean source apply, DB write, canon promotion, commit, push, publication or runtime activation.

## Proof contract

The response surfaces the self-review verdict, checks already completed, changed/not-changed state, exact gate and next valid move. An artifact cannot replace the main answer.

## Source lineage

- Current primary: `PGU02-SRC-A01` — DRC16 v0.6.0 autonomous-run/Human-Gate surface.
- Compatibility semantics merged from: `PGU02-SRC-A03` — DRC16 v0.5.8 full visible frame.
- Historical DRC16 files remain traceable; no parallel active contract is copied.
