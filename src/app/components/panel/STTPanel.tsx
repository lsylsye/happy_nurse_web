import { CheckCircle2, Clock, User, ClipboardList, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data Types
interface DoctorOrder {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  content: string;
  status: 'ongoing' | 'completed';
  isChanged?: boolean;
}

// Mock Orders
const INITIAL_ORDERS: DoctorOrder[] = [
  {
    id: "o0",
    patientName: "박민수",
    patientId: "PT0003",
    time: "15:30",
    content: "타이레놀 1000mg (PO) BID로 증량 변경됨. (기존 500mg QD)",
    status: 'ongoing',
    isChanged: true,
  },
  {
    id: "o1",
    patientName: "김철수",
    patientId: "PT0001",
    time: "14:15",
    content: "타이레놀 500mg (PO) 투여. 30분 뒤 통증 재평가 요망.",
    status: 'ongoing',
  },
  {
    id: "o2",
    patientName: "이영희",
    patientId: "PT0002",
    time: "14:30",
    content: "N/S 1L (IV) 80cc/hr 시작. I/O Check 시작 요망.",
    status: 'ongoing',
  },
  {
    id: "o4",
    patientName: "최지윤",
    patientId: "PT0004",
    time: "13:00",
    content: "금식(NPO) 해제. 연식부터 식사 시작.",
    status: 'completed',
  },
  {
    id: "o5",
    patientName: "정다은",
    patientId: "PT0005",
    time: "12:30",
    content: "수술 부위 드레싱 시행 및 삼출물 확인.",
    status: 'completed',
  }
];

export function STTPanel() {
  const [orders, setOrders] = useState<DoctorOrder[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    let result = orders.filter(order => {
      const matchesTab = order.status === activeTab;
      const matchesSearch = 
        order.patientName.includes(searchQuery) || 
        order.patientId.includes(searchQuery) || 
        order.content.includes(searchQuery);
      return matchesTab && matchesSearch;
    });

    // Sort: Changed orders always at top
    return [...result].sort((a, b) => (b.isChanged ? 1 : 0) - (a.isChanged ? 1 : 0));
  }, [orders, activeTab, searchQuery]);

  const handleCompleteOrder = (id: string) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: 'completed' } : order
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)]">
      {/* Ultra Slim Combined Header - Search & Tabs in one row */}
      <div className="px-2 py-1.5 border-b border-border-base bg-[var(--color-surface-base)]/90 backdrop-blur-md sticky top-0 z-30 flex items-center gap-2">
        {/* Compact Search */}
        <div className="relative flex-1 group">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-content-muted z-10" />
          <Input 
            type="text" 
            placeholder="오더 검색..." 
            className="pl-7 bg-[var(--color-surface-card)] border-[var(--color-border-subtle)] h-7 text-[10px] focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)]"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mini Segmented Tab */}
        <div className="flex bg-[var(--color-surface-hover)] p-0.5 rounded border border-border-subtle shrink-0">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold rounded-sm transition-all",
              activeTab === 'ongoing' ? "bg-white text-[var(--color-brand-primary)] shadow-xs" : "text-content-muted"
            )}
          >
            {orders.filter(o => o.status === 'ongoing').length}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold rounded-sm transition-all",
              activeTab === 'completed' ? "bg-white text-[var(--color-brand-primary)] shadow-xs" : "text-content-muted"
            )}
          >
            {orders.filter(o => o.status === 'completed').length}
          </button>
        </div>
      </div>

      {/* High Density Order List */}
      <div className="flex-1 overflow-y-auto p-1.5 flex flex-col gap-1">
        {filteredOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-content-muted gap-2 py-10 opacity-30">
            <ClipboardList className="w-6 h-6" />
            <p className="text-[10px] font-bold">오더 없음</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className={cn(
                "bg-surface-card rounded border p-1.5 transition-all",
                order.isChanged ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-surface)]/40 shadow-sm" : "border-border-base",
                order.status === 'completed' && "opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[11px] font-black text-content-primary truncate">{order.patientName}</span>
                  {order.isChanged && (
                    <span className="shrink-0 bg-[var(--color-brand-primary)] text-white text-[8px] font-bold px-1 py-0.5 rounded-sm animate-pulse">
                      변경됨
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-mono font-bold text-content-muted shrink-0">{order.time}</span>
              </div>
              <p className="text-[11px] leading-[1.3] text-content-secondary line-clamp-3">
                {order.content}
              </p>
              
              {order.status === 'ongoing' && (
                <div className="mt-1.5 flex justify-end">
                  <button 
                    onClick={() => handleCompleteOrder(order.id)}
                    className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-[var(--color-brand-primary)] rounded hover:bg-[var(--color-brand-hover)] transition-colors"
                  >
                    완료
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
