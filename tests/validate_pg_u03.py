from pathlib import Path
import ast, hashlib, json, re, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
RESULTS=[]
NEW_PATHS=["src/routing-io/io-orchestrator-contract.md", "src/routing-io/source-sync-contract.md", "src/routing-io/project-local-source-mode-contract.md", "data/routing-io/io-orchestrator-contract.json", "data/routing-io/source-sync-contract.json", "data/routing-io/project-local-source-mode-contract.json", "data/routing-io/task-classifier.json", "data/routing-io/pg-u03-checksum-manifest.json", "schemas/routing-io/io-orchestrator-contract.schema.json", "schemas/routing-io/source-sync-contract.schema.json", "schemas/routing-io/project-local-source-mode-contract.schema.json", "schemas/routing-io/task-classifier.schema.json", "docs/routing-io/README.md", "tests/PG_U03_TEST_MATRIX.json", "tests/validate_pg_u03.py"]
EXPECTED_TESTS=["required_pg_u03_tree_present", "exact_pg_u03_new_path_set", "json_files_parse", "routing_schemas_draft_2020_12", "io_schema_validation_passes", "source_sync_schema_validation_passes", "project_local_schema_validation_passes", "task_classifier_schema_validation_passes", "exact_four_PG_U03_source_refs", "PG_U03_source_hashes_match_active_v0_6_2_17", "mapping_refresh_from_v0_6_2_16_documented", "IO_v0_1_4_selected_current", "IO_v0_1_3_preserved_as_base_not_parallel_contract", "visible_IO_flow_exact", "Human_owns_input_output_boundary", "system_owns_internal_ordered_work", "agency_axis_independent", "orchestration_axis_independent", "current_ceiling_AG3_OR1", "deferred_levels_parked", "authority_no_mutation_tuple_consistent", "authority_pending_requires_Human_gate", "authority_approved_requires_verified_ref", "optional_context_split_deterministic", "required_source_missing_fails_closed", "route_map_roles_present", "no_runtime_adapter_implementation", "source_sync_patch_intent_lock", "source_sync_surface_map_complete", "source_sync_reference_impact_graph", "source_sync_active_stale_ref_blocks", "source_sync_historical_ref_allowed_with_reason", "source_sync_human_surface_sweep", "source_sync_BFL_readback_fields", "manual_replace_mode_correct", "agent_apply_mode_gated", "source_pair_version_bump_required", "source_sync_fail_stops_present", "one_lineage_two_representations", "Project_ZIP_required", "Local_direct_source_allowed", "parity_compare_set_complete", "private_DB_outside_runtime_ZIP", "task_classifier_bounded_role_loads", "task_classifier_no_blind_full_ZIP", "legacy_slot_names_not_public_authority", "P1_private_boundary_preserved", "all_claim_boundaries_false", "PG_U03_ledger_record_present", "PG_U03_dependencies_exact", "PG_U03_commit_gate_consumed", "PG_U02_post_commit_residual_resolved", "PG_U02_exact_commit_bound", "PG_U03_source_refs_registered", "PG_U03_evidence_refs_registered", "compatibility_records_no_authority", "PG_U03_checksum_manifest_matches", "private_and_generated_artifacts_absent", "prior_unit_regressions_pass", "test_matrix_and_stdlib_validator_match"]
EXPECTED_HASHES={"PGU03-SRC-A01": "7eebc5a0080720594b08d19f5a8f57d406bdb08db6f01e1a6fafff43173907cf", "PGU03-SRC-A02": "eff7171d9d0bf9ad1023c03aa99747b9fcc1a5d92d9ae0d179271eb759349aa5", "PGU03-SRC-A03": "9f6cb64846a6aba4458892dbcbd9f84a29b2df3ac510df0b62e7117207817979", "PGU03-SRC-A04": "df15056bf1340965a9968b3287345da4c1ad90e1ba8d851813ef851269b78253"}
OWNED_PATHS=[p for p in NEW_PATHS if p!='data/routing-io/pg-u03-checksum-manifest.json']
CLAIM_KEYS=["source_apply", "DB_write", "RLDB_writeback", "canon", "commit", "push", "publish", "runtime_activation"]
def check(n,c,d=''): RESULTS.append((n,'PASS' if c else 'FAIL','' if c else d))
def load(r): return json.loads((ROOT/r).read_text(encoding='utf-8'))
def cbytes(r): return (ROOT/r).read_bytes().replace(b'\r\n',b'\n').replace(b'\r',b'\n')
def type_ok(v,e):
 names=e if isinstance(e,list) else [e]; m={'object':lambda x:isinstance(x,dict),'array':lambda x:isinstance(x,list),'string':lambda x:isinstance(x,str),'integer':lambda x:isinstance(x,int) and not isinstance(x,bool),'boolean':lambda x:isinstance(x,bool),'null':lambda x:x is None}; return any(m[n](v) for n in names)
def validate(i,s,p='$',errs=None):
 errs=[] if errs is None else errs
 if 'type' in s and not type_ok(i,s['type']): errs.append(f'{p}: type failed'); return errs
 if 'const' in s and i!=s['const']: errs.append(f'{p}: const failed')
 if 'enum' in s and i not in s['enum']: errs.append(f'{p}: enum failed')
 if isinstance(i,str) and 'pattern' in s and not re.match(s['pattern'],i): errs.append(f'{p}: pattern failed')
 if isinstance(i,list):
  if len(i)<s.get('minItems',0): errs.append(f'{p}: minItems failed')
  for n,v in enumerate(i):
   if 'items' in s: validate(v,s['items'],f'{p}[{n}]',errs)
 if isinstance(i,dict):
  for k in s.get('required',[]):
   if k not in i: errs.append(f'{p}: missing {k}')
  props=s.get('properties',{})
  for k,v in i.items():
   if k in props: validate(v,props[k],f'{p}.{k}',errs)
   elif s.get('additionalProperties') is False: errs.append(f'{p}: unexpected {k}')
 return errs
check('required_pg_u03_tree_present',all((ROOT/p).is_file() for p in NEW_PATHS))
actual_new={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and ('routing-io' in p.parts or p.name in ('PG_U03_TEST_MATRIX.json','validate_pg_u03.py'))}
check('exact_pg_u03_new_path_set',actual_new==set(NEW_PATHS),str(sorted(actual_new^set(NEW_PATHS))))
json_paths=[p for p in NEW_PATHS if p.endswith('.json')]
parsed={}; pe=[]
for p in json_paths:
 try: parsed[p]=load(p)
 except Exception as e: pe.append(f'{p}: {e}')
check('json_files_parse',not pe,str(pe))
schemas=[p for p in json_paths if p.startswith('schemas/')]
check('routing_schemas_draft_2020_12',all(parsed[p].get('$schema')=='https://json-schema.org/draft/2020-12/schema' for p in schemas))
pairs=[('schemas/routing-io/io-orchestrator-contract.schema.json','data/routing-io/io-orchestrator-contract.json'),('schemas/routing-io/source-sync-contract.schema.json','data/routing-io/source-sync-contract.json'),('schemas/routing-io/project-local-source-mode-contract.schema.json','data/routing-io/project-local-source-mode-contract.json'),('schemas/routing-io/task-classifier.schema.json','data/routing-io/task-classifier.json')]
for name,(s,i) in zip(['io_schema_validation_passes','source_sync_schema_validation_passes','project_local_schema_validation_passes','task_classifier_schema_validation_passes'],pairs): check(name,not validate(parsed[i],parsed[s]),str(validate(parsed[i],parsed[s])))
ledger=load('data/source-ledger/public-unit-ledger.json'); units={u['unit_id']:u for u in ledger['units']}; u3=units.get('PG-U03',{}); refs=u3.get('source_hashes',[])
check('exact_four_PG_U03_source_refs',[r['source_ref_id'] for r in refs]==list(EXPECTED_HASHES))
check('PG_U03_source_hashes_match_active_v0_6_2_17',{r['source_ref_id']:r['sha256'] for r in refs}==EXPECTED_HASHES)
doc=(ROOT/'docs/routing-io/README.md').read_text(encoding='utf-8')
check('mapping_refresh_from_v0_6_2_16_documented','v0.6.2.16' in doc and 'v0.6.2.17' in doc and 'refreshes only `PGU03-SRC-A01`' in doc)
io=parsed['data/routing-io/io-orchestrator-contract.json']; ss=parsed['data/routing-io/source-sync-contract.json']; pm=parsed['data/routing-io/project-local-source-mode-contract.json']; tc=parsed['data/routing-io/task-classifier.json']
check('IO_v0_1_4_selected_current',io['source_selection']['current_source_version']=='v0.1.4' and io['source_selection']['current_source_ref']=='PGU03-SRC-A01')
check('IO_v0_1_3_preserved_as_base_not_parallel_contract',io['source_selection']['preserved_base_version']=='v0.1.3' and not (ROOT/'src/routing-io/io-orchestrator-v0_1_3.md').exists())
check('visible_IO_flow_exact',io['visible_flow']==['input_readback','output_contract','result','proof','human_gate'])
check('Human_owns_input_output_boundary',set(io['human_ownership'])=={'input_material','desired_output','boundary'})
check('system_owns_internal_ordered_work',set(io['system_ownership'])>={'intent_parse','task_classification','boundary_scan','route_selection','execution_order','self_check','proof_pack','output_assembly'})
check('agency_axis_independent',io['agency_axis']['independent_from_orchestration'] is True and io['agency_axis']['meaning']=='decision_freedom_inside_one_task')
check('orchestration_axis_independent',io['orchestration_axis']['independent_from_agency'] is True and io['orchestration_axis']['meaning']=='actor_model_tool_topology')
check('current_ceiling_AG3_OR1',io['agency_axis']['current_ceiling']=='AG3_BOUNDED_GOAL_DRIVEN' and io['orchestration_axis']['current_ceiling']=='OR1_SEQUENTIAL_HANDOFF')
check('deferred_levels_parked',io['agency_axis']['deferred_levels']==['AG4_POLICY_BOUNDED_ADAPTIVE','AG5_EXCEPTION_ESCALATION_AUTONOMY'] and io['orchestration_axis']['deferred_levels']==['OR2_MANAGER_WORKER','OR3_PARALLEL_SPECIALISTS','OR4_PERSISTENT_MULTI_AGENT'])
at=io['authority_tuple']; check('authority_no_mutation_tuple_consistent',at['no_mutation']=={'mutation_requested':False,'mutation_approved':False,'approval_state':'not_required','approved_authority_ref':'','approved_authority_ref_verified':False})
check('authority_pending_requires_Human_gate',at['mutation_pending']['decision']=='HUMAN_GATE_REQUIRED')
check('authority_approved_requires_verified_ref','approved_authority_ref_verified_true' in at['mutation_approved_requires'])
check('optional_context_split_deterministic',io['optional_context_rule']['affects_safety_scope_boundary_or_level_selection']=='REQUEST_CONTEXT' and io['optional_context_rule']['does_not_affect_safe_nonexecuting_answer']['mutation_allowed'] is False)
check('required_source_missing_fails_closed',io['stop_codes']['required_source_missing']=='BLOCKED_SOURCE_READBACK_REQUIRED')
check('route_map_roles_present',set(io['route_map'].values())=={'GPT','Claude','Gemini','Codex','Sandbox_Runner','Human_Gate'})
check('no_runtime_adapter_implementation',io['scope_lock']['adapter_implemented'] is False and io['scope_lock']['new_subsystem_created'] is False)
check('source_sync_patch_intent_lock',ss['patch_intent_lock']==['what_changes','new_current_file','old_file_history_policy','active_surfaces_to_update'])
check('source_sync_surface_map_complete',len(ss['minimum_source_surface_map'])==8 and 'boot' in ss['minimum_source_surface_map'] and 'latest_authority_index' in ss['minimum_source_surface_map'])
check('source_sync_reference_impact_graph',ss['reference_impact_graph']['required']==['old_ref','new_ref','scan_boot_and_runtime_tree'])
check('source_sync_active_stale_ref_blocks',ss['reference_impact_graph']['active_stale_ref_result']=='BLOCKED' and ss['verdicts']['BLOCKED']=='active_current_surface_contains_stale_ref')
check('source_sync_historical_ref_allowed_with_reason',ss['reference_impact_graph']['historical_labeled_ref_result']=='ALLOWED_WITH_REASON')
check('source_sync_human_surface_sweep',len(ss['human_readable_surface_sweep'])==3)
check('source_sync_BFL_readback_fields',set(ss['BFL_readback_fields'])=={'files_added_or_modified','indirectly_affected_files','old_refs_remaining','allowed_historical_refs','active_stale_refs_remaining','verdict'})
check('manual_replace_mode_correct',ss['apply_modes']['manual_replace_mode']['activation_actor']=='Human' and ss['apply_modes']['manual_replace_mode']['forbidden_extra_activation_step'] is True)
check('agent_apply_mode_gated',ss['apply_modes']['agent_apply_mode']['requires_explicit_Human_permission'] is True and ss['apply_modes']['agent_apply_mode']['applied_claim_requires_execution_and_readback'] is True)
check('source_pair_version_bump_required',ss['version_bump_rule']['source_content_change_requires_new_pair_version'] is True and ss['version_bump_rule']['reuse_old_version_for_changed_content'] is False)
check('source_sync_fail_stops_present',set(ss['fail_stops'])>={'BLOCKED_SOURCE_CONTENT_CHANGE_WITHOUT_SOURCE_PAIR_VERSION_BUMP','BLOCKED_SOURCE_VERSION_COLLISION_RISK','BLOCKED_MANIFEST_VERSION_DRIFT','BLOCKED_SOURCE_APPLY_OVERCLAIM','BLOCKED_PROJECT_LOCAL_SOURCE_PARITY_UNPROVEN'})
check('one_lineage_two_representations',pm['logical_source']['rule']=='one_content_lineage_two_environment_representations' and pm['logical_source']['must_not_drift'] is True)
check('Project_ZIP_required',pm['Project_surface']['runtime_ZIP_required'] is True and pm['Project_surface']['unzip_before_source_analysis'] is True)
check('Local_direct_source_allowed',pm['Local_surface']['runtime_ZIP_required'] is False and pm['Local_surface']['direct_read_patch_test_allowed'] is True)
check('parity_compare_set_complete',set(pm['parity_guard']['compare'])=={'logical_source_version','required_path_inventory','per_file_SHA256','manifest_current_refs','authority_current_refs'})
check('private_DB_outside_runtime_ZIP',pm['DB_boundary']['live_private_DB_inside_runtime_source_ZIP'] is False)
check('task_classifier_bounded_role_loads',tc['selection_rule']=='classify_before_load_and_choose_smallest_valid_role_lane_and_source_set' and len(tc['task_modes'])==7)
check('task_classifier_no_blind_full_ZIP',tc['blind_full_runtime_ZIP_load'] is False)
check('legacy_slot_names_not_public_authority',tc['legacy_slot_names_authoritative'] is False and not any('09_LOCKED_MODULE_SHELLS' in json.dumps(v) for v in tc['task_modes'].values()))
check('P1_private_boundary_preserved',tc['task_modes']['P1_task']['privacy']=='private_internal_only' and tc['task_modes']['P1_task']['public_export_requires']=='anonymization_and_Human_gate')
claims=[io['claim_boundary'],ss['claim_boundary'],pm['claim_boundary'],tc['claim_boundary'],u3['claim_boundary']]; check('all_claim_boundaries_false',all(set(c)==set(CLAIM_KEYS) and all(v is False for v in c.values()) for c in claims))
check('PG_U03_ledger_record_present',u3.get('name')=='routing_and_io_public_core' and u3.get('migration_order')==4)
check('PG_U03_dependencies_exact',u3.get('dependency_unit_ids')==['PG-U00','PG-U01','PG-U02'])
check('PG_U03_commit_gate_consumed',u3.get('human_gate',{}).get('state')=='repository_commit_gate_consumed_canon_gate_pending' and u3.get('repository_binding',{}).get('mode')=='exact_commit' and u3.get('repository_binding',{}).get('commit_sha')=='34f7caa61c9aa8afe8723170bb50982ab406e2f3')
u2=units['PG-U02']; evid={e['evidence_id']:e for e in load('data/source-ledger/evidence-reference-registry.json')['evidence']}
check('PG_U02_post_commit_residual_resolved',u2['human_gate']['state']=='repository_commit_gate_consumed_canon_gate_pending' and evid['PGU02-E03']['state']=='COMMIT_GATE_CONSUMED' and evid['PGU02-E04']['state']=='PASS_POST_PUSH')
check('PG_U02_exact_commit_bound',u2['repository_binding']['commit_sha']=='d1e293703cbb5e504327228dff3aa32a8f71807c' and u2['repository_binding']['mode']=='exact_commit')
sreg=load('data/source-ledger/source-reference-registry.json'); rmap={r['source_ref_id']:r for r in sreg['references']}
check('PG_U03_source_refs_registered',all(k in rmap and rmap[k]['sha256']==v for k,v in EXPECTED_HASHES.items()) and sreg['active_source_pair']['version']=='v0.6.2.17')
check('PG_U03_evidence_refs_registered',all(k in evid for k in ['PGU03-E01','PGU03-E02','PGU03-E03']))
comp=load('data/source-ledger/compatibility-registry.json'); cr={r['record_id']:r for r in comp['records']}
check('compatibility_records_no_authority',all(cr[k]['authority_effect']=='none' and cr[k]['can_promote_canon'] is False for k in ['PGU03-COMPAT-IO-v0_1_3','PGU03-COMPAT-TASK-CLASSIFIER-LEGACY-SLOTS']))
man=load('data/routing-io/pg-u03-checksum-manifest.json'); mm={f['path']:f['sha256'] for f in man['files']}; actual={p:hashlib.sha256(cbytes(p)).hexdigest() for p in mm}
check('PG_U03_checksum_manifest_matches',set(mm)==set(OWNED_PATHS) and mm==actual and man['self_included'] is False)
all_files=[p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.parts]
check('private_and_generated_artifacts_absent',not any(p.endswith(('.db','.sqlite','.zip','SHA256SUMS.txt','VALIDATION_OUTPUT.txt')) or p.startswith(('peer_evidence/','dist/','build/')) for p in all_files))
outs=[]
for unit,count in [('pg_u00',35),('pg_u01',40),('pg_u02',50)]:
 pr=subprocess.run([sys.executable,'-S',str(ROOT/f'tests/validate_{unit}.py')],cwd=ROOT,text=True,capture_output=True); outs.append(pr.returncode==0 and f'SUMMARY\tPASS={count}\tFAIL=0' in pr.stdout)
check('prior_unit_regressions_pass',all(outs),str(outs))
syntax=ast.parse(Path(__file__).read_text(encoding='utf-8')); imports=set()
for node in ast.walk(syntax):
 if isinstance(node,ast.Import): imports.update(a.name.split('.')[0] for a in node.names)
 elif isinstance(node,ast.ImportFrom) and node.module: imports.add(node.module.split('.')[0])
matrix=load('tests/PG_U03_TEST_MATRIX.json'); check('test_matrix_and_stdlib_validator_match',matrix['tests']==EXPECTED_TESTS and imports<={'ast','hashlib','json','pathlib','re','subprocess','sys'},str(sorted(imports)))
failed=[r for r in RESULTS if r[1]=='FAIL']
for n,s,d in RESULTS: print(f'{s}\t{n}\t{d}')
print(f'SUMMARY\tPASS={len(RESULTS)-len(failed)}\tFAIL={len(failed)}')
sys.exit(1 if failed else 0)
