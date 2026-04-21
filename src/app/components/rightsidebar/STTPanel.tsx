import {
  CheckCircle2,
  Clock,
  Search,
  ClipboardList,
} from "lucide-react";
import { useState, useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data Types matched with Main EMR Table
interface DoctorOrder {
  id: string;
  category: "수액" | "지시" | "투약" | "LIS" | "영상";
  code: string;
  name: string;
  dose: string;
  frequency: string;
  unit: string;
  method: string;
  status: "active" | "completed" | "pending";
  time: string;
  remarks: string;
  patientName: string;
}

// Mock Orders matched with Main Table Data
const INITIAL_ORDERS: DoctorOrder[] = [
  {
    id: "o1",
    category: "수액",
    code: "N/S 1L",
    name: "0.9% Sodium Chloride Inj. 1000ml",
    dose: "1000",
    frequency: "1",
    unit: "bag",
    method: "IV",
    status: "active",
    time: "14:15",
    remarks: "80cc/hr 유지 및 I/O Check 시작 요망.",
    patientName: "김가민",
  },
  {
    id: "o2",
    category: "지시",
    code: "NPO",
    name: "금식 (수술 전)",
    dose: "-",
    frequency: "-",
    unit: "-",
    method: "-",
    status: "active",
    time: "14:30",
    remarks: "자정부터 금식 유지. 보호자 안내 완료.",
    patientName: "이영희",
  },
  {
    id: "o3",
    category: "투약",
    code: "APAP 500",
    name: "Acetaminophen 500mg",
    dose: "1",
    frequency: "3",
    unit: "tab",
    method: "PO",
    status: "completed",
    time: "13:00",
    remarks: "식후 30분 투여 완료.",
    patientName: "박민수",
  },
  {
    id: "o4",
    category: "영상",
    code: "CT-ABD",
    name: "Abdomen CT (with contrast)",
    dose: "-",
    frequency: "1",
    unit: "-",
    method: "-",
    status: "pending",
    time: "12:30",
    remarks: "영상의학과 연락 대기 중. 동의서 확인 요망.",
    patientName: "최지윤",
  },
];

export function STTPanel() {
  const [orders, setOrders] = useState<DoctorOrder[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const isOngoing = order.status === "active" || order.status === "pending";
      const matchesTab = activeTab === "ongoing" ? isOngoing : order.status === "completed";
      const matchesSearch =
        order.name.includes(searchQuery) ||
        order.code.includes(searchQuery) ||
        order.remarks.includes(searchQuery) ||
        order.patientName.includes(searchQuery);
      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const handleCompleteOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "completed" } : order,
      ),
    );
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-base bg-[var(--color-surface-base)]/90 backdrop-blur-md sticky top-0 z-30 flex flex-col gap-3">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-[var(--color-surface-hover)] rounded-lg">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={cn(
              "flex-1 py-1.5 text-body-sm font-bold rounded-md transition-all",
              activeTab === "ongoing"
                ? "bg-white text-[var(--color-brand-primary)] shadow-sm"
                : "text-content-muted hover:text-content-secondary",
            )}
          >
            진행중
            <span className="ml-1.5 text-[15px] opacity-80 font-mono">
              {orders.filter((o) => o.status !== "completed").length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={cn(
              "flex-1 py-1.5 text-body-sm font-bold rounded-md transition-all",
              activeTab === "completed"
                ? "bg-white text-[var(--color-brand-primary)] shadow-sm"
                : "text-content-muted hover:text-content-secondary",
            )}
          >
            완료
            <span className="ml-1.5 text-[15px] opacity-80 font-mono">
              {orders.filter((o) => o.status === "completed").length}
            </span>
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-3 py-2 bg-[var(--color-surface-base)]/80 backdrop-blur-sm border-b border-border-subtle">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted z-10" />
          <Input
            type="text"
            placeholder="처방명, 코드, 환자명 검색..."
            className="pl-8 bg-[var(--color-surface-card)] border-[var(--color-border-subtle)] shadow-sm h-8 text-body-sm focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)] focus-visible:border-[var(--color-brand-primary)] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
        {filteredOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-content-muted gap-3 py-10">
            <ClipboardList className="w-8 h-8 opacity-20" />
            <p className="text-body-base font-medium">검색된 오더가 없습니다.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className={cn(
                "group bg-surface-card rounded-xl border border-border-base flex flex-col overflow-hidden transition-all hover:border-[var(--color-brand-primary)]/30 hover:shadow-md",
                order.status === "completed" && "bg-slate-50/50 opacity-80"
              )}
            >
              {/* Card Header: Patient & Action Button */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-[var(--color-surface-hover)] border-b border-border-subtle/50">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[15px] font-bold text-content-primary tracking-tight truncate shrink-0">
                    {order.patientName || "환자미상"}
                  </span>
                  <span className={cn(
                    "text-[11.5px] font-bold px-1.5 py-0.5 rounded bg-white border border-border-subtle/50 shadow-sm shrink-0",
                    order.category === "수액" ? "text-blue-600" :
                    order.category === "지시" ? "text-slate-600" :
                    order.category === "투약" ? "text-emerald-600" :
                    "text-purple-600"
                  )}>
                    {order.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {order.status !== "completed" ? (
                    <button
                      onClick={() => handleCompleteOrder(order.id)}
                      className="px-2.5 py-1 text-[11.5px] font-bold text-content-primary bg-white border border-border-base hover:bg-[var(--color-brand-primary)] hover:text-white hover:border-[var(--color-brand-primary)] rounded-md transition-all shadow-sm active:scale-95 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      완료
                    </button>
                  ) : (
                    <div className="text-[10px] font-bold text-[var(--color-brand-primary)] bg-[var(--color-brand-surface)] px-2 py-0.5 rounded-full border border-[var(--color-brand-primary)]/10 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      수행완료
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body: Order Info */}
              <div className="p-3 flex flex-col gap-2.5">
                <div className="flex flex-col min-w-0">
                  <div className="text-[12px] font-mono font-black text-[var(--color-brand-primary)]/80 leading-none mb-1.5 uppercase tracking-wider">
                    {order.code}
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-[14.5px] font-bold text-content-primary leading-snug">
                      {order.name}
                    </h4>
                    <div className="flex items-center gap-1 text-mono font-bold text-[11px] text-content-tertiary shrink-0 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.time}
                    </div>
                  </div>
                </div>

                {/* Dose & Method Row - Enhanced Visibility */}
                {(order.dose !== "-" || order.method !== "-") && (
                  <div className="flex items-center gap-4 bg-surface-hover/40 px-2.5 py-2 rounded-lg border border-border-subtle/30">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-content-muted font-extrabold uppercase tracking-widest">Dose</span>
                      <span className="text-[13px] font-mono font-bold text-content-secondary">
                        {order.dose}{order.unit} × {order.frequency}
                      </span>
                    </div>
                    <div className="w-px h-5 bg-border-subtle/60" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-content-muted font-extrabold uppercase tracking-widest">Method</span>
                      <span className="text-[13px] font-bold text-content-secondary">
                        {order.method}
                      </span>
                    </div>
                  </div>
                )}

                {/* Remarks */}
                <p className="text-[12px] leading-relaxed text-content-tertiary italic px-1">
                  {order.remarks}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
