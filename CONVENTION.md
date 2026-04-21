# HAPPINUS EMR FRONTEND CONVENTION

이 문서는 해피너스(Happinus) EMR 웹 프로젝트의 프론트엔드 개발 가이드라인입니다. **모든 작업 전 반드시 이 문서를 숙지**하고 코드를 작성하세요.

## 1. 디자인 철학 및 기조 (Philosophy)
- **Functional Minimalism (기능적 미니멀리즘):** 불필요한 디자인 요소를 모두 배제하고 데이터, 텍스트, 선의 구조적 아름다움으로만 디자인합니다.
- **Soft High-Density (소프트 고밀도):** EMR의 특성상 많은 정보를 한 화면에 담아야 하므로, 엑셀 형태의 테이블과 촘촘한 밀도(High-Density)를 유지하되 시각적으로 답답하지 않도록 합니다.
- **배제 사항 (No "AI Feel"):** 
  - 사용자에게 실제적인 기능이나 의미를 제공하지 않고, 단순히 화면을 채우기 위해 들어가는 가짜 보안 뱃지(`Secure Terminal Active` 등), 불필요한 상태 태그, 맥락 없는 플레이스홀더를 절대 금지합니다.
  - 양산형 템플릿 느낌, 과도한 야광색(Glowing) 애니메이션, 맥락 없는 50:50 스플릿 레이아웃 금지.

## 2. 타이포그래피 (Typography)
- **기본 폰트:** `Pretendard` (프리텐다드). HTML 요소에 임의의 `font-sans` 등을 사용하여 폰트를 오버라이드하지 마세요.
- **공통 컴포넌트 사용 원칙:** 텍스트 렌더링 시 HTML `<p>`, `<span>`, `<h1>` 등을 직접 사용하지 말고, **반드시 `/src/app/components/ui/text.tsx` 및 `heading.tsx` 컴포넌트를 사용**하여 전역적인 폰트 일관성을 강제합니다.
- **고정폭 폰트(Monospace):** 숫자 데이터나 코드, ID 등 세로 열 정렬이 필요한 곳에는 반드시 `font-mono`를 함께 적용합니다.

## 3. 컬러 시스템 (Color System)
- **하드코딩 금지:** `bg-[#FF0072]`나 `text-[#34286E]`와 같이 임의의 헥스 코드를 하드코딩하지 않습니다.
- **Design Tokens 사용:** 반드시 `/src/styles/theme.css`에 정의된 CSS 변수(Variables)를 사용합니다.
  - 메인 컬러: `var(--color-brand-primary)`
  - 서브 컬러 (네이비): `var(--color-sub-primary)`
  - 주요 액션 버튼: `var(--color-action-blue)`
- `tailwind.css`에서 var을 사용할 때에는 Tailwind의 대괄호 표기법(예: `bg-[var(--color-brand-primary)]`)을 사용합니다.

## 4. 레이아웃 (Layout & Grid)
- **메인 레이아웃:** 3단 분할 레이아웃 (좌측 환자 리스트 / 중앙 간호 기록지 / 우측 대기 메모 패널).
- **픽셀 퍼펙트(Pixel Perfect):** 컴포넌트와 카드 사이의 간격, 테두리 두께(`1px`), 둥글기(`border-radius`) 등을 통일성 있게 유지합니다.

## 5. 컴포넌트 활용 및 코딩 스타일
- **UI 컴포넌트 우선 사용:** 
  - 기본 브라우저 스타일 폼 컨트롤(`input type="checkbox"`, `select`)의 사용을 엄격히 금지합니다.
  - 체크박스 및 셀렉트박스는 반드시 `/src/app/components/ui/checkbox.tsx` 와 `select.tsx` 등의 공통 컴포넌트를 사용해야 합니다.
- **아이콘(Icon) 사용 규칙 (이모지 절대 금지):** 
  - 🎉, 🚀 등 시스템 이모지는 전문성을 해치므로 어떠한 상황에서도 사용을 절대 금지합니다.
  - 모든 아이콘은 **반드시 `lucide-react` 라이브러리**를 사용하여 획 굵기(strokeWidth)와 스타일이 통일된 일관된 아이콘 셋을 유지합니다.
- **하드코딩된 사이즈 지양:** `w-[420px]` 등의 하드코딩된 폭을 남용하지 않고 유연한 레이아웃 클래스(`flex`, `w-full`, `max-w-`)를 사용합니다.

---
**✅ AI Assistant 지시사항:** 
사용자 요청을 수행하기 전 항상 이 컨벤션을 먼저 점검하고, 코드를 생성/수정할 때 이 규칙들에 위배되는 항목이 없는지 확인하세요.
