import { useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Share2, 
  Search,
  ChevronRight,
  ClipboardCheck,
  History,
  FileText,
  Users,
  AlertCircle,
  Sparkles,
  Lightbulb,
  PlusCircle,
  Stethoscope,
  UserSearch,
  Clock
} from "lucide-react";
import { useState } from "react";
import { Heading } from "../components/ui/heading";
import { Text } from "../components/ui/text";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { cn } from "../components/ui/utils";

// Professional Mock Data with Patient IDs and Log Entries
const MOCK_NURSES = [
  { 
    id: "n1", 
    name: "김영희", 
    role: "Day Charge (71 Ward)", 
    patients: [
      {
        id: "p1",
        patientNo: "20260420-001",
        name: "김가민",
        birthDate: "1999.05.12",
        bedNo: "7101-02",
        mainSymptom: "RUQ pain, Nausea/Vomiting",
        warningLogs: [
          { time: "10:20", content: "RUQ pain 심화(NRS 7점) 호소하며 식은땀 관찰됨. 응급 초음파 pull-up 요청함." },
          { time: "14:15", content: "초음파 결과 Acute Appendicitis 확정. 금일 19:00 OP 결정되어 NPO 유지 및 수술 전 처치 리스트 확인 완료." },
          { time: "15:40", content: "WBC 14.5k, CRP 12.4로 상승 소견 보임. Dr.최 보고 완료 및 항생제 증량 처방 확인." }
        ],
        aiSuggestions: [
          { time: "08:30", content: "최근 3일간 I/O Negative 지속됨. 금일 아침 배뇨량 50cc로 감소 추세임." },
          { time: "13:00", content: "보호자, 수술 대기 시간 및 절차 관련하여 반복적 불만 토로함." }
        ],
        priority: "high"
      },
      {
        id: "p2",
        patientNo: "20260420-002",
        name: "이영희",
        birthDate: "1954.11.23",
        bedNo: "7102-01",
        mainSymptom: "Shortness of breath, Cough",
        warningLogs: [
          { time: "09:00", content: "Dyspnea 증상 완화되지 않아 O2 NC 2L로 증량 적용함. SaO2 96% 유지 중." },
          { time: "11:30", content: "보호자 면회 시 장소 지남력 저하되며 일시적 섬망 증세 관찰됨. 보호자에게 주의사항 교육함." },
          { time: "16:10", content: "Lasix 20mg IV 투여 후 4시간 U/O 450cc 확인. 전해질 불균형 모니터링 요망." }
        ],
        aiSuggestions: [
          { time: "22:00", content: "취침 전 수면 장애 호소하며 주변 소음에 예민한 반응 보임. 섬망 악화 가능성 있음." }
        ],
        priority: "medium"
      }
    ] 
  },
  { id: "n2", name: "이수진", role: "Evening Staff", patients: [] },
];

export function Handover() {
  const navigate = useNavigate();
  const [selectedNurse, setSelectedNurse] = useState<typeof MOCK_NURSES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [patientSearchQuery, setPatientSearchQuery] = useState("");

  const filteredNurses = MOCK_NURSES.filter(n => 
    n.name.includes(searchQuery) || n.role.includes(searchQuery)
  );

  const filteredPatients = selectedNurse?.patients.filter(p => 
    p.name.includes(patientSearchQuery) || p.patientNo.includes(patientSearchQuery)
  ) || [];

  return (
    <div className="fixed inset-0 bg-[var(--color-surface-base)] flex flex-col font-sans overflow-hidden">
      {/* 1. Header */}
      <header className="h-14 bg-[var(--color-surface-card)] border-b border-[var(--color-border-base)] flex items-center justify-between px-4 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="p-1.5 hover:bg-[var(--color-surface-hover)] rounded-md transition-colors text-[var(--color-content-muted)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[var(--color-brand-primary)]" />
            <Heading level="h2" className="text-lg font-bold text-[var(--color-sub-primary)]">종합 인수인계 보드</Heading>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="font-bold border-[var(--color-border-base)]">
            <FileText className="w-4 h-4 mr-2" />
            리포트 출력
          </Button>
          <Button size="sm" className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-bold shadow-sm">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            인수인계 확정
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden min-h-0">
        {/* 2. Sidebar */}
        <aside className="w-[280px] bg-[var(--color-surface-card)] border-r border-[var(--color-border-base)] flex flex-col shrink-0 z-20 min-h-0">
          <div className="p-3 border-b border-[var(--color-border-base)] bg-[var(--color-surface-base)]/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-[var(--color-content-muted)]" />
              <Input 
                placeholder="간호사 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 bg-[var(--color-surface-card)] border-[var(--color-border-base)] rounded-md text-sm"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {filteredNurses.map((nurse) => (
                <button
                  key={nurse.id}
                  onClick={() => setSelectedNurse(nurse)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-[var(--color-border-base)]/30",
                    selectedNurse?.id === nurse.id 
                      ? "bg-[var(--color-brand-surface)] border-l-[4px] border-l-[var(--color-brand-primary)]" 
                      : "hover:bg-[var(--color-surface-hover)] border-l-[4px] border-l-transparent"
                  )}
                >
                  <div className={cn(
                    "size-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                    selectedNurse?.id === nurse.id ? "bg-[var(--color-brand-primary)] text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-content-tertiary)]"
                  )}>
                    {nurse.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Text className="font-bold text-[var(--color-content-primary)] truncate">{nurse.name} 간호사</Text>
                    <Text size="xs" className="text-[var(--color-content-muted)] font-medium truncate uppercase">{nurse.role}</Text>
                  </div>
                  {selectedNurse?.id === nurse.id && <ChevronRight className="size-4 text-[var(--color-brand-primary)]" />}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* 3. Main Board Content */}
        <div className="flex-1 min-h-0 flex flex-col relative bg-[var(--color-surface-base)]">
          {!selectedNurse ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-4">
              <div className="size-16 rounded-full bg-[var(--color-surface-card)] flex items-center justify-center text-[var(--color-content-muted)] border border-[var(--color-border-base)] shadow-sm">
                <Users className="size-8 opacity-40" />
              </div>
              <div>
                <Heading level="h3" className="text-lg font-bold text-[var(--color-content-tertiary)]">인수인계 대상 간호사를 선택하세요</Heading>
                <Text className="text-[var(--color-content-muted)] mt-1">간호사별 환자 리포트가 표시됩니다.</Text>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header Info Bar & Patient Search */}
              <div className="px-6 py-4 bg-[var(--color-surface-card)] border-b border-[var(--color-border-base)] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[var(--color-content-muted)] uppercase tracking-widest">담당 간호사</span>
                    <Heading level="h4" className="text-base font-bold text-[var(--color-content-primary)]">{selectedNurse.name}</Heading>
                  </div>
                  <div className="w-px h-6 bg-[var(--color-border-base)]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[var(--color-content-muted)] uppercase tracking-widest">배정 환자</span>
                    <Heading level="h4" className="text-base font-bold text-[var(--color-content-primary)]">{selectedNurse.patients.length}명</Heading>
                  </div>
                </div>

                <div className="relative w-[360px]">
                  <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-content-muted)]" />
                  <Input 
                    placeholder="환자 성함 또는 환자 번호 검색..."
                    value={patientSearchQuery}
                    onChange={(e) => setPatientSearchQuery(e.target.value)}
                    className="pl-9 h-11 bg-[var(--color-surface-base)] border-[var(--color-border-base)] rounded-lg text-base focus-visible:ring-[var(--color-brand-primary)]/10 focus-visible:border-[var(--color-brand-primary)] transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                <ScrollArea className="h-full">
                  <div className="p-6 max-w-[1500px] mx-auto space-y-8">
                    {filteredPatients.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                        <Search className="size-12 mb-4" />
                        <Text size="lg">검색 조건과 일치하는 환자가 없습니다.</Text>
                      </div>
                    ) : (
                      filteredPatients.map((p) => (
                        <div 
                          key={p.id}
                          className="bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border-base)] shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg"
                        >
                          {/* Patient Header */}
                          <div className="px-8 py-4 bg-[var(--color-surface-base)]/50 border-b border-[var(--color-border-base)] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded border border-[var(--color-border-base)] text-[var(--color-sub-primary)] shadow-sm">ID: {p.patientNo}</span>
                                <Heading level="h3" className="text-2xl font-bold text-[var(--color-content-primary)]">{p.name}</Heading>
                                <Text variant="muted" weight="bold" size="base" className="font-mono bg-white px-2.5 py-1 rounded-md border border-[var(--color-border-base)]/50">{p.birthDate}</Text>
                              </div>
                              <div className="w-px h-5 bg-[var(--color-border-base)]" />
                              <div className="flex items-center gap-2.5">
                                <Stethoscope className="size-5 text-[var(--color-content-muted)]" />
                                <Text size="base" variant="muted">주증상: <span className="font-semibold text-[var(--color-content-secondary)]">{p.mainSymptom}</span></Text>
                              </div>
                            </div>
                          </div>

                          {/* [CORE 2 SECTION GRID] */}
                          <div className="flex divide-x divide-[var(--color-border-base)]/50 bg-white min-h-[260px]">
                            {/* 1. Nurse Warning Logs (LEFT) */}
                            <div className="flex-1 p-8 bg-amber-50/5 space-y-6">
                              <div className="flex items-center gap-2 text-[var(--color-sub-primary)]">
                                <AlertCircle className="size-5" />
                                <Heading level="h4" className="text-lg font-bold uppercase tracking-tight">주요 주의 기록</Heading>
                              </div>
                              
                              <div className="space-y-6">
                                {p.warningLogs.map((log, idx) => (
                                  <div key={idx} className="flex gap-6 group">
                                    <div className="flex flex-col items-center shrink-0 pt-1.5">
                                      <div className="size-2.5 rounded-full bg-[var(--color-sub-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:scale-125 transition-all" />
                                      <div className="w-px flex-1 bg-[var(--color-border-base)] my-1.5 last:hidden" />
                                    </div>
                                    <div className="flex-1 space-y-2 pb-4 border-b border-[var(--color-border-base)]/30 last:border-none">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono font-bold text-[var(--color-sub-primary)]">{log.time}</span>
                                      </div>
                                      <Text size="lg" weight="medium" className="text-[var(--color-content-primary)] leading-relaxed">
                                        {log.content}
                                      </Text>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 2. AI Suggestions (RIGHT) */}
                            <div className="w-[480px] p-8 bg-[var(--color-surface-base)] space-y-6">
                              <div className="flex items-center gap-2 text-[var(--color-content-tertiary)]">
                                <Sparkles className="size-5" />
                                <Heading level="h4" className="text-lg font-bold uppercase tracking-tight font-sans">AI 제안</Heading>
                              </div>
                              
                              <div className="space-y-6">
                                {p.aiSuggestions.map((ai, idx) => (
                                  <div key={idx} className="flex gap-4 group relative">
                                    <div className="flex flex-col items-center shrink-0 pt-1.5">
                                      <div className="size-2.5 rounded-full bg-[var(--color-content-muted)] group-hover:bg-[var(--color-brand-primary)] group-hover:scale-125 transition-all" />
                                      <div className="w-px flex-1 bg-[var(--color-border-base)] my-1.5 last:hidden" />
                                    </div>
                                    <div className="flex-1 space-y-2 pb-4 border-b border-[var(--color-border-base)]/30 last:border-none">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-mono font-bold text-[var(--color-sub-primary)]">{ai.time}</span>
                                      </div>
                                      <Text size="base" weight="medium" className="text-[var(--color-content-primary)] leading-relaxed">
                                        {ai.content}
                                      </Text>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
