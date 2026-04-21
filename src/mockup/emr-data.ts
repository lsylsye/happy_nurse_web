// EMR 관련 목업 데이터

export const NURSES = [
  "김영희",
  "이수진",
  "박민지",
  "최지원",
  "김의사",
];

export const HOURS = [
  "전체 시간",
  ...Array.from({ length: 24 }).map(
    (_, i) => `${i.toString().padStart(2, "0")}시`,
  ),
];

export const INITIAL_RECORDS = [
  {
    id: 1,
    time: "09:30",
    category: "활력징후",
    content:
      "BP 130/80, HR 82, BT 37.1, RR 20. 환자 특이 호소사항 없음.",
    status: "completed",
    writer: "김영희",
    isConfirmed: true,
  },
  {
    id: 2,
    time: "10:15",
    category: "투약",
    content:
      "아세트아미노펜 500mg (PO) 투여함. 투여 목적 및 부작용(위장장애 등)에 대해 설명함.",
    status: "completed",
    writer: "김영희",
    isConfirmed: true,
  },
  {
    id: 3,
    time: "11:00",
    category: "처치",
    content:
      "Foley catheter insertion 시행함. 16Fr 사용하였으며 맑은 소변 300cc 배액됨. 삽입 부위 발적이나 부종 관찰되지 않음. 환자에게 도뇨관 유지 목적과 주의사항(당기지 않기, 소변백 높이 유지 등) 교육함.",
    status: "completed",
    writer: "박민지",
    isConfirmed: true,
  },
  {
    id: 4,
    time: "11:45",
    category: "간호기록",
    content:
      "환자 분이 지속적인 우하복부 통증을 호소함.\nNRS 7점으로 측정되며, 식은땀을 흘리고 얼굴이 창백한 상태임.\nV/S 측정 결과 BP 140/90, HR 102, BT 37.5도로 확인됨.\n주치의 김의사에게 유선으로 노티하였으며, 지시에 따라 진통제(Tridol 1amp IV) 투여 및 복부 CT 촬영을 위해 휠체어로 영상의학과 이동 예정임.\n통증 양상은 찌르는 듯한 통증이며 방사통은 없다고 함. 보호자에게 현재 상황 및 향후 계획 설명하고 안심시킴. 진통제 투여 후 30분 뒤 통증 재평가 계획임.",
    status: "urgent",
    writer: "김영희",
    isConfirmed: true,
  },
  {
    id: 5,
    time: "12:30",
    category: "식사",
    content: "일반식 1/2 섭취. 오심이나 구토 증상 없음.",
    status: "completed",
    writer: "최지원",
    isConfirmed: true,
  },
  {
    id: 6,
    time: "13:00",
    category: "활력징후",
    content:
      "BP 125/75, HR 78, BT 36.8. 통증 재평가 결과 NRS 2점으로 감소함. 환자 편안하게 수면 취하는 모습 관찰됨.",
    status: "completed",
    writer: "김영희",
    isConfirmed: true,
  },
  {
    id: 7,
    time: "14:20",
    category: "의사기록",
    content:
      "복부 CT 결과상 급성 충수염(Acute Appendicitis) 소견 관찰됨.\n보호자 및 환자에게 수술 필요성 설명하고 수술 동의서 징구함.\nNPO 유지 지시함. 수액 요법(N/S 1L 80cc/hr) 시작함.",
    status: "pending",
    writer: "김의사",
    isConfirmed: false,
  },
  {
    id: 8,
    time: "15:30",
    category: "활력징후",
    content:
      "BP 132/85, HR 88, BT 37.2. 수액 N/S 1L 80cc/hr 유지 중이며 잔량 600cc 확인됨. 주입 부위 발적이나 부종 없음.",
    status: "completed",
    writer: "이수진",
    isConfirmed: true,
  },
  {
    id: 9,
    time: "16:45",
    category: "처치",
    content:
      "복부 통증 부위 얼음찜질(Ice bag) 적용함. 환자에게 냉요법의 목적과 주의사항 설명함. 통증 양상 변화 관찰 중.",
    status: "completed",
    writer: "박민지",
    isConfirmed: true,
  },
  {
    id: 10,
    time: "18:00",
    category: "투약",
    content:
      "저녁 식전 약(위장운동조절제) PO 투여함. 환자 식사 전 NPO 유지 여부 재확인함.",
    status: "completed",
    writer: "이수진",
    isConfirmed: true,
  },
  {
    id: 11,
    time: "19:30",
    category: "간호기록",
    content: "저녁 식사 제공 시 환자 섭취 거부함. 담당의 보고.",
    status: "completed",
    writer: "문현지",
    isConfirmed: true,
  },
  {
    id: 12,
    time: "20:30",
    category: "활력징후",
    content:
      "BP 128/82, HR 84, BT 37.0. 환자 안정을 취하고 있으며 통증은 NRS 3점 정도로 조절되고 있음.",
    status: "completed",
    writer: "최지원",
    isConfirmed: true,
  },
  {
    id: 13,
    time: "21:45",
    category: "처치",
    content:
      "수술 전 처치(항생제 반응 검사, 수술 부위 제모 등) 완료함. 수술 전 준비 리스트 체크 완료.",
    status: "completed",
    writer: "이수진",
    isConfirmed: true,
  },
  {
    id: 14,
    time: "23:00",
    category: "간호기록",
    content:
      "야간 라운딩 결과 환자 수면 중임. 수액 주입 원활하며 특이 소견 없음.",
    status: "completed",
    writer: "박민지",
    isConfirmed: true,
  },
];

export const INITIAL_ORDERS = [
  {
    id: 1,
    category: "수액",
    code: "N/S 1L",
    name: "0.9% Sodium Chloride Inj. 1000ml",
    dose: "1000",
    frequency: "1",
    unit: "bag",
    method: "IV",
    status: "active",
    remarks: "80cc/hr 유지",
  },
  {
    id: 2,
    category: "지시",
    code: "NPO",
    name: "금식 (수술 전)",
    dose: "-",
    frequency: "-",
    unit: "-",
    method: "-",
    status: "active",
    remarks: "자정부터 금식 유지",
  },
  {
    id: 3,
    category: "투약",
    code: "APAP 500",
    name: "Acetaminophen 500mg",
    dose: "1",
    frequency: "3",
    unit: "tab",
    method: "PO",
    status: "completed",
    remarks: "식후 30분",
  },
  {
    id: 4,
    category: "LIS",
    code: "CBC",
    name: "Complete Blood Count",
    dose: "-",
    frequency: "1",
    unit: "-",
    method: "-",
    status: "completed",
    remarks: "오전 6시 채혈",
  },
  {
    id: 5,
    category: "영상",
    code: "CT-ABD",
    name: "Abdomen CT (with contrast)",
    dose: "-",
    frequency: "1",
    unit: "-",
    method: "-",
    status: "pending",
    remarks: "동의서 확인 요망",
  },
];

export const DEFAULT_PATIENT_INFO = {
  name: "김가민",
  genderAge: "F/25",
  id: "PT0001",
  room: "7101호",
  department: "소화기내과",
  doctor: "김의사",
  date: "2026.04.10 (D+4)",
  insurance: "건강보험 (국민)",
  cc: "우하복부 통증 (RLQ pain), 오심",
  memo: "낙상 고위험군 (보행 시 주의 요망), 보호자 상주 중",
  birthday: "1999.05.20",
  address:
    "서울특별시 강남구 테헤란로 123 해피아파트 101동 202호",
};