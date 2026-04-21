import { useState } from "react";
import { ClipboardList, Bell } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STTPanel } from "./STTPanel";
import { PatientAlerts } from "./PatientAlerts";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TabType = 'orders' | 'alerts';

export function RightPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)]">
      {/* Tab Switcher Header */}
      <div className="px-3 py-3 border-b border-border-base bg-[var(--color-surface-base)]/90 backdrop-blur-md">
        <div className="flex p-1 bg-[var(--color-surface-hover)] rounded-lg">
          <button
            onClick={() => setActiveTab('orders')}
            className={cn("flex-1 py-2 text-body-sm font-bold rounded-md transition-all flex items-center justify-center gap-1.5 text-[#ff60a7]", activeTab === 'orders'
    ? "bg-white text-[var(--color-brand-primary)] shadow-sm"
    : "text-content-muted hover:text-content-secondary")}
          >
            <ClipboardList className="w-4 h-4" />
            의사 오더
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={cn(
              "flex-1 py-2 text-body-sm font-bold rounded-md transition-all flex items-center justify-center gap-1.5",
              activeTab === 'alerts'
                ? "bg-white text-[var(--color-brand-primary)] shadow-sm"
                : "text-content-muted hover:text-content-secondary"
            )}
          >
            <Bell className="w-4 h-4" />
            환자 알림
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'orders' ? <STTPanel /> : <PatientAlerts />}
      </div>
    </div>
  );
}
