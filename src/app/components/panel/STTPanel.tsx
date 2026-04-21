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
}

// Mock Orders
const INITIAL_ORDERS: DoctorOrder[] = [
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
    id: "o3",
    patientName: "박민수",
    patientId: "PT0003",
    time: "14:45",
    content: "Chest PA 촬영 위해 이동. 산소 유지 (2L/min via Nasal cannula).",
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
    return orders.filter(order => {
      const matchesTab = order.status === activeTab;
      const matchesSearch = 
        order.patientName.includes(searchQuery) || 
        order.patientId.includes(searchQuery) || 
        order.content.includes(searchQuery);
      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const handleCompleteOrder = (id: string) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: 'completed' } : order
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-base)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-base bg-[var(--color-surface-base)]/90 backdrop-blur-md sticky top-0 z-30 flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <ClipboardList className="w-5 h-5 text-[var(--color-brand-primary)]" />
          <h2 className="text-body-base font-bold text-content-primary">의사 오더</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-[var(--color-surface-hover)] rounded-lg">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={cn(
              "flex-1 py-1.5 text-body-sm font-bold rounded-md transition-all",
              activeTab === 'ongoing' 
                ? "bg-white text-[var(--color-brand-primary)] shadow-sm" 
                : "text-content-muted hover:text-content-secondary"
            )}
          >
            진행중
            <span className="ml-1.5 text-[10px] opacity-60">
              {orders.filter(o => o.status === 'ongoing').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 py-1.5 text-body-sm font-bold rounded-md transition-all",
              activeTab === 'completed' 
                ? "bg-white text-[var(--color-brand-primary)] shadow-sm" 
                : "text-content-muted hover:text-content-secondary"
            )}
          >
            완료
            <span className="ml-1.5 text-[10px] opacity-60">
              {orders.filter(o => o.status === 'completed').length}
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
            placeholder="환자명, 오더 내용 검색..." 
            className="pl-8 bg-[var(--color-surface-card)] border-[var(--color-border-subtle)] shadow-sm h-8 text-body-sm focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)] focus-visible:border-[var(--color-brand-primary)] transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
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
                "group bg-surface-card rounded-lg border border-border-base flex flex-col overflow-hidden transition-all hover:border-[var(--color-brand-primary)]/30 hover:shadow-md",
                order.status === 'completed' && "opacity-80"
              )}
            >
              {/* Order Card Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-surface-hover)] border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-mono font-bold text-body-xs text-content-secondary">
                    <Clock className="w-3 h-3" />
                    {order.time}
                  </div>
                  <div className="w-px h-3 bg-border-subtle" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-body-sm font-bold text-content-primary">{order.patientName}</span>
                    <span className="text-[10px] font-mono font-bold text-content-muted bg-surface-base px-1.5 py-0.5 rounded border border-border-subtle">
                      {order.patientId}
                    </span>
                  </div>
                </div>

                {order.status === 'completed' && (
                  <div className="flex items-center gap-1 text-[var(--color-brand-primary)] font-bold text-[10px] bg-[var(--color-brand-surface)] px-1.5 py-0.5 rounded border border-[var(--color-brand-primary)]/20">
                    <CheckCircle2 className="w-3 h-3" />
                    완료됨
                  </div>
                )}
              </div>

              {/* Order Content */}
              <div className="p-3">
                <p className="text-body-sm leading-relaxed text-content-secondary whitespace-pre-wrap">
                  {order.content}
                </p>
                
                {order.status === 'ongoing' && (
                  <div className="mt-3 pt-3 border-t border-border-subtle/50 flex justify-end">
                    <button 
                      onClick={() => handleCompleteOrder(order.id)}
                      className="px-3 py-1.5 text-body-xs font-bold text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      완료 처리
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
