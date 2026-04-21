import { ChevronDown, Search, User, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import logoImg from "../../../imports/logo_ic.png";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extended High-Density Mock Data
const MOCK_WARDS = [
  {
    id: "71",
    name: "71병동 (내과)",
    rooms: [
      {
        id: "7101",
        name: "7101호",
        capacity: 6,
        patients: [
          {
            id: "p1",
            name: "김가민",
            age: 25,
            gender: "F",
            birthday: "1999.05.20",
            status: "normal",
            unconfirmedCount: 2,
          },
          {
            id: "p2",
            name: "이영희",
            age: 72,
            gender: "F",
            birthday: "1954.11.12",
            status: "warning",
            unconfirmedCount: 0,
          },
          {
            id: "p2b",
            name: "이영희",
            age: 65,
            gender: "F",
            birthday: "1961.03.05",
            status: "normal",
            unconfirmedCount: 1,
          },
          {
            id: "p3",
            name: "박민수",
            age: 45,
            gender: "M",
            birthday: "1981.07.24",
            status: "danger",
            unconfirmedCount: 5,
          },
          {
            id: "p4",
            name: "최지윤",
            age: 38,
            gender: "F",
            birthday: "1988.12.30",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p5",
            name: "정다은",
            age: 55,
            gender: "F",
            birthday: "1971.01.15",
            status: "normal",
            unconfirmedCount: 1,
          },
          {
            id: "p6",
            name: "송지훈",
            age: 62,
            gender: "M",
            birthday: "1964.08.09",
            status: "normal",
            unconfirmedCount: 0,
          },
        ],
      },
      {
        id: "7102",
        name: "7102호",
        capacity: 6,
        patients: [
          {
            id: "p7",
            name: "한상우",
            age: 50,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p8",
            name: "김미경",
            age: 41,
            gender: "F",
            status: "normal",
            unconfirmedCount: 3,
          },
          {
            id: "p9",
            name: "오현주",
            age: 59,
            gender: "F",
            status: "warning",
            unconfirmedCount: 0,
          },
          {
            id: "p10",
            name: "강태영",
            age: 77,
            gender: "M",
            status: "danger",
            unconfirmedCount: 0,
          },
          {
            id: "p11",
            name: "윤서연",
            age: 34,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p12",
            name: "임도환",
            age: 68,
            gender: "M",
            status: "normal",
            unconfirmedCount: 2,
          },
        ],
      },
      {
        id: "7103",
        name: "7103호",
        capacity: 6,
        patients: [
          {
            id: "p13",
            name: "신수진",
            age: 48,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p14",
            name: "배동진",
            age: 56,
            gender: "M",
            status: "warning",
            unconfirmedCount: 0,
          },
          {
            id: "p15",
            name: "백지현",
            age: 39,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p16",
            name: "안재민",
            age: 71,
            gender: "M",
            status: "danger",
            unconfirmedCount: 4,
          },
          {
            id: "p17",
            name: "곽보람",
            age: 44,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
        ],
      },
      {
        id: "7104",
        name: "7104호 (격리실)",
        capacity: 2,
        patients: [
          {
            id: "p18",
            name: "장민석",
            age: 53,
            gender: "M",
            status: "danger",
            unconfirmedCount: 1,
          },
          {
            id: "p19",
            name: "허윤진",
            age: 66,
            gender: "F",
            status: "warning",
            unconfirmedCount: 0,
          },
        ],
      },
      {
        id: "7105",
        name: "7105호",
        capacity: 6,
        patients: [
          {
            id: "p20",
            name: "문수빈",
            age: 29,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p21",
            name: "조승우",
            age: 82,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p22",
            name: "황지훈",
            age: 47,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p23",
            name: "전소영",
            age: 51,
            gender: "F",
            status: "warning",
            unconfirmedCount: 2,
          },
          {
            id: "p24",
            name: "노민주",
            age: 36,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p25",
            name: "권혁준",
            age: 64,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
        ],
      },
      {
        id: "7106",
        name: "7106호",
        capacity: 6,
        patients: [
          {
            id: "p26",
            name: "류현아",
            age: 42,
            gender: "F",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p27",
            name: "남기태",
            age: 58,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p28",
            name: "심은경",
            age: 61,
            gender: "F",
            status: "danger",
            unconfirmedCount: 3,
          },
          {
            id: "p29",
            name: "도경수",
            age: 35,
            gender: "M",
            status: "normal",
            unconfirmedCount: 0,
          },
          {
            id: "p30",
            name: "추영우",
            age: 54,
            gender: "M",
            status: "warning",
            unconfirmedCount: 0,
          },
        ],
      },
    ],
  },
  {
    id: "72",
    name: "72병동 (외과)",
    rooms: [],
  },
];

export function PatientSidebar() {
  const [activePatientId, setActivePatientId] = useState("p1");

  // Flat list of all patients to check for duplicate names
  const allPatients = MOCK_WARDS.flatMap(ward => ward.rooms.flatMap(room => room.patients));
  const duplicateNames = allPatients.reduce((acc: {[key: string]: number}, p) => {
    acc[p.name] = (acc[p.name] || 0) + 1;
    return acc;
  }, {});

  // Calculate total patients
  const totalPatients = allPatients.length;

  return (
    <>
      <div className="p-3 border-b border-[var(--color-border-base)] flex flex-col gap-3 bg-[var(--color-surface-base)]">
        {/* Brand/Logo Area */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center">
            <img
              src={logoImg}
              alt="해피너스 로고"
              className="h-[20px] object-contain ml-1"
            />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-content-secondary)] bg-[var(--color-surface-hover)] px-1.5 py-0.5 rounded">
            <Users className="w-3 h-3" />
            {totalPatients}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-content-muted)] z-10" />
          <Input
            type="text"
            placeholder="환자명, 병실 검색"
            className="pl-8 bg-[var(--color-surface-card)] border-[var(--color-border-subtle)] shadow-sm h-8 text-body-sm focus-visible:ring-1 focus-visible:ring-[var(--color-content-primary)] focus-visible:border-[var(--color-content-primary)] transition-all"
          />
        </div>

        {/* Ward Selector */}
        <button className="flex items-center justify-between w-full px-2 py-1.5 bg-transparent border border-[var(--color-border-subtle)] rounded-md text-sm font-bold text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors">
          71병동 (내과)
          <ChevronDown className="w-3.5 h-3.5 text-[var(--color-content-muted)]" />
        </button>
      </div>

      {/* Tree View (High Density) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[var(--color-surface-base)] relative">
        {MOCK_WARDS[0].rooms.map((room) => (
          <div key={room.id} className="mb-0">
            {/* Sticky Room Header */}
            <div className="sticky top-0 bg-[var(--color-surface-hover)] backdrop-blur-md z-10 px-4 py-1.5 flex items-center justify-between border-b border-[var(--color-border-subtle)] shadow-sm">
              <span className="text-[12px] font-bold text-[var(--color-sub-primary)] tracking-tight">
                {room.name}
              </span>
              <span className="text-[11px] font-mono text-[var(--color-content-muted)] font-bold">
                {(room as any).patients.length}/
                {(room as any).capacity || 6}명
              </span>
            </div>

            {/* Patient List */}
            <div className="flex flex-col">
              {room.patients.map((patient: any) => {
                const isActive = activePatientId === patient.id;
                const isDuplicate = duplicateNames[patient.name] > 1;

                return (
                  <button
                    key={patient.id}
                    onClick={() =>
                      setActivePatientId(patient.id)
                    }
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2 text-left transition-colors group relative border-b border-[var(--color-border-base)]/30 last:border-transparent",
                      isActive
                        ? "bg-[var(--color-brand-surface)]/60 border-l-[4px] border-l-[var(--color-brand-primary)]"
                        : "hover:bg-[var(--color-surface-hover)] bg-[var(--color-surface-card)] border-l-[4px] border-l-transparent",
                    )}
                  >
                    {/* Patient Info */}
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="relative inline-block shrink-0">
                          <span
                            className={cn(
                              "text-base tracking-tight truncate transition-all pr-0.5",
                              isActive
                                ? "font-bold text-[var(--color-sub-primary)]"
                                : "font-semibold text-[var(--color-content-secondary)]",
                            )}
                            title={isDuplicate ? "동명이인 주의" : ""}
                          >
                            {patient.name}
                          </span>
                          {/* Duplicate Name Subtle Indicator - Top Right of Name */}
                          {isDuplicate && (
                            <div className="absolute top-0 -right-1 size-1 rounded-full bg-destructive" title="동명이인" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-[13px] font-mono shrink-0",
                            isActive
                              ? "text-[var(--color-sub-primary)]/70 font-bold"
                              : "text-[var(--color-content-muted)]",
                          )}
                        >
                          <span>{patient.gender}</span>
                          <span>/</span>
                          <span>
                            {patient.birthday ? patient.birthday.substring(2) : "00.01.01"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unconfirmed Badge - Right Aligned */}
                    {patient.unconfirmedCount > 0 && (
                      <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[var(--color-surface-hover)] text-[var(--color-content-tertiary)] text-[10px] font-bold rounded-full border border-[var(--color-border-base)]/50 shrink-0 ml-2">
                        {patient.unconfirmedCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}