import { Bell } from "lucide-react";

export function PatientAlerts() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-content-muted">
        <Bell className="w-12 h-12 opacity-20" />
        <div className="text-center">
          <p className="text-body-base font-bold text-content-secondary mb-1">환자 알림</p>
          <p className="text-body-sm">알림 내용이 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}
