-- PG-U05 exact selected DDL from active RLDB v12.60
PRAGMA foreign_keys = ON;

CREATE TABLE project_map (
    project_code TEXT PRIMARY KEY,
    project_name TEXT NOT NULL,
    project_role TEXT,
    active_db_pointer TEXT,
    rldb_pointer TEXT,
    archive_pointer TEXT,
    notes TEXT
);

CREATE TABLE learning_types (
    type_code TEXT PRIMARY KEY,
    description TEXT,
    notes TEXT
);

CREATE TABLE lifecycle_status (
    status_code TEXT PRIMARY KEY,
    description TEXT,
    active_flag INTEGER DEFAULT 0,
    archive_flag INTEGER DEFAULT 0,
    notes TEXT
);

CREATE TABLE lifecycle_transition_rules (
    rule_id TEXT PRIMARY KEY,
    from_status TEXT,
    to_status TEXT NOT NULL,
    condition TEXT NOT NULL,
    requires_human_approval INTEGER DEFAULT 0,
    requires_lifecycle_log INTEGER DEFAULT 1,
    notes TEXT,
    FOREIGN KEY(from_status) REFERENCES lifecycle_status(status_code),
    FOREIGN KEY(to_status) REFERENCES lifecycle_status(status_code)
);

CREATE TABLE learning_records (
    record_id TEXT PRIMARY KEY,
    project_code TEXT NOT NULL,
    record_type TEXT NOT NULL,
    title TEXT NOT NULL,
    runtime_event TEXT,
    friction_or_signal TEXT,
    root_cause TEXT,
    operating_lesson TEXT,
    better_runtime_move TEXT,
    eval_case TEXT,
    status TEXT NOT NULL,
    priority TEXT,
    runtime_value TEXT,
    source_context TEXT,
    created_at TEXT NOT NULL,
    last_used_at TEXT,
    archive_trigger TEXT NOT NULL,
    replacement_id TEXT,
    notes TEXT, linked_patch TEXT, linked_action_status TEXT DEFAULT 'none', save_gate_pass TEXT, human_decision TEXT,
    FOREIGN KEY(project_code) REFERENCES project_map(project_code),
    FOREIGN KEY(record_type) REFERENCES learning_types(type_code),
    FOREIGN KEY(status) REFERENCES lifecycle_status(status_code),
    FOREIGN KEY(replacement_id) REFERENCES learning_records(record_id)
);

CREATE TABLE lifecycle_log (
    log_id TEXT PRIMARY KEY,
    record_id TEXT NOT NULL,
    from_status TEXT,
    to_status TEXT NOT NULL,
    reason TEXT,
    changed_at TEXT NOT NULL,
    changed_by TEXT,
    FOREIGN KEY(record_id) REFERENCES learning_records(record_id),
    FOREIGN KEY(from_status) REFERENCES lifecycle_status(status_code),
    FOREIGN KEY(to_status) REFERENCES lifecycle_status(status_code)
);

CREATE TABLE linked_actions (
    action_id TEXT PRIMARY KEY,
    record_id TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_type TEXT,
    target_ref TEXT,
    action_status TEXT NOT NULL,
    evidence TEXT,
    created_at TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(record_id) REFERENCES learning_records(record_id)
);

CREATE TABLE rldb_capture_sources (
    capture_id TEXT PRIMARY KEY,
    record_id TEXT NOT NULL,
    source_kind TEXT,
    source_ref TEXT,
    source_span TEXT,
    capture_granularity TEXT,
    thread_anchor TEXT,
    human_signal_summary TEXT,
    living_data_summary TEXT,
    gpt_failure_summary TEXT,
    human_correction_summary TEXT,
    application_route TEXT,
    context_completeness TEXT,
    evidence_quality TEXT,
    privacy_sensitivity TEXT,
    redaction_state TEXT,
    created_at TEXT NOT NULL,
    notes TEXT, trace_role TEXT, capture_status TEXT, writeback_state TEXT, source_access_state TEXT, compile_batch_id TEXT,
    FOREIGN KEY (record_id) REFERENCES learning_records(record_id)
);

CREATE TABLE rldb_recall_index (
    recall_id TEXT PRIMARY KEY,

    record_id TEXT NOT NULL,

    trigger_kind TEXT NOT NULL,
    trigger_text TEXT NOT NULL,
    pattern_signature TEXT,

    opacity_state TEXT NOT NULL DEFAULT 'reference_blur',
    resolution_state TEXT NOT NULL DEFAULT 'trace_only',
    recall_state TEXT NOT NULL DEFAULT 'dormant',

    source_anchor_kind TEXT,
    source_anchor_ref TEXT,
    source_anchor_span TEXT,

    compare_target_record_id TEXT,

    save_readiness_state TEXT NOT NULL DEFAULT 'not_evaluated',
    lbs_rounds_required INTEGER NOT NULL DEFAULT 3,
    lbs_rounds_completed INTEGER NOT NULL DEFAULT 0,
    saturation_state TEXT NOT NULL DEFAULT 'not_checked',

    last_recalled_at TEXT,
    recall_count INTEGER NOT NULL DEFAULT 0,

    created_at TEXT NOT NULL,
    updated_at TEXT,
    notes TEXT,

    FOREIGN KEY (record_id) REFERENCES learning_records(record_id),
    FOREIGN KEY (compare_target_record_id) REFERENCES learning_records(record_id),

    CHECK (opacity_state IN (
        'full_active',
        'dim_active',
        'reference_blur',
        'archive_blur',
        'recall_up_sampled'
    )),

    CHECK (resolution_state IN (
        'full_text',
        'compact_text',
        'trace_only',
        'source_pointer_only',
        'full_trace_reopened'
    )),

    CHECK (recall_state IN (
        'dormant',
        'weak_match',
        'strong_match',
        'recalled_for_compare',
        'reactivated_candidate'
    )),

    CHECK (save_readiness_state IN (
        'not_evaluated',
        'save_worthy_signal',
        'lbs_required',
        'lbs_completed',
        'candidate_compiled',
        'writeback_proposal',
        'rejected_after_lbs'
    )),

    CHECK (saturation_state IN (
        'not_checked',
        'not_reached',
        'reached',
        'needs_more_lbs'
    )),

    CHECK (lbs_rounds_required >= 0),
    CHECK (lbs_rounds_completed >= 0)
);

CREATE TABLE rldb_recall_events (
    event_id TEXT PRIMARY KEY,

    recall_id TEXT NOT NULL,
    record_id TEXT NOT NULL,

    event_kind TEXT NOT NULL,
    current_case_ref TEXT,
    current_case_summary TEXT,

    match_strength TEXT NOT NULL DEFAULT 'weak',
    match_reason TEXT,

    source_trace_reopened INTEGER NOT NULL DEFAULT 0,

    lbs_round_1_result TEXT,
    lbs_round_2_result TEXT,
    lbs_round_3_result TEXT,
    lbs_rounds_completed INTEGER NOT NULL DEFAULT 0,

    saturation_state TEXT NOT NULL DEFAULT 'not_checked',

    compiled_output_state TEXT NOT NULL DEFAULT 'no_writeback',
    human_gate TEXT NOT NULL DEFAULT 'none',
    writeback_state TEXT NOT NULL DEFAULT 'no_writeback',

    created_at TEXT NOT NULL,
    created_by TEXT,
    notes TEXT,

    FOREIGN KEY (recall_id) REFERENCES rldb_recall_index(recall_id),
    FOREIGN KEY (record_id) REFERENCES learning_records(record_id),

    CHECK (event_kind IN (
        'weak_match_detected',
        'strong_match_detected',
        'source_trace_reopened',
        'lbs_started',
        'lbs_completed',
        'candidate_compiled',
        'reactivation_proposed',
        'kept_as_reference',
        'kept_archived'
    )),

    CHECK (match_strength IN (
        'weak',
        'medium',
        'strong'
    )),

    CHECK (source_trace_reopened IN (0, 1)),

    CHECK (lbs_rounds_completed >= 0),

    CHECK (saturation_state IN (
        'not_checked',
        'not_reached',
        'reached',
        'needs_more_lbs'
    )),

    CHECK (compiled_output_state IN (
        'ignore',
        'observe_later',
        'reference_only',
        'recall_trigger',
        'candidate',
        'writeback_proposal',
        'no_writeback'
    )),

    CHECK (human_gate IN (
        'none',
        'approve_candidate',
        'allow_writeback',
        'confirm_source_replace',
        'confirm_canon',
        'confirm_memory_save',
        'confirm_db_write'
    ))
);

CREATE TABLE rldb_hold_protocols (
    protocol_id TEXT PRIMARY KEY,
    protocol_name TEXT NOT NULL,
    protocol_kind TEXT NOT NULL,
    scope_summary TEXT,
    trigger_condition TEXT,
    operating_rail TEXT,
    human_gate TEXT,
    terminal_state TEXT,
    created_at TEXT NOT NULL,
    notes TEXT
);

CREATE TABLE rldb_hold_protocol_items (
    protocol_item_id TEXT PRIMARY KEY,
    protocol_id TEXT NOT NULL,
    record_id TEXT NOT NULL,
    family_id TEXT,
    status_snapshot TEXT,
    priority_snapshot TEXT,
    title_snapshot TEXT,
    risk_type TEXT,
    item_state TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    next_action TEXT,
    merge_allowed TEXT NOT NULL DEFAULT 'no',
    runtime_exposure_allowed TEXT NOT NULL DEFAULT 'no',
    positive_rewrite_allowed TEXT NOT NULL DEFAULT 'no',
    rationale TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    FOREIGN KEY(protocol_id) REFERENCES rldb_hold_protocols(protocol_id),
    FOREIGN KEY(record_id) REFERENCES learning_records(record_id)
);

CREATE TABLE rldb_hold_protocol_checkpoints (
    checkpoint_id TEXT PRIMARY KEY,
    db_pointer TEXT NOT NULL,
    checkpoint_kind TEXT NOT NULL,
    protocol_count INTEGER,
    protocol_item_count INTEGER,
    inline_patch_item_count INTEGER,
    observe_lifecycle_item_count INTEGER,
    merge_hold_item_count INTEGER,
    status_change_count INTEGER,
    merge_status_change_count INTEGER,
    summary TEXT,
    next_action TEXT,
    created_at TEXT NOT NULL,
    notes TEXT
);

CREATE TABLE rldb_protocol_decision_queue (
    decision_id TEXT PRIMARY KEY,
    protocol_id TEXT NOT NULL,
    record_id TEXT NOT NULL,
    decision_kind TEXT NOT NULL,
    current_recommendation TEXT,
    default_safe_state TEXT,
    human_gate TEXT,
    decision_state TEXT NOT NULL,
    created_at TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(protocol_id) REFERENCES rldb_hold_protocols(protocol_id),
    FOREIGN KEY(record_id) REFERENCES learning_records(record_id)
);

CREATE TABLE drc_import_rldb_eval_cases (
  eval_id TEXT PRIMARY KEY,
  case_name TEXT NOT NULL,
  input_text TEXT,
  expected_route TEXT,
  expected_output_shape TEXT,
  learning_state TEXT NOT NULL CHECK (learning_state IN ('imported_legacy_learning','active_candidate','evidence_only','needs_replay')),
  verdict TEXT,
  proof_ref TEXT,
  readback TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE VIEW active_runtime_view AS
SELECT record_id, title, record_type, priority, friction_or_signal, operating_lesson, better_runtime_move, runtime_value, last_used_at
FROM learning_records
WHERE status='active' OR priority IN ('high','critical')
ORDER BY CASE priority WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END, record_id;

CREATE VIEW archive_view AS
SELECT record_id, title, record_type, status, archive_trigger, replacement_id
FROM learning_records
WHERE status IN ('archived','deprecated','discarded','merged')
ORDER BY record_id;

CREATE VIEW reference_view AS
SELECT record_id, title, record_type, operating_lesson, runtime_value, source_context, linked_action_status
FROM learning_records
WHERE status IN ('reference','stabilized')
ORDER BY record_id;

CREATE VIEW review_queue_view AS
SELECT record_id, title, record_type, status, priority, linked_action_status, save_gate_pass, human_decision, created_at
FROM learning_records
WHERE status IN ('observe','archive_candidate')
   OR linked_action_status IN ('none','proposed')
   OR save_gate_pass IS NULL
ORDER BY created_at DESC;

CREATE VIEW linked_patch_view AS
SELECT lr.record_id, lr.title, lr.status, lr.linked_patch, lr.linked_action_status,
       la.action_id, la.action_type, la.target_type, la.target_ref, la.action_status, la.evidence
FROM learning_records lr
LEFT JOIN linked_actions la ON lr.record_id = la.record_id
ORDER BY lr.record_id, la.created_at;

CREATE VIEW rldb_index_view AS
SELECT record_id, title, record_type, status, priority, linked_action_status, created_at, last_used_at
FROM learning_records
ORDER BY record_id;

CREATE VIEW v_rldb_recall_ready_records AS
SELECT
    lr.record_id,
    lr.title,
    lr.status,
    lr.priority,
    ri.recall_id,
    ri.trigger_kind,
    ri.trigger_text,
    ri.pattern_signature,
    ri.opacity_state,
    ri.resolution_state,
    ri.recall_state,
    ri.save_readiness_state,
    ri.lbs_rounds_required,
    ri.lbs_rounds_completed,
    ri.saturation_state,
    ri.recall_count,
    ri.last_recalled_at
FROM learning_records lr
JOIN rldb_recall_index ri
    ON lr.record_id = ri.record_id
WHERE ri.opacity_state IN (
    'dim_active',
    'reference_blur',
    'archive_blur',
    'recall_up_sampled'
)
ORDER BY
    CASE ri.recall_state
        WHEN 'strong_match' THEN 1
        WHEN 'recalled_for_compare' THEN 2
        WHEN 'reactivated_candidate' THEN 3
        WHEN 'weak_match' THEN 4
        ELSE 5
    END,
    ri.last_recalled_at DESC,
    ri.recall_count DESC;

CREATE VIEW v_rldb_recall_health AS
SELECT
    ri.opacity_state,
    ri.resolution_state,
    ri.recall_state,
    ri.save_readiness_state,
    COUNT(*) AS record_count,
    SUM(ri.recall_count) AS total_recall_count
FROM rldb_recall_index ri
GROUP BY
    ri.opacity_state,
    ri.resolution_state,
    ri.recall_state,
    ri.save_readiness_state;

CREATE VIEW v_rldb_save_readiness_queue AS
SELECT
    lr.record_id,
    lr.title,
    lr.status,
    lr.priority,
    ri.recall_id,
    ri.trigger_kind,
    ri.trigger_text,
    ri.save_readiness_state,
    ri.lbs_rounds_required,
    ri.lbs_rounds_completed,
    ri.saturation_state,
    ri.created_at,
    ri.updated_at
FROM learning_records lr
JOIN rldb_recall_index ri
    ON lr.record_id = ri.record_id
WHERE ri.save_readiness_state IN (
    'save_worthy_signal',
    'lbs_required',
    'lbs_completed',
    'candidate_compiled',
    'writeback_proposal'
)
ORDER BY
    CASE ri.save_readiness_state
        WHEN 'writeback_proposal' THEN 1
        WHEN 'candidate_compiled' THEN 2
        WHEN 'lbs_completed' THEN 3
        WHEN 'lbs_required' THEN 4
        WHEN 'save_worthy_signal' THEN 5
        ELSE 6
    END,
    ri.updated_at DESC,
    ri.created_at DESC;

CREATE VIEW v_rldb_protocol_decision_queue_dashboard AS
SELECT protocol_id, decision_kind, default_safe_state, decision_state, COUNT(*) AS item_count
FROM rldb_protocol_decision_queue
GROUP BY protocol_id, decision_kind, default_safe_state, decision_state;

CREATE VIEW v_rldb_hold_protocol_dashboard AS
SELECT
    p.protocol_id,
    p.protocol_name,
    p.protocol_kind,
    p.terminal_state,
    COUNT(i.protocol_item_id) AS item_count,
    SUM(CASE WHEN i.risk_type IN ('inline_patch','complex_inline') THEN 1 ELSE 0 END) AS inline_patch_count,
    SUM(CASE WHEN i.risk_type='observe_lifecycle' THEN 1 ELSE 0 END) AS observe_lifecycle_count,
    SUM(CASE WHEN i.risk_type='merge_hold_after_review' THEN 1 ELSE 0 END) AS merge_hold_count
FROM rldb_hold_protocols p
LEFT JOIN rldb_hold_protocol_items i ON p.protocol_id = i.protocol_id
GROUP BY p.protocol_id, p.protocol_name, p.protocol_kind, p.terminal_state;
