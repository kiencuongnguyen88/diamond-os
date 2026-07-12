# PG-U03 — Project / Local Source Mode Contract

DIAMOND OS keeps one logical source lineage with two environment representations.

- **Project:** one boot file plus one runtime ZIP; unzip before source analysis.
- **Local:** direct source-root directory; ZIP is optional for transport, release, backup or Project generation.

Parity requires the same logical version, required path inventory, per-file SHA256 values, manifest pointers and authority pointers. Private live DB files do not enter the runtime source ZIP.
