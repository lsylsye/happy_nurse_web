import { Bell, RefreshCw, ArrowRight, Info } from "lucide-react";
import { cn } from "../ui/utils";

// Mock Data for Order Changes
const ORDER_CHANGES = [
  {
    id: "c1",
    patientName: "박민수",
    time: "15:30",
    type: "dosage_change",
    title: "약물 용량 변경",
    oldContent: "타이레놀 500mg (PO) QD",
    newContent: "타이레놀 1000mg (PO) BID",
    isUrgent: true,
  },
  {
    id: "c2",
    patientName: "이영희",
    time: "14:20",
    type: "schedule_change",
    title: "검사 일정 변경",
    oldContent: "Chest PA (16:00)",
    newContent: "Chest PA (내일 09:00)",
    isUrgent: false,
  }
];

export function PatientAlerts() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)]">
      {/* 1. Normal Alerts Section (Top) - Super Slim */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-2 py-1.5 border-b border-border-base bg-[var(--color-surface-base)]/90 backdrop-blur-sm sticky top-0 z-10 flex items-center gap-1.5">
          <Bell className="w-3 h-3 text-[var(--color-content-secondary)]" />
          <h2 className="text-[11px] font-bold text-content-primary">일반 알림</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {/* Placeholder for other alerts */}
          <div className="flex flex-col items-center justify-center py-6 text-content-muted gap-2 opacity-30">
            <Info className="w-6 h-6" />
            <p className="text-[10px] font-medium">새 알림 없음</p>
          </div>
        </div>
      </div>

      {/* 2. Order Changes Section — Option B: 강조 diff pill */}
      <div className="shrink-0 border-t-2 border-[var(--color-brand-primary)]/20 bg-[var(--color-surface-card)] shadow-lg max-h-[50%] flex flex-col">
        <div className="px-3 py-2 bg-[var(--color-brand-surface)]/40 border-b border-[var(--color-border-base)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
            <h2 className="text-[13px] font-bold text-[var(--color-content-primary)]">오더 변경</h2>
          </div>
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] bg-[var(--color-brand-surface)] px-2 py-0.5 rounded-full">
            {ORDER_CHANGES.length}건
          </span>
        </div>

        <div className="overflow-y-auto p-2 flex flex-col gap-2">
          {ORDER_CHANGES.map((change) => (
            <div
              key={change.id}
              className={cn(
                "bg-[var(--color-surface-card)] rounded-lg border p-2.5 transition-all",
                change.isUrgent
                  ? "border-[var(--color-destructive)]/30"
                  : "border-[var(--color-border-base)]"
              )}
            >
              {/* 1행: 환자 · 변경 유형 · 긴급 · 시간 */}
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[12px] font-bold text-[var(--color-content-primary)] truncate">
                    {change.patientName}
                  </span>
                  <span className="text-[11px] text-[var(--color-content-muted)]">·</span>
                  <span className="text-[11px] font-medium text-[var(--color-content-tertiary)] truncate">
                    {change.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {change.isUrgent && (
                    <span className="text-[10px] font-bold text-[var(--color-destructive)] bg-[var(--color-destructive)]/10 px-1.5 py-0.5 rounded-md">
                      긴급
                    </span>
                  )}
                  <span className="text-[11px] text-[var(--color-content-muted)] font-mono">{change.time}</span>
                </div>
              </div>

              {/* 2행: old → new pills */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] text-[var(--color-content-muted)] line-through bg-[var(--color-surface-base)] px-2 py-0.5 rounded truncate min-w-0">
                  {change.oldContent}
                </span>
                <ArrowRight className="w-3 h-3 text-[var(--color-content-muted)] shrink-0" />
                <span className="text-[11px] font-bold text-[var(--color-brand-primary)] bg-[var(--color-brand-surface)] px-2 py-0.5 rounded truncate min-w-0">
                  {change.newContent}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="mx-2 mb-2 py-2 bg-[var(--color-brand-primary)] text-white text-[12px] font-bold rounded-md shadow-sm hover:bg-[var(--color-brand-hover)] transition-colors">
          모두 반영
        </button>
      </div>
    </div>
  );
}
