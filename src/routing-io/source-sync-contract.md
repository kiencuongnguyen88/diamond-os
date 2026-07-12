# PG-U03 — Source Sync Public Contract

Every source-content change must lock patch intent, map all active source surfaces, scan old and new references, classify historical references, remove active stale pointers, and return BFL readback before Human replacement.

## Required source surfaces

Boot, read-this-first, current manifest, Latest Authority Index, active runtime files, runtime-box or rolling surfaces when present, and package checksum/readback proof.

## Apply modes

- **Project manual replace:** Human replacement of boot + runtime ZIP is the apply action; post-replace work is readback.
- **Local agent apply:** requires explicit Human permission, actual file mutation and post-action readback.

## Version rule

A changed source tree must use a new source-pair version. Reusing an old active version name for changed content is blocked.

## Verdict

`PASS` requires zero active stale references. Historical references may remain only when clearly labeled and justified.
