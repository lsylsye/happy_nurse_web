# 해피너스 WEB — 디자인 시스템 컨벤션

이 문서는 해피너스 EMR 웹의 디자인 토큰과 컴포넌트 사용 규칙을 정의합니다. 새 화면/기능을 만들 때 이 문서에 정의된 토큰·컴포넌트를 우선 사용해 시각적 통일성을 유지합니다.

- **토큰 정의**: [src/styles/theme.css](src/styles/theme.css)
- **공통 컴포넌트**: [src/app/components/ui/](src/app/components/ui/)
- **도메인 공통 컴포넌트**: [src/app/components/layout/](src/app/components/layout/), [src/app/components/grid/](src/app/components/grid/), 등

---

## 1. 절대 지키는 원칙

1. **하드코딩 금지.** 색은 `#15289F` 같은 리터럴이 아니라 반드시 `var(--color-brand-primary)` 토큰을 사용합니다.
2. **Tailwind 유틸리티 우선**, 커스텀 CSS 최소화. 토큰은 Tailwind arbitrary value (`bg-[var(--color-brand-primary)]`) 형태로 쓰세요.
3. **폰트는 Pretendard**. 한글 텍스트에 `font-mono`를 쓰지 않습니다 (숫자/코드만 mono).
4. **공통 컴포넌트 우선.** 새 화면이 버튼·입력·팝오버·다이얼로그 등을 필요로 하면 먼저 `src/app/components/ui/` 아래에서 찾아 사용합니다. 없으면 기존 컴포넌트를 확장하거나 같은 위치에 새로 만들고 이 문서에 추가합니다.
5. **인라인 색/그라디언트 정의 금지.** 새 색이 필요하면 먼저 `theme.css`에 토큰을 추가한 뒤 참조합니다.

---

## 2. 컬러 토큰

모든 컬러는 `theme.css`의 `@theme inline` 블록에 정의돼 있습니다. 사용 시에는 `var(--color-xxx)` 형태로 참조하거나 Tailwind arbitrary value로 적용합니다.

### 2.1 브랜드 (EMR Brand)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-brand-primary` | `#15289F` | 주요 액션, 강조, 상태 "진행" |
| `--color-brand-hover` | `#101E7A` | brand-primary hover 상태 |
| `--color-brand-surface` | `#E7E9F5` | brand-primary 위에 깔리는 연한 배경 |
| `--color-brand-text` | `#FFFFFF` | brand-primary 위의 텍스트 |

### 2.2 보조 (Sub, 네이비 계열)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-sub-primary` | `#1E293B` | 제목, 강조 텍스트 |
| `--color-sub-alpha-100 ~ -10` | 투명도 단계 | 보더/배경에 은은히 쓸 때 |

### 2.3 액션 (Action, 블루)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-action-blue` | `#3060FF` | 보조 액션 (예: 외부 링크, 정보 강조) |
| `--color-action-blue-hover` | `#264CCC` | hover |
| `--color-action-blue-surface` | `#EAF0FF` | 환자 정보 헤더 배경 같은 영역 색 |

### 2.4 시맨틱 (Semantic)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-surface-base` | `#FAFAFA` | 페이지 기본 배경 |
| `--color-surface-card` | `#FFFFFF` | 카드 배경 |
| `--color-surface-hover` | `#F3F4F6` | 셀/행 hover |
| `--color-border-base` | `#E5E5E5` | 기본 보더 |
| `--color-border-subtle` | `#E5E7EB` | 내부 분할 보더 |
| `--color-border-hover` | `#D1D5DB` | hover 시 보더 |
| `--color-content-primary` | `#111111` | 본문 (가장 진한 텍스트) |
| `--color-content-secondary` | `#374151` | 보조 본문 |
| `--color-content-tertiary` | `#4B5563` | 보조 2 |
| `--color-content-quaternary` | `#6B7280` | 보조 3 |
| `--color-content-muted` | `#9CA3AF` | 비활성/placeholder |

### 2.5 상태 색

| 상태 | 텍스트 색 | 용도 |
|---|---|---|
| 접수 | `text-slate-500` | 의사 오더 "접수" |
| 진행 | `text-[var(--color-brand-primary)]` | 의사 오더 "진행" |
| 검사중 | `text-amber-600` | 의사 오더 "검사중" |
| 완료 | `text-emerald-600` | 의사 오더 "완료" |
| destructive | `var(--color-destructive)` = `#C00000` | 삭제, 경고 |

> 상태 표시는 **뱃지(박스)가 아닌 평문 텍스트 + 컬러**로 통일합니다. 테두리·배경 박스를 두르지 않습니다.

---

## 3. 타이포그래피

### 3.1 폰트

- **본문/한글**: `Pretendard` (Tailwind `font-sans`, 기본값)
- **숫자/코드/시간**: `font-mono` — 숫자·처방 코드·시각(`14:30`) 등 "숫자로 읽어야 의미가 있는" 값에만 사용
- 한글이 섞인 값에 `font-mono` 사용 금지 (예: "2회"는 기본 폰트)

### 3.2 크기 토큰

`theme.css`에서 Tailwind 친화적으로 정의된 커스텀 크기가 있지만, `tailwind-merge`와의 호환 이슈를 피하려면 **숫자 리터럴(`text-[14px]`) 또는 Tailwind 표준(`text-sm`, `text-base`)을 우선 사용**합니다. 아래 매핑을 참고:

| 용도 | 권장 클래스 | 픽셀 |
|---|---|---|
| 큰 제목 (환자 이름 등) | `text-[24px]` 또는 `text-title-lg` | 24 |
| 섹션 제목 | `text-[20px]` 또는 `text-title-md` | 20 |
| 본문 기본 | `text-base` | 16 |
| 본문 작게 (표/카드 내용) | `text-sm` 또는 `text-[14px]` | 14 |
| 캡션/라벨 | `text-[13px]` / `text-[12px]` | 13/12 |
| 마이크로 (상태·메타) | `text-[11px]` / `text-[10px]` | 11/10 |

### 3.3 굵기

- `font-black` (900): 큰 강조 (제목, 탭 라벨)
- `font-bold` (700): 보더 라벨, 강조 텍스트, 버튼
- `font-semibold` (600): 값 (숫자, 상태 텍스트)
- `font-medium` (500): 기본 인풋 텍스트
- `font-normal` (400): 부가 텍스트

한글이 많은 구간에서는 `font-black`을 남용하지 않습니다 — 본문은 `font-bold` 또는 `font-semibold`가 기본.

---

## 4. 레이아웃 토큰

### 4.1 둥글기

| 클래스 | px | 용도 |
|---|---|---|
| `rounded-sm` | 2 | 매우 작은 보더 |
| `rounded` | 4 | 작은 버튼, 뱃지 |
| `rounded-md` | 6 | 인풋/버튼/셀렉트 (**기본**) |
| `rounded-lg` | 8 | 카드 |
| `rounded-xl` | 12 | 팝오버, 다이얼로그 |
| `rounded-2xl` | 16 | 강조 카드, 알림 다이얼로그 |

### 4.2 그림자

- `shadow-xs`: 인풋 안에 포커스되는 요소
- `shadow-sm`: 기본 카드/버튼
- `shadow-md`: 떠 있는 컨트롤 (토글, 플로팅)
- `shadow-xl` / `shadow-2xl`: 팝오버, 다이얼로그 등 모달 계열

### 4.3 간격

- 기본 gap: `gap-2` (8px) 또는 `gap-1.5` (6px)
- 섹션 간격: `gap-4` (16px) 또는 `gap-6` (24px)
- 카드 내부 패딩: `p-3` (12px) 또는 `p-4` (16px)

---

## 5. 공통 컴포넌트 사용 규칙

### 5.1 Button — `src/app/components/ui/button.tsx`

기본 시그니처: `<Button variant={...} size={...}>텍스트</Button>`.

**variant**
- `default`: shadcn 기본 (near-black) — 일반적인 UI에 비브랜드 액션일 때만
- `brand`: 브랜드 컬러 **필드 버튼** — 가장 중요한 CTA (예: 확정, 저장)
- `brandOutline`: 브랜드 컬러 **아웃라인 버튼** — 보조 액션 (예: 수정, 취소)
- `destructive`: 위험한 액션 (삭제)
- `outline` / `secondary` / `ghost` / `link`: shadcn 기본 variant

**size**
- `default` (h-9): 헤더 액션 버튼
- `sm` (h-8): 행 내부 버튼
- `lg` (h-10): 기본보다 큰 메인 CTA
- `icon`: 정사각형 아이콘 전용

**사용 예시**
```tsx
{/* 헤더의 저장 (brand) + 취소 (brandOutline) 페어 */}
<Button variant="brand" size="default">저장</Button>
<Button variant="brandOutline" size="default">취소</Button>

{/* 테이블 행의 수정/확정 페어 */}
<Button variant="brandOutline" size="sm" className="h-7 px-2.5 rounded text-[12px]">수정</Button>
<Button variant="brand" size="sm" className="h-7 px-2.5 rounded text-[12px]">확정</Button>
```

**금지**: shadow-2xl처럼 과도한 그림자를 기본 버튼에 주지 않습니다. `rounded-md` 이상으로 둥글기를 과장하지 않습니다.

### 5.2 Input — `src/app/components/ui/input.tsx`

검색 입력 스펙 (STTPanel, PatientAlerts 동일):

```tsx
<div className="relative group px-1">
  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-[var(--color-brand-primary)] transition-colors z-10" />
  <Input
    placeholder="xxx 검색..."
    className="pl-9 bg-[var(--color-surface-base)] border-border-base h-10 text-[13px] focus-visible:ring-1 focus-visible:ring-[var(--color-brand-primary)] rounded-md"
  />
</div>
```

### 5.3 Popover — `src/app/components/ui/popover.tsx`

- 모달보다 가볍게 뜨는 UI (예: 시간 선택, 빠른 수정)
- 기본 스타일: `bg-white`, `border border-border-base`, `shadow-xl`, `rounded-lg`
- `z-[120]` 이상으로 올려 다른 오버레이 위에 뜨게
- 팝오버 내부 클릭이 상위 행/셀 이벤트와 충돌하면 PopoverContent에 `data-quick-edit-popover=""` 같은 구분자를 달고 상위 `onClick`에서 `closest()`로 무시

### 5.4 DashboardLayout — `src/app/components/layout/DashboardLayout.tsx`

3분할(좌 사이드바 / 메인 / 우 사이드바) 표준 레이아웃. 좌·우는 접기/펼치기 토글 지원.

- 좌 사이드바: `w-[240px]` (환자 리스트)
- 우 사이드바: `w-[280px]` (의사 오더 / 환자 알림)
- 접힌 상태 토글 버튼: 화면 가장자리 수직 중앙 (`top-1/2`)에 "탭" 모양 붙음 — 환자 정보 헤더를 가리지 않음

---

## 6. 도메인 UI 규칙

### 6.1 EMR 간호 기록 (EMRGrid)

**확정 전 행**: 왼쪽에 4px 수직 바 표시
```tsx
"before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-[var(--color-brand-primary)]/30"
```

**편집 규칙**
- 기본 상태: 본인 미확정 행은 `수정` + `확정` 버튼 항상 노출, 본인 확정 행은 `수정`만
- 헤더의 `편집` 버튼 클릭 시 세션 진입 → 본인 행의 `수정` 자리가 `삭제`로 바뀜 (편집 세션 = 삭제 전용 배치 모드)
- `수정` → draft 상태로 인라인 편집 → `완료` 눌러야 `records`에 커밋 (바깥 클릭으로는 저장 안 됨)
- `확정` → draft가 있으면 같이 커밋 + `isConfirmed: true`

**NFC 약물 행** (source === "nfc")
- 줄글이 아닌 구조화된 key-value 표시: `[code] [name] · 1회 투여량 x · 횟수 x · 용법 x`
- 편집 시 모든 필드가 박스형 input으로 전환 (`bg-white border rounded px-1.5 py-0.5`)

### 6.2 처방 코드 체계

원내 코드: **2-letter prefix + 4자리 숫자** (총 6자리)

| Prefix | 종류 |
|---|---|
| `MD` | 경구/투약 (Medication) |
| `IV` | 주사/수액 (Injection) |
| `LB` | 검체검사 (Laboratory) |
| `RD` | 영상검사 (Radiology) |
| `OR` | 일반지시 (Order) |

예: `MD0500` (Acetaminophen 500mg), `LB2501` (CBC), `RD0449` (복부 CT)

처방 코드는 항상 `font-mono font-bold text-[var(--color-brand-primary)]`로 표시해 다른 본문과 시각적으로 분리합니다.

### 6.3 의사 오더 진행 상태

4단계 한글 상태: `접수` → `진행` → `검사중` → `완료`
- 뱃지(박스) 형태 금지, **평문 텍스트 + 컬러**로만 표시
- 상태별 색상은 §2.5 참고

### 6.4 변경된 오더 뱃지

`isChanged === true`인 의사 오더는 처방 코드와 같은 줄(`justify-between`)에 `변경` 뱃지 노출:
```tsx
<span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[var(--color-brand-primary)] text-white leading-none">
  변경
</span>
```

---

## 7. 아이콘 — `lucide-react`

- 모든 아이콘은 `lucide-react`에서 가져옵니다.
- 기본 크기: `w-4 h-4` (16px). 작은 용도는 `w-3.5 h-3.5` (14px), 더 작으면 `size-3` (12px).
- 아이콘 옆에 텍스트가 붙는 경우 `gap-1.5` 또는 `gap-2`.
- 아이콘 컬러는 주변 텍스트 컬러를 상속받거나(`text-inherit`), 강조 시 `text-[var(--color-brand-primary)]`.

---

## 8. Mock 데이터 위치

- **간호 기록**, **환자 정보**, **의사 오더** 공통: [src/mockup/emr-data.ts](src/mockup/emr-data.ts)
- 새 화면에서 mock이 필요하면 컴포넌트 안에 박지 않고 이 파일이나 `src/mockup/` 아래 새 파일에 분리합니다.

---

## 9. 파일/폴더 구조

```
src/
├── app/
│   ├── components/
│   │   ├── ui/           ← 공통 프리미티브 (Button, Input, Popover, ...)
│   │   ├── layout/       ← DashboardLayout 같은 페이지 셸
│   │   ├── grid/         ← EMR 그리드 (간호 기록 영역)
│   │   ├── rightsidebar/ ← 우측 패널 (의사 오더, 환자 알림)
│   │   ├── sidebar/      ← 좌측 사이드바 (환자 리스트)
│   │   └── panel/        ← 기타 패널 계열
│   ├── pages/            ← 라우트 페이지
│   ├── App.tsx / App-3.tsx
│   └── routes.tsx
├── mockup/               ← Mock 데이터 전용
├── styles/               ← theme.css, index.css, fonts.css, tailwind.css
├── imports/              ← 이미지/정적 리소스
└── main.tsx
```

---

## 10. PR 전 체크리스트

- [ ] 색상을 `#xxx` 리터럴로 직접 넣지 않았다 (토큰 사용)
- [ ] 새 컴포넌트가 `ui/`에 이미 있는 것을 중복 구현하지 않는다
- [ ] 버튼은 공통 `<Button>` + `variant`를 사용 (인라인 클래스로 버튼 재구현 금지)
- [ ] 한글이 섞인 곳에 `font-mono`가 없다
- [ ] 상태 표시가 뱃지 박스가 아닌 평문 컬러 텍스트다 (§6.3)
- [ ] Mock 데이터가 컴포넌트 내부에 박혀 있지 않다
- [ ] 토큰·컴포넌트·패턴을 새로 추가했으면 이 문서에도 반영했다
