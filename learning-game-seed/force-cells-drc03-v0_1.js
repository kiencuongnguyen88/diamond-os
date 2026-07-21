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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Khung cấu trúc Force Cell”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một cụm từ lực đã được đánh dấu chỉ Human được quyền giữ hoặc sửa, nhưng model muốn rút gọn nó.",
          "Một model tương lai phải đánh giá “Khung cấu trúc Force Cell” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: force cell schema.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Khung cấu trúc Force Cell” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Khung cấu trúc Force Cell”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Khung cấu trúc Force Cell” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Kho cụm từ lực”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một Force Cell đã có tên nhưng còn thiếu trigger, cách chạy hoặc output.",
          "Một model tương lai phải đánh giá “Kho cụm từ lực” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: force phrase bank.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Kho cụm từ lực” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Kho cụm từ lực”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Kho cụm từ lực” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Cụm từ lực do Human khóa”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Cần dùng Force Cell định tuyến model để đánh giá, nhưng chưa được kích hoạt route thật.",
          "Một model tương lai phải đánh giá “Cụm từ lực do Human khóa” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: Human locked force phrases.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Cụm từ lực do Human khóa” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Cụm từ lực do Human khóa”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Cụm từ lực do Human khóa” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Trigger → Run → Output → Readback”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một cụm từ lực đã được đánh dấu chỉ Human được quyền giữ hoặc sửa, nhưng model muốn rút gọn nó.",
          "Một model tương lai phải đánh giá “Trigger → Run → Output → Readback” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: trigger run output readback mechanics.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Trigger → Run → Output → Readback” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Trigger → Run → Output → Readback”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Trigger → Run → Output → Readback” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Định tuyến mô hình”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một Force Cell đã có tên nhưng còn thiếu trigger, cách chạy hoặc output.",
          "Một model tương lai phải đánh giá “Định tuyến mô hình” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: model routing force cells.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Định tuyến mô hình” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Định tuyến mô hình”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Định tuyến mô hình” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Ngôn ngữ nền dễ hiểu”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Cần dùng Force Cell định tuyến model để đánh giá, nhưng chưa được kích hoạt route thật.",
          "Một model tương lai phải đánh giá “Ngôn ngữ nền dễ hiểu” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: underlanguage force cells.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Ngôn ngữ nền dễ hiểu” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Ngôn ngữ nền dễ hiểu”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Ngôn ngữ nền dễ hiểu” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Chống mùi AI”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một cụm từ lực đã được đánh dấu chỉ Human được quyền giữ hoặc sửa, nhưng model muốn rút gọn nó.",
          "Một model tương lai phải đánh giá “Chống mùi AI” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: anti AI smell force cells.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Chống mùi AI” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Chống mùi AI”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Chống mùi AI” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Kiểm tra trước vòng chạy”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một Force Cell đã có tên nhưng còn thiếu trigger, cách chạy hoặc output.",
          "Một model tương lai phải đánh giá “Kiểm tra trước vòng chạy” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: loop preflight force cells.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Kiểm tra trước vòng chạy” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Kiểm tra trước vòng chạy”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Kiểm tra trước vòng chạy” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Các bước bị chặn”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Cần dùng Force Cell định tuyến model để đánh giá, nhưng chưa được kích hoạt route thật.",
          "Một model tương lai phải đánh giá “Các bước bị chặn” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: blocked moves.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Các bước bị chặn” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Các bước bị chặn”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Các bước bị chặn” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Tính liên tục của nhóm nguồn”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một cụm từ lực đã được đánh dấu chỉ Human được quyền giữ hoặc sửa, nhưng model muốn rút gọn nó.",
          "Một model tương lai phải đánh giá “Tính liên tục của nhóm nguồn” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: source cohort force continuity.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Tính liên tục của nhóm nguồn” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Tính liên tục của nhóm nguồn”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Tính liên tục của nhóm nguồn” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Không kích hoạt công cụ khi chưa có gate”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Một Force Cell đã có tên nhưng còn thiếu trigger, cách chạy hoặc output.",
          "Một model tương lai phải đánh giá “Không kích hoạt công cụ khi chưa có gate” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: no tool activation force.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Không kích hoạt công cụ khi chưa có gate” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Không kích hoạt công cụ khi chưa có gate”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Không kích hoạt công cụ khi chưa có gate” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
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
    },
    "display": {
      "vi": {
        "whySource": "Nếu thiếu “Kiểm thử âm”, DRC03 có thể trông sâu về cấu trúc nhưng vẫn không đưa ra được quyết định thực sự cho đúng slot.",
        "triggers": [
          "Cần dùng Force Cell định tuyến model để đánh giá, nhưng chưa được kích hoạt route thật.",
          "Một model tương lai phải đánh giá “Kiểm thử âm” trong khi các quyền Human_replace, source_apply và source_clean vẫn bị khóa."
        ],
        "inspectRun": [
          "Xác định đúng object DRC03 đang được xem xét, không chỉ nhìn trạng thái chung của cả gói.",
          "Đối chiếu ngôn ngữ candidate hiện tại với cụm lực nguồn gốc: negative force tests.",
          "Kiểm tra phụ thuộc chéo giữa các slot: DRC17 khóa câu chữ của Human, DRC19 định tuyến model, DRC18 giao dịch prompt và DRC16 cấu trúc phản hồi."
        ],
        "decisionBranches": {
          "if_source_force_present_and_boundary_false": "Chỉ trả nhánh PASS để Human xem xét; không tự áp dụng.",
          "if_force_present_but_hidden_in_lineage_only": "Trả FAIL_FORCE_COVERAGE_GAP và sửa unit đang hoạt động.",
          "if_user_requests_apply_or_clean": "Trả danh sách claim bị chặn và giữ nguyên ranh giới không áp dụng."
        },
        "repairPath": [
          "Khôi phục “Kiểm thử âm” thành logic runtime đang hoạt động của DRC03.",
          "Bổ sung negative test theo đúng vai trò cho “Kiểm thử âm”.",
          "Chạy lại semantic score trước khi đề xuất PASS để review."
        ],
        "readbackLine": "DRC03 semantic unit “Kiểm thử âm” PASS: Force Cell có nguồn đã chạy bằng logic quyết định riêng của slot."
      }
    }
  }
]);
