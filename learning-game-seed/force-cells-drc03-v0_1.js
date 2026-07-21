window.DIAMOND_FORCE_CELLS = Object.freeze([
  {
    "forceCellId": "FC_DRC03_FORCE_CELL_SCHEMA",
    "runtimeUnitId": "force_cell_schema",
    "semRu": "SEM-RU-01",
    "title": "Khung cấu trúc Force Cell",
    "sourceTitle": "force cell schema",
    "summary": "Biến một ý tưởng lực thành cấu trúc có trigger, cách chạy, output và readback.",
    "whySource": "Without force cell schema, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force phrase is marked Human-only and model wants to shorten it.",
      "A future model must decide force cell schema while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: force cell schema.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore force cell schema as active DRC03 runtime logic",
      "add role-specific negative test for force cell schema",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "force cell schema",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit force cell schema PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Kiểm tra một Force Cell có đủ cấu trúc",
      "purpose": "Tránh dùng một tên gọi mạnh nhưng thiếu trigger, cách chạy và output kiểm chứng.",
      "task": "Chọn một Force Cell hoặc nguyên tắc đang dùng. Viết rõ: khi nào kích hoạt, cần kiểm tra gì, có những nhánh quyết định nào và output/readback phải trả về.",
      "bringBack": "Một bản mô tả Force Cell có trigger, run, decision branch, output và readback."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_FORCE_PHRASE_BANK",
    "runtimeUnitId": "force_phrase_bank",
    "semRu": "SEM-RU-02",
    "title": "Kho cụm từ lực",
    "sourceTitle": "force phrase bank",
    "summary": "Giữ các cụm từ có khả năng ép đúng hành vi vận hành thay vì chỉ làm đẹp câu chữ.",
    "whySource": "Without force phrase bank, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force cell name exists but trigger/run/output is absent.",
      "A future model must decide force phrase bank while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: force phrase bank.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore force phrase bank as active DRC03 runtime logic",
      "add role-specific negative test for force phrase bank",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "force phrase bank",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit force phrase bank PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Thử một cụm từ lực trong tình huống thật",
      "purpose": "Kiểm tra cụm từ có thực sự thay đổi quyết định hoặc hành vi hay chỉ nghe có vẻ mạnh.",
      "task": "Chọn một cụm từ lực đang dùng. Áp dụng nó vào một tình huống thật, ghi lại hành vi trước và sau, rồi xác định có cần giữ, sửa hoặc loại bỏ.",
      "bringBack": "Một cụm từ lực đã được thử cùng kết quả và đề xuất giữ/sửa/bỏ."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_HUMAN_LOCKED_FORCE_PHRASES",
    "runtimeUnitId": "Human_locked_force_phrases",
    "semRu": "SEM-RU-03",
    "title": "Cụm từ lực do Human khóa",
    "sourceTitle": "Human locked force phrases",
    "summary": "Bảo toàn câu chữ mà Human đã khóa, không tự làm mềm hoặc rút gọn làm mất lực.",
    "whySource": "Without Human locked force phrases, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "Model routing force cell is needed without activating a route.",
      "A future model must decide Human locked force phrases while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: Human locked force phrases.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore Human locked force phrases as active DRC03 runtime logic",
      "add role-specific negative test for Human locked force phrases",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "Human locked force phrases",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit Human locked force phrases PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Bảo toàn một câu Human đã khóa",
      "purpose": "Kiểm tra khả năng giữ nguyên ý nghĩa và lực của câu chữ qua một lượt xử lý.",
      "task": "Chọn một câu Human đã khóa. Dùng nó trong một prompt hoặc phản hồi thật, sau đó so sánh đầu ra với câu gốc để phát hiện chỗ bị làm mềm, đổi nghĩa hoặc mất ranh giới.",
      "bringBack": "Một readback chỉ ra phần được giữ nguyên, phần bị lệch và bản repair nếu có."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_TRIGGER_RUN_OUTPUT_READBACK_MECHANICS",
    "runtimeUnitId": "trigger_run_output_readback_mechanics",
    "semRu": "SEM-RU-04",
    "title": "Trigger → Run → Output → Readback",
    "sourceTitle": "trigger run output readback mechanics",
    "summary": "Biến một nguyên tắc thành vòng vận hành có điểm kích hoạt và bằng chứng đầu ra.",
    "whySource": "Without trigger run output readback mechanics, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force phrase is marked Human-only and model wants to shorten it.",
      "A future model must decide trigger run output readback mechanics while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: trigger run output readback mechanics.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore trigger run output readback mechanics as active DRC03 runtime logic",
      "add role-specific negative test for trigger run output readback mechanics",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "trigger run output readback mechanics",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit trigger run output readback mechanics PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Chạy một vòng Trigger → Run → Output → Readback",
      "purpose": "Chứng minh một nguyên tắc có thể vận hành thành vòng kín, không dừng ở mô tả.",
      "task": "Chọn một việc đang làm. Viết trigger mở việc, bước run, output cần có và readback dùng để xác nhận. Sau đó chạy một vòng thật.",
      "bringBack": "Một vòng kín đã chạy cùng output và readback xác nhận."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_MODEL_ROUTING_FORCE_CELLS",
    "runtimeUnitId": "model_routing_force_cells",
    "semRu": "SEM-RU-05",
    "title": "Định tuyến mô hình",
    "sourceTitle": "model routing force cells",
    "summary": "Chọn đúng model hoặc công cụ theo vai trò thay vì dùng một model cho mọi việc.",
    "whySource": "Without model routing force cells, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force cell name exists but trigger/run/output is absent.",
      "A future model must decide model routing force cells while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: model routing force cells.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore model routing force cells as active DRC03 runtime logic",
      "add role-specific negative test for model routing force cells",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "model routing force cells",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit model routing force cells PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Định tuyến một việc tới đúng model",
      "purpose": "Kiểm tra liệu việc chọn model theo vai trò có làm kết quả rõ và ít lãng phí hơn.",
      "task": "Chọn một task thật. Xác định nó cần cấu trúc, wording, audit hay code; chọn model phù hợp, chạy task và ghi lại lý do định tuyến cùng kết quả.",
      "bringBack": "Một route decision, đầu ra nhận được và nhận xét route có đúng hay không."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_UNDERLANGUAGE_FORCE_CELLS",
    "runtimeUnitId": "underlanguage_force_cells",
    "semRu": "SEM-RU-06",
    "title": "Ngôn ngữ nền dễ hiểu",
    "sourceTitle": "underlanguage force cells",
    "summary": "Chuyển cấu trúc máy sang cách diễn đạt tự nhiên, dễ dùng nhưng không mất logic.",
    "whySource": "Without underlanguage force cells, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "Model routing force cell is needed without activating a route.",
      "A future model must decide underlanguage force cells while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: underlanguage force cells.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore underlanguage force cells as active DRC03 runtime logic",
      "add role-specific negative test for underlanguage force cells",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "underlanguage force cells",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit underlanguage force cells PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Chuyển một đầu ra sang ngôn ngữ nền",
      "purpose": "Làm đầu ra dễ đọc và dễ hành động mà vẫn giữ nguyên ý nghĩa vận hành.",
      "task": "Chọn một đoạn trả lời đang nặng metadata hoặc thuật ngữ. Viết lại thành ngôn ngữ Human dễ dùng, rồi kiểm tra xem boundary, quyết định và next move còn đủ không.",
      "bringBack": "Bản trước/sau và readback phần nào được giữ, phần nào bị mất."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_ANTI_AI_SMELL_FORCE_CELLS",
    "runtimeUnitId": "anti_AI_smell_force_cells",
    "semRu": "SEM-RU-07",
    "title": "Chống mùi AI",
    "sourceTitle": "anti AI smell force cells",
    "summary": "Loại bỏ câu chữ chung chung, giả tự nhiên hoặc quá công thức làm giảm độ tin cậy.",
    "whySource": "Without anti AI smell force cells, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force phrase is marked Human-only and model wants to shorten it.",
      "A future model must decide anti AI smell force cells while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: anti AI smell force cells.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore anti AI smell force cells as active DRC03 runtime logic",
      "add role-specific negative test for anti AI smell force cells",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "anti AI smell force cells",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit anti AI smell force cells PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Sửa một đoạn có mùi AI",
      "purpose": "Tạo đầu ra tự nhiên, cụ thể và đúng giọng Human hơn.",
      "task": "Chọn một đoạn văn có dấu hiệu chung chung, lặp cấu trúc hoặc tâng bốc. Gạch các dấu hiệu, sửa lại bằng dữ kiện và giọng thật, rồi so sánh.",
      "bringBack": "Bản đã sửa cùng danh sách dấu hiệu AI smell được loại bỏ."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_LOOP_PREFLIGHT_FORCE_CELLS",
    "runtimeUnitId": "loop_preflight_force_cells",
    "semRu": "SEM-RU-08",
    "title": "Kiểm tra trước vòng chạy",
    "sourceTitle": "loop preflight force cells",
    "summary": "Kiểm tra nguồn, phạm vi, gate và điểm dừng trước khi bắt đầu thực thi.",
    "whySource": "Without loop preflight force cells, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force cell name exists but trigger/run/output is absent.",
      "A future model must decide loop preflight force cells while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: loop preflight force cells.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore loop preflight force cells as active DRC03 runtime logic",
      "add role-specific negative test for loop preflight force cells",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "loop preflight force cells",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit loop preflight force cells PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Chạy preflight trước một task",
      "purpose": "Giảm lỗi do bắt đầu quá sớm khi chưa đủ nguồn hoặc chưa rõ quyền.",
      "task": "Chọn một task sắp làm. Kiểm tra nguồn cần đọc, phạm vi được phép, hành động bị cấm, proof cần trả và điểm dừng trước Human Gate.",
      "bringBack": "Một preflight checklist và quyết định RUN / BLOCKED / NEED_MORE_SOURCE."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_BLOCKED_MOVES",
    "runtimeUnitId": "blocked_moves",
    "semRu": "SEM-RU-09",
    "title": "Các bước bị chặn",
    "sourceTitle": "blocked moves",
    "summary": "Nhận diện thao tác chưa được phép hoặc chưa đủ bằng chứng trước khi thực hiện.",
    "whySource": "Without blocked moves, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "Model routing force cell is needed without activating a route.",
      "A future model must decide blocked moves while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: blocked moves.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore blocked moves as active DRC03 runtime logic",
      "add role-specific negative test for blocked moves",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "blocked moves",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit blocked moves PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Lập danh sách blocked moves cho một việc",
      "purpose": "Ngăn hệ thống tự vượt quyền hoặc làm trước khi đủ gate.",
      "task": "Chọn một task có khả năng sửa source, DB, repo hoặc publish. Liệt kê các bước được làm, các bước bị chặn và điều kiện để mở từng bước.",
      "bringBack": "Một allowed/blocked map với điều kiện mở gate."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_SOURCE_COHORT_FORCE_CONTINUITY",
    "runtimeUnitId": "source_cohort_force_continuity",
    "semRu": "SEM-RU-10",
    "title": "Tính liên tục của nhóm nguồn",
    "sourceTitle": "source cohort force continuity",
    "summary": "Giữ các file và lớp nguồn liên quan không mâu thuẫn hoặc đứt mạch khi thay đổi.",
    "whySource": "Without source cohort force continuity, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force phrase is marked Human-only and model wants to shorten it.",
      "A future model must decide source cohort force continuity while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: source cohort force continuity.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore source cohort force continuity as active DRC03 runtime logic",
      "add role-specific negative test for source cohort force continuity",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "source cohort force continuity",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit source cohort force continuity PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Kiểm tra tính liên tục của một nhóm nguồn",
      "purpose": "Phát hiện khi một thay đổi đúng ở một file nhưng làm lệch các source liên quan.",
      "task": "Chọn một thay đổi gần đây. Xác định nhóm source liên quan, đọc các anchor chính và kiểm tra tên, vai trò, boundary, version cùng route có còn thống nhất không.",
      "bringBack": "Một continuity readback gồm phần khớp, phần lệch và repair cần thiết."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_NO_TOOL_ACTIVATION_FORCE",
    "runtimeUnitId": "no_tool_activation_force",
    "semRu": "SEM-RU-11",
    "title": "Không kích hoạt công cụ khi chưa có gate",
    "sourceTitle": "no tool activation force",
    "summary": "Phân biệt phân tích hoặc mô phỏng với việc thật sự gọi tool hay thay đổi hệ.",
    "whySource": "Without no tool activation force, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "A force cell name exists but trigger/run/output is absent.",
      "A future model must decide no tool activation force while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: no tool activation force.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore no tool activation force as active DRC03 runtime logic",
      "add role-specific negative test for no tool activation force",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "no tool activation force",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit no tool activation force PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Phân biệt plan với tool activation",
      "purpose": "Tránh biến đề xuất hoặc candidate thành hành động thật khi chưa được phê duyệt.",
      "task": "Chọn một workflow có tool hoặc mutation. Tách rõ bước phân tích, candidate build, Human Gate và activation thật; dừng trước activation nếu chưa có gate.",
      "bringBack": "Một flow có ranh giới rõ và trạng thái activation true/false."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  },
  {
    "forceCellId": "FC_DRC03_NEGATIVE_FORCE_TESTS",
    "runtimeUnitId": "negative_force_tests",
    "semRu": "SEM-RU-12",
    "title": "Kiểm thử âm",
    "sourceTitle": "negative force tests",
    "summary": "Chủ động thử trường hợp sai để kiểm tra hệ có bắt được mất logic hoặc vượt boundary.",
    "whySource": "Without negative force tests, DRC03 becomes structurally deep but cannot make the actual slot decision.",
    "triggers": [
      "Model routing force cell is needed without activating a route.",
      "A future model must decide negative force tests while Human_replace/source_apply/source_clean remain blocked."
    ],
    "inspectRun": [
      "Identify the DRC03 object under decision, not just the generic package state.",
      "Compare current candidate language with original source force cluster: negative force tests.",
      "Check cross-slot dependency: DRC17 Human Wording Lock, DRC19 model route, DRC18 prompt transaction, DRC16 response shape."
    ],
    "decisionBranches": {
      "if_source_force_present_and_boundary_false": "emit PASS branch for Human review only",
      "if_force_present_but_hidden_in_lineage_only": "return FAIL_FORCE_COVERAGE_GAP and repair active unit",
      "if_user_requests_apply_or_clean": "return blocked_claims and keep no-apply boundary"
    },
    "repairPath": [
      "restore negative force tests as active DRC03 runtime logic",
      "add role-specific negative test for negative force tests",
      "rerun semantic score before review PASS"
    ],
    "outputShape": {
      "slot": "DRC03",
      "runtime_unit": "negative force tests",
      "decision": null,
      "force_cluster_used": null,
      "blocked_claims": null,
      "cross_slot_readback": null
    },
    "readbackLine": "DRC03 semantic unit negative force tests PASS: source-derived force runs with slot-specific decision logic.",
    "actionTemplate": {
      "title": "Tạo một negative test cho Force Cell",
      "purpose": "Chứng minh Force Cell không chỉ chạy khi mọi thứ thuận lợi mà còn bắt được lỗi.",
      "task": "Chọn một Force Cell. Tạo một input cố ý thiếu hoặc sai, dự đoán failure cần bắt, chạy thử và ghi lại hệ có chặn đúng hay không.",
      "bringBack": "Một negative test gồm input sai, expected failure, actual result và repair."
    },
    "source": {
      "slot": "DRC03",
      "sourceFile": "DRC_03_FORCE_CELL_LIBRARY_FORCE_UNIT_SCHEMA_260625_v0_7_46.md",
      "sourceFileSha256": "3ecba11b483e6d6b1864f52adca39ad40448e7c685e651be0fe9077a4d14f900",
      "sourceState": "semantic_force_uplift_replacement_candidate",
      "authorityStatus": "candidate_object_only_not_source_apply",
      "sourceApply": false,
      "sourceCleanClaim": false
    }
  }
]);
