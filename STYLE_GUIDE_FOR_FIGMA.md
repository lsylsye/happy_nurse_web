# HAPPINUS EMR Design System Guide (v2.1)

해피너스 EMR의 전문적이고 세련된 SaaS UI를 위한 디자인 가이드입니다. 피그마(Figma) 작업 시 아래 토큰과 컴포넌트 규칙을 적용해 주세요.

---

## 1. Color System (Variables)

### 🎨 Brand Colors (Primary)
- **Brand Primary:** `#FF0072` (메인 포인트 컬러)
- **Brand Hover:** `#E60066` (포인터 호버 시)
- **Brand Surface:** `#FFF0F5` (연한 핑크 배경, 선택 강조)
- **Brand Text:** `#FFFFFF` (브랜드 배경 위 텍스트)

### 🌑 Sub Colors (Navy/Enterprise)
- **Sub Primary:** `#1E293B` (전문적인 네이비, 버튼 및 타이틀용)
- **Sub Alpha 10:** `rgba(30, 41, 59, 0.1)` (부드러운 레이어 구분)

### 🔵 Action Colors (Functional)
- **Action Blue:** `#3060FF` (긍정 액션, 반영 버튼)
- **Action Surface:** `#EAF0FF` (환자 정보 헤더 배경)

### ⚪ Semantic Colors (Neutral)
- **Surface Base:** `#FAFAFA` (기본 배경색 - 사이드바, STT 패널 공통)
- **Surface Card:** `#FFFFFF` (카드 및 입력창 배경)
- **Surface Hover:** `#F3F4F6` (리스트 및 버튼 호버)
- **Border Base:** `#E5E5E5` (기본 구분선)
- **Border Subtle:** `#E5E7EB` (매우 연한 구분선)
- **Destructive:** `#EF4444` (삭제, 에러 컬러)

### ⚠️ 1.1. 메인 컬러 사용 가이드 (Usage Guidelines)
메인 컬러인 **Brand Primary(#FF0072)**는 채도가 매우 높은 쨍한 색상입니다. 전문적인 의료 시스템의 가독성과 시각적 안정성을 위해 아래 규칙을 반드시 준수하세요.

1. **면적 제한:** 넓은 배경이나 큰 박스 모델에 원색 그대로를 사용하는 것을 지양합니다. 시각적 피로를 유발할 수 있습니다.
2. **포인트 강조:** 버튼, 핵심 아이콘, 알림 뱃지, 상태 표시 바(Indicator) 등 시선을 즉시 유도해야 하는 작은 요소에 한정적으로 사용합니다.
3. **틴트(Tint) 활용:** 넓은 영역에 브랜드 컬러의 느낌이 필요할 경우, 불투명도를 10~20%로 낮춘 `Brand Surface`나 연한 색조를 배경으로 활용합니다.
4. **텍스트 조절:** 가독성이 중요한 장문의 텍스트에는 사용하지 않습니다. 강조가 필요한 단축키, 수치, 혹은 핵심 레이블에만 적용합니다.

---

## 2. Typography (Text Styles)

폰트 시스템은 **rem** 단위를 기본으로 하며(16px = 1rem), **Pretendard**와 **Monospace**를 혼용합니다.

| Style Name | Size (rem) | Size (px) | Weight | Font Family | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Title LG** | **1.5rem** | 24px | Bold | Pretendard | 환자명 등 핵심 타이틀 |
| **Title MD** | **1.25rem** | 20px | Bold | Pretendard | 섹션 헤더, 메인 타이틀 |
| **Body Base** | **1rem** | 16px | Medium | Pretendard | 일반 기록 텍스트, 입력값 |
| **Data Base** | **1rem** | 16px | Bold | **Monospace** | **기록 리스트의 시간, 수치** |
| **Body SM** | **0.875rem** | 14px | Regular | Pretendard | 레이블, 본문 보조 텍스트 |
| **Body XS** | **0.8125rem** | 13px | Medium | Pretendard | 리스트 항목, 부가 정보 |
| **Data Micro** | **0.75rem** | 12px | Bold | **Monospace** | **환자번호, 시간(카드용)** |
| **Body Micro** | **0.75rem** | 12px | Bold | Pretendard | 태그, 카운트 정보 |

---

## 3. Key Components UI

### 🔍 Searchable Select (Combobox)
- **Design:** `h-9`, `Radius-md`, `Border-Base`
- **Behavior:** 클릭 시 `z-index: 100`의 팝업 생성. 내부 검색창(`Input`) 포함.
- **State:** 호버 시 `Border-Hover`, 포커스 시 `Ring-Brand-Primary/10`.

### ⏰ Time Picker
- **Trigger:** `w-72px`, `font-mono`, `text-center`.
- **Popup:** Hour(24)와 Min(60) 두 개의 스크롤 영역으로 구성된 팝업.
- **Typography:** 시/분 숫자는 반드시 고정폭(Monospace) 폰트 사용.

### ⌨️ Standard Input
- **Design:** `h-9` (일반) / `h-14` (로그인용), `Radius-md`, `bg-Surface-Card`.
- **Focus:** `Focus-visible` 시 `Border-Brand-Primary`와 `Ring` 효과 적용.

---

## 4. Special Layout Patterns

### 🏥 Login Page (Enterprise Look)
- **Layout:** 50:50 Split-screen.
- **Divider:** 좌측 패널 우측면에 부드러운 유기적 곡선(SVG Curve) 적용.
- **Visuals:** 메인 컬러 기반의 3D 블러 그라데이션 + 플로팅 마스코트 캐릭터.
- **Shadows:** 고중량 카드에 `shadow-[0_40px_50px_rgba(255,0,114,0.2)]` 적용.

### 📋 EMR Dashboard
- **Sidebar Background:** 사이드바와 대기 메모 패널은 모두 `Surface-Base(#FAFAFA)`로 통일.
- **Gap:** 패널 간 간격 및 내부 패딩은 `6px` 또는 `12px` 단위로 정렬.
- **Patient Info Section:** 색감을 강화한 `Action-Blue-Surface/50` 배경 사용.

---

## 5. Assets
- **Logo:** `image-3.png` (Horizontal type)
- **Mascot:** `mascot.png` (3D Illustration)
