-- PG-U04 Sun Graph Git-native schema v0.1
-- Human-approved Option A: 57 tables, 8 views; generated SQLite is not tracked.
PRAGMA foreign_keys = OFF;

CREATE TABLE archive_lineage (
    lineage_id TEXT PRIMARY KEY,
    object_ref TEXT NOT NULL,
    object_type TEXT NOT NULL,
    previous_state TEXT,
    new_state TEXT,
    lineage_role TEXT NOT NULL,
    archive_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE artifact_bundle_records (
    artifact_id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    artifact_role TEXT NOT NULL,
    source_family_id TEXT NOT NULL,
    file_state TEXT NOT NULL,
    exists_in_sandbox INTEGER NOT NULL,
    size_bytes INTEGER,
    sha256 TEXT,
    linked_force_cell_id TEXT,
    placement_recommendation TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(source_family_id) REFERENCES source_families(source_family_id),
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE corpus_decision_outcomes (
    outcome_id TEXT PRIMARY KEY,
    corpus_object_id TEXT,
    decision_state TEXT NOT NULL,
    correction_summary TEXT,
    outcome_summary TEXT,
    learning_summary TEXT,
    proof_state TEXT NOT NULL,
    gate_state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(corpus_object_id) REFERENCES corpus_object_map(corpus_object_id)
);

CREATE TABLE corpus_object_map (
    corpus_object_id TEXT PRIMARY KEY,
    trace_id TEXT,
    object_id TEXT,
    object_type TEXT NOT NULL,
    object_summary TEXT NOT NULL,
    mapping_confidence TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(trace_id) REFERENCES corpus_raw_traces(trace_id),
    FOREIGN KEY(object_id) REFERENCES full_force_objects(object_id)
);

CREATE TABLE corpus_raw_traces (
    trace_id TEXT PRIMARY KEY,
    data_id TEXT,
    raw_line TEXT NOT NULL,
    source_ref TEXT,
    trace_role TEXT NOT NULL,
    capture_status TEXT NOT NULL,
    writeback_state TEXT NOT NULL,
    source_access_state TEXT NOT NULL,
    privacy_sensitivity TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(data_id) REFERENCES data_units(data_id)
);

CREATE TABLE corpus_text_chunks (
    chunk_id TEXT PRIMARY KEY,
    trace_id TEXT NOT NULL,
    artifact_id TEXT,
    filename TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    chunk_count INTEGER NOT NULL,
    char_start INTEGER NOT NULL,
    char_end INTEGER NOT NULL,
    chunk_sha256 TEXT NOT NULL,
    text_preview TEXT,
    text_body TEXT NOT NULL,
    linked_force_cell_id TEXT,
    import_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(trace_id) REFERENCES corpus_raw_traces(trace_id),
    FOREIGN KEY(artifact_id) REFERENCES artifact_bundle_records(artifact_id),
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE corpus_text_import_log (
    import_id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    artifact_role TEXT NOT NULL,
    linked_force_cell_id TEXT,
    readable_state TEXT NOT NULL,
    chunk_count INTEGER NOT NULL,
    char_count INTEGER NOT NULL,
    import_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE corpus_thread_task_edges (
    corpus_edge_id TEXT PRIMARY KEY,
    from_corpus_object_id TEXT NOT NULL,
    to_corpus_object_id TEXT NOT NULL,
    relation_type TEXT NOT NULL,
    thread_anchor TEXT,
    task_anchor TEXT,
    evidence_state TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(from_corpus_object_id) REFERENCES corpus_object_map(corpus_object_id),
    FOREIGN KEY(to_corpus_object_id) REFERENCES corpus_object_map(corpus_object_id)
);

CREATE TABLE data_cell_growth (
    growth_id TEXT PRIMARY KEY,
    data_id TEXT NOT NULL,
    force_cell_id TEXT NOT NULL,
    growth_type TEXT NOT NULL,
    growth_summary TEXT NOT NULL,
    evidence_state TEXT NOT NULL,
    action_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(data_id) REFERENCES data_units(data_id),
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE data_units (
    data_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    raw_text TEXT,
    data_type TEXT NOT NULL,
    layer_id INTEGER NOT NULL,
    owner_project_id TEXT,
    primary_force_cell_id TEXT,
    source_id TEXT,
    state TEXT NOT NULL,
    source_state TEXT NOT NULL,
    proof_state TEXT NOT NULL,
    usage_frequency TEXT NOT NULL,
    role_gravity TEXT NOT NULL,
    authority_impact TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(layer_id) REFERENCES sun_layers(layer_id),
    FOREIGN KEY(owner_project_id) REFERENCES projects(project_id),
    FOREIGN KEY(primary_force_cell_id) REFERENCES force_cells(force_cell_id),
    FOREIGN KEY(source_id) REFERENCES source_records(source_id)
);

CREATE TABLE db_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE drc_import_eval_scenarios (
  scenario_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  input TEXT,
  expected_output TEXT,
  verdict TEXT,
  state TEXT,
  readback TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE drc_import_force_cells (
  cell_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL,
  role TEXT NOT NULL,
  core_line TEXT NOT NULL,
  target_slots TEXT NOT NULL,
  state TEXT NOT NULL,
  gate TEXT NOT NULL,
  project_code TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE drc_import_force_edges (
  edge_id TEXT PRIMARY KEY,
  source_node TEXT NOT NULL,
  target_node TEXT NOT NULL,
  edge_type TEXT NOT NULL,
  role TEXT,
  state TEXT,
  readback TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE drc_import_force_phrases (
  phrase_id TEXT PRIMARY KEY,
  cell_id TEXT NOT NULL,
  force_phrase TEXT NOT NULL,
  role TEXT,
  state TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(cell_id) REFERENCES drc_import_force_cells(cell_id)
);

CREATE TABLE drc_import_load_ledger (
  ledger_id TEXT PRIMARY KEY,
  load_name TEXT NOT NULL,
  source_db TEXT NOT NULL,
  output_db TEXT NOT NULL,
  load_state TEXT NOT NULL,
  integrity_before TEXT,
  integrity_after TEXT,
  original_db_mutated INTEGER NOT NULL,
  readback TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE drc_import_microchips (
  microchip_id TEXT PRIMARY KEY,
  cell_id TEXT NOT NULL,
  microchip TEXT NOT NULL,
  role TEXT,
  state TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(cell_id) REFERENCES drc_import_force_cells(cell_id)
);

CREATE TABLE drc_import_placement_checks (
  check_id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL,
  slot TEXT NOT NULL,
  verdict TEXT NOT NULL,
  role_fit TEXT,
  state_fit TEXT,
  gate_fit TEXT,
  route_fit TEXT,
  over_import_risk TEXT,
  readback TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(source_id) REFERENCES drc_import_source_records(source_id)
);

CREATE TABLE drc_import_source_records (
  source_id TEXT PRIMARY KEY,
  slot TEXT NOT NULL,
  source_file TEXT NOT NULL,
  source_role TEXT NOT NULL,
  source_state TEXT NOT NULL,
  sha256 TEXT,
  size_bytes INTEGER,
  readback TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE eval_scenarios (
    eval_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    failure_mode TEXT NOT NULL,
    prompt TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    force_cell_refs_json TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_active_cell_index (
    index_id TEXT PRIMARY KEY,
    force_cell_id TEXT,
    layer_id INTEGER,
    cluster_id TEXT,
    name TEXT,
    line TEXT,
    source_state TEXT,
    proof_state TEXT,
    fit_role TEXT,
    fit_state TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_audit_findings (
    finding_id TEXT PRIMARY KEY,
    axis TEXT NOT NULL,
    verdict TEXT NOT NULL,
    summary TEXT NOT NULL,
    risk TEXT,
    action TEXT,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_audit_plan (
    plan_id TEXT PRIMARY KEY,
    step_order INTEGER,
    step_name TEXT NOT NULL,
    purpose TEXT NOT NULL,
    pass_condition TEXT NOT NULL,
    output_ref TEXT,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_cluster_index (
    cluster_id TEXT PRIMARY KEY,
    layer_id INTEGER,
    layer_code TEXT,
    cluster_name TEXT,
    cluster_role TEXT,
    force_cell_count INTEGER,
    active_force_cell_count INTEGER,
    source_ref_count INTEGER,
    sample_cells_json TEXT,
    route_hint TEXT,
    gate_hint TEXT,
    fit_state TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_layer_summary (
    layer_id INTEGER PRIMARY KEY,
    layer_code TEXT,
    layer_name TEXT,
    total_force_cells INTEGER,
    active_force_cells INTEGER,
    merged_absorbed_cells INTEGER,
    fit_cluster_count INTEGER,
    fit_role TEXT,
    fit_verdict TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_merge_groups_v18 (
    group_id TEXT PRIMARY KEY,
    layer_id INTEGER,
    merge_key TEXT,
    representative_force_cell_id TEXT,
    absorbed_force_cell_ids_json TEXT,
    group_size INTEGER,
    merge_reason TEXT,
    state TEXT,
    created_at TEXT
);

CREATE TABLE fit_project_coverage_v18 (
    owner TEXT PRIMARY KEY,
    active_force_cells INTEGER,
    total_force_cells INTEGER,
    orbit_force_cells INTEGER,
    core_force_cells INTEGER,
    coverage_role TEXT,
    gap_note TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE fit_run_meta_v18 (
    key TEXT PRIMARY KEY,
    value TEXT
);

CREATE TABLE force_cell_code_aliases (
    alias_id TEXT PRIMARY KEY,
    force_cell_id TEXT NOT NULL,
    old_code TEXT NOT NULL,
    new_code TEXT NOT NULL,
    migration_version TEXT NOT NULL,
    migration_role TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE force_cell_families (
    family_id TEXT PRIMARY KEY,
    family_name TEXT NOT NULL,
    role TEXT NOT NULL,
    core_line TEXT NOT NULL,
    default_layer_id INTEGER,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(default_layer_id) REFERENCES sun_layers(layer_id)
);

CREATE TABLE force_cell_numbering_map (
    stable_code TEXT PRIMARY KEY,
    force_cell_id TEXT NOT NULL UNIQUE,
    layer_number INTEGER NOT NULL,
    cell_order INTEGER NOT NULL,
    layer_code TEXT NOT NULL,
    label TEXT NOT NULL,
    number_role TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL, legacy_stable_code TEXT, numbering_version TEXT,
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE force_cell_priority_queue (
    queue_id TEXT PRIMARY KEY,
    stable_code TEXT NOT NULL,
    force_cell_id TEXT NOT NULL,
    priority_band TEXT NOT NULL,
    reason TEXT NOT NULL,
    next_action TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE force_cells (
    force_cell_id TEXT PRIMARY KEY,
    family_id TEXT,
    name TEXT NOT NULL,
    line TEXT NOT NULL,
    role TEXT NOT NULL,
    core_or_orbit TEXT NOT NULL,
    layer_id INTEGER,
    owner TEXT NOT NULL,
    protects_json TEXT NOT NULL,
    default_route_json TEXT NOT NULL,
    growth_mode_json TEXT NOT NULL,
    source_state TEXT NOT NULL,
    proof_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    state TEXT NOT NULL,
    object_class TEXT NOT NULL DEFAULT 'force_cell',
    object_mode TEXT NOT NULL,
    knowledge_tier TEXT,
    force_type_json TEXT,
    readback_line TEXT NOT NULL,
    blocked_misuse_json TEXT,
    created_at TEXT NOT NULL,
    notes TEXT, stable_code TEXT, layer_number INTEGER, cell_order INTEGER, registry_label TEXT, maturity_level TEXT, intake_priority TEXT, baseline_candidate_state TEXT, legacy_stable_code TEXT,
    FOREIGN KEY(family_id) REFERENCES force_cell_families(family_id),
    FOREIGN KEY(layer_id) REFERENCES sun_layers(layer_id)
);

CREATE TABLE force_compression_log (
    compression_id TEXT PRIMARY KEY,
    source_chunk_id TEXT,
    force_phrase_id TEXT,
    microchip_id TEXT,
    linked_force_cell_id TEXT,
    compression_result TEXT NOT NULL,
    loss_risk TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL, reason_json TEXT,
    FOREIGN KEY(source_chunk_id) REFERENCES corpus_text_chunks(chunk_id),
    FOREIGN KEY(force_phrase_id) REFERENCES force_phrases(force_phrase_id),
    FOREIGN KEY(microchip_id) REFERENCES microchips(microchip_id),
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE force_edges (
    edge_id TEXT PRIMARY KEY,
    from_object_id TEXT NOT NULL,
    to_object_id TEXT NOT NULL,
    edge_type TEXT NOT NULL,
    role TEXT NOT NULL,
    state TEXT NOT NULL,
    gate TEXT,
    readback_line TEXT,
    evidence_state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(from_object_id) REFERENCES full_force_objects(object_id),
    FOREIGN KEY(to_object_id) REFERENCES full_force_objects(object_id)
);

CREATE TABLE force_flows (
    flow_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    steps_json TEXT NOT NULL,
    state TEXT NOT NULL,
    gate TEXT,
    linked_force_cell_id TEXT,
    readback_line TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE force_phrases (
    force_phrase_id TEXT PRIMARY KEY,
    phrase_code TEXT UNIQUE,
    text TEXT NOT NULL,
    meaning_summary TEXT NOT NULL,
    phrase_role TEXT NOT NULL,
    linked_force_cell_id TEXT,
    source_artifact_id TEXT,
    source_chunk_id TEXT,
    source_type TEXT NOT NULL,
    force_score INTEGER NOT NULL CHECK(force_score BETWEEN 0 AND 5),
    wording_dependency TEXT NOT NULL,
    compression_state TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id),
    FOREIGN KEY(source_artifact_id) REFERENCES artifact_bundle_records(artifact_id),
    FOREIGN KEY(source_chunk_id) REFERENCES corpus_text_chunks(chunk_id)
);

CREATE TABLE force_skills (
    skill_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    trigger_json TEXT NOT NULL,
    output_json TEXT NOT NULL,
    state TEXT NOT NULL,
    gate TEXT,
    linked_force_cell_id TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE full_artifact_import_log (
    import_id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    artifact_role TEXT NOT NULL,
    linked_force_cell_id TEXT,
    priority TEXT NOT NULL,
    target_mapping TEXT NOT NULL,
    import_phase TEXT NOT NULL,
    artifact_bundle_state TEXT NOT NULL,
    source_record_state TEXT NOT NULL,
    lineage_state TEXT NOT NULL,
    hash_sha256 TEXT,
    size_bytes INTEGER,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE full_force_objects (
    object_id TEXT PRIMARY KEY,
    object_class TEXT NOT NULL,
    object_mode TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    force_cell_id TEXT,
    layer_id INTEGER,
    knowledge_tier TEXT,
    parent_object_id TEXT,
    owner TEXT,
    role TEXT,
    state TEXT NOT NULL,
    gate TEXT,
    source_state TEXT NOT NULL,
    proof_state TEXT NOT NULL,
    readback_line TEXT,
    payload_json TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id),
    FOREIGN KEY(layer_id) REFERENCES sun_layers(layer_id),
    FOREIGN KEY(parent_object_id) REFERENCES full_force_objects(object_id)
);

CREATE TABLE gates (
    gate_id TEXT PRIMARY KEY,
    gate_type TEXT NOT NULL,
    name TEXT NOT NULL,
    trigger_json TEXT NOT NULL,
    required_proof_json TEXT NOT NULL,
    stop_state TEXT NOT NULL,
    owner TEXT NOT NULL,
    force_cell_id TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE import_batches (
    batch_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    source_basis TEXT NOT NULL,
    import_state TEXT NOT NULL,
    row_counts_json TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE microchip_variation_axes (
    axis_id TEXT PRIMARY KEY,
    microchip_id TEXT NOT NULL,
    axis_name TEXT NOT NULL,
    axis_role TEXT NOT NULL,
    examples_json TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(microchip_id) REFERENCES microchips(microchip_id)
);

CREATE TABLE microchips (
    microchip_id TEXT PRIMARY KEY,
    microchip_code TEXT UNIQUE,
    microchip_line TEXT NOT NULL,
    meaning_core TEXT NOT NULL,
    linked_force_cell_id TEXT,
    variant_capacity TEXT NOT NULL,
    transformation_axes_json TEXT NOT NULL,
    source_force_phrase_id TEXT,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(linked_force_cell_id) REFERENCES force_cells(force_cell_id),
    FOREIGN KEY(source_force_phrase_id) REFERENCES force_phrases(force_phrase_id)
);

CREATE TABLE patch_candidates (
    candidate_id TEXT PRIMARY KEY,
    gate_id TEXT,
    candidate_type TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    state TEXT NOT NULL,
    target_table TEXT,
    target_record TEXT,
    proposed_values_json TEXT NOT NULL,
    proof TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    apply_gate TEXT NOT NULL,
    candidate_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(gate_id) REFERENCES gates(gate_id)
);

CREATE TABLE placement_checks (
    check_id TEXT PRIMARY KEY,
    data_id TEXT,
    role_gravity TEXT NOT NULL,
    authority_impact TEXT NOT NULL,
    system_dependency TEXT NOT NULL,
    source_proof TEXT NOT NULL,
    owner_clarity TEXT NOT NULL,
    gate_clarity TEXT NOT NULL,
    usage_frequency TEXT NOT NULL,
    recommended_layer_id INTEGER NOT NULL,
    recommended_surface TEXT,
    verdict TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(data_id) REFERENCES data_units(data_id),
    FOREIGN KEY(recommended_layer_id) REFERENCES sun_layers(layer_id)
);

CREATE TABLE project_cell_refs (
    project_id TEXT NOT NULL,
    force_cell_id TEXT NOT NULL,
    ref_role TEXT NOT NULL,
    PRIMARY KEY(project_id, force_cell_id),
    FOREIGN KEY(project_id) REFERENCES projects(project_id),
    FOREIGN KEY(force_cell_id) REFERENCES force_cells(force_cell_id)
);

CREATE TABLE projects (
    project_id TEXT PRIMARY KEY,
    project_name TEXT NOT NULL,
    role TEXT NOT NULL,
    core_or_orbit TEXT NOT NULL,
    layer_id INTEGER,
    source_family TEXT,
    data_family TEXT,
    owner_state TEXT NOT NULL,
    writeback_gate TEXT NOT NULL,
    current_gap TEXT,
    next_action TEXT,
    state TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(layer_id) REFERENCES sun_layers(layer_id)
);

CREATE TABLE raw_text_policy (
    policy_id TEXT PRIMARY KEY,
    source_artifact_id TEXT,
    source_chunk_id TEXT,
    raw_text_role TEXT NOT NULL,
    keep_mode TEXT NOT NULL,
    reason TEXT NOT NULL,
    force_score_threshold INTEGER NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(source_artifact_id) REFERENCES artifact_bundle_records(artifact_id),
    FOREIGN KEY(source_chunk_id) REFERENCES corpus_text_chunks(chunk_id)
);

CREATE TABLE readback_ledger (
    readback_id TEXT PRIMARY KEY,
    target_ref TEXT NOT NULL,
    check_type TEXT NOT NULL,
    result TEXT NOT NULL,
    expected_marker TEXT,
    evidence_summary TEXT,
    gap_summary TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE source_families (
    source_family_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    source_type TEXT NOT NULL,
    authority_level TEXT NOT NULL,
    owner TEXT NOT NULL,
    default_layer_id INTEGER,
    writeback_gate TEXT NOT NULL,
    readback_requirement TEXT NOT NULL,
    state TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(default_layer_id) REFERENCES sun_layers(layer_id)
);

CREATE TABLE source_records (
    source_id TEXT PRIMARY KEY,
    source_family_id TEXT NOT NULL,
    title TEXT NOT NULL,
    ref TEXT,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    evidence_level TEXT NOT NULL,
    freshness_state TEXT NOT NULL,
    writeback_state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    hash_sha256 TEXT,
    size_bytes INTEGER,
    notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(source_family_id) REFERENCES source_families(source_family_id)
);

CREATE TABLE sun_layers (
    layer_id INTEGER PRIMARY KEY,
    layer_code TEXT UNIQUE NOT NULL,
    layer_name TEXT NOT NULL,
    layer_type TEXT NOT NULL,
    role TEXT NOT NULL,
    admission_rule TEXT NOT NULL,
    blocked_misuse TEXT,
    force_cell TEXT,
    remove_test TEXT,
    default_state TEXT NOT NULL
);

CREATE TABLE training_surfaces (
    training_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    source_outcome_id TEXT,
    prompt TEXT NOT NULL,
    expected_behavior TEXT NOT NULL,
    rubric_json TEXT,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(source_outcome_id) REFERENCES corpus_decision_outcomes(outcome_id)
);

CREATE TABLE transaction_packets (
    packet_id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    packet_type TEXT NOT NULL,
    owner TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    state TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(transaction_id) REFERENCES transactions(transaction_id)
);

CREATE TABLE transactions (
    transaction_id TEXT PRIMARY KEY,
    input_summary TEXT NOT NULL,
    task_type TEXT NOT NULL,
    role_owner TEXT NOT NULL,
    route TEXT NOT NULL,
    source_state TEXT NOT NULL,
    packet_type TEXT NOT NULL,
    gate_state TEXT NOT NULL,
    output_state TEXT NOT NULL,
    writeback_state TEXT NOT NULL,
    trace_state TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE writeback_ledger (
    writeback_id TEXT PRIMARY KEY,
    target_family TEXT NOT NULL,
    target_ref TEXT,
    write_mode TEXT NOT NULL,
    source_basis TEXT NOT NULL,
    proof_available TEXT NOT NULL,
    readback_plan TEXT NOT NULL,
    human_gate TEXT NOT NULL,
    writeback_state TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE VIEW v_data_placement_review AS
SELECT
    du.data_id,
    du.title,
    sl.layer_code,
    sl.layer_name,
    fc.force_cell_id,
    fc.name AS force_cell_name,
    du.usage_frequency,
    du.role_gravity,
    du.authority_impact,
    du.recommended_action,
    du.state,
    du.human_gate
FROM data_units du
JOIN sun_layers sl ON du.layer_id = sl.layer_id
LEFT JOIN force_cells fc ON du.primary_force_cell_id = fc.force_cell_id;

CREATE VIEW v_force_cell_dashboard AS
SELECT
    fc.force_cell_id,
    fc.name,
    fc.line,
    fc.core_or_orbit,
    sl.layer_code,
    sl.layer_name,
    fcf.family_name,
    fc.state,
    fc.source_state,
    fc.proof_state,
    fc.human_gate
FROM force_cells fc
LEFT JOIN sun_layers sl ON fc.layer_id = sl.layer_id
LEFT JOIN force_cell_families fcf ON fc.family_id = fcf.family_id;

CREATE VIEW v_force_phrase_dashboard AS
SELECT
    fp.force_phrase_id,
    fp.phrase_code,
    fp.text,
    fp.phrase_role,
    fp.force_score,
    fp.wording_dependency,
    fp.compression_state,
    fc.stable_code AS force_cell_code,
    fc.name AS force_cell_name,
    fp.state,
    fp.human_gate
FROM force_phrases fp
LEFT JOIN force_cells fc ON fp.linked_force_cell_id = fc.force_cell_id;

CREATE VIEW v_gate_watch AS
SELECT gate_id, gate_type, name, stop_state, owner, trigger_json, required_proof_json
FROM gates;

CREATE VIEW v_microchip_dashboard AS
SELECT
    m.microchip_id,
    m.microchip_code,
    m.microchip_line,
    m.meaning_core,
    fc.stable_code AS force_cell_code,
    fc.name AS force_cell_name,
    m.variant_capacity,
    m.state,
    m.human_gate
FROM microchips m
LEFT JOIN force_cells fc ON m.linked_force_cell_id = fc.force_cell_id;

CREATE VIEW v_project_cell_map AS
SELECT
    p.project_id,
    p.project_name,
    p.role AS project_role,
    p.core_or_orbit,
    sl.layer_code,
    p.source_family,
    p.data_family,
    GROUP_CONCAT(pcr.force_cell_id, ', ') AS cell_refs,
    p.writeback_gate,
    p.current_gap,
    p.state
FROM projects p
LEFT JOIN sun_layers sl ON p.layer_id = sl.layer_id
LEFT JOIN project_cell_refs pcr ON p.project_id = pcr.project_id
GROUP BY p.project_id;

CREATE VIEW v_raw_text_policy_review AS
SELECT
    r.policy_id,
    a.filename,
    r.source_chunk_id,
    r.raw_text_role,
    r.keep_mode,
    r.reason,
    r.force_score_threshold,
    r.state,
    r.human_gate
FROM raw_text_policy r
LEFT JOIN artifact_bundle_records a ON r.source_artifact_id = a.artifact_id;

CREATE VIEW v_writeback_status AS
SELECT writeback_id, target_family, target_ref, write_mode, proof_available, human_gate, writeback_state, created_at
FROM writeback_ledger;
