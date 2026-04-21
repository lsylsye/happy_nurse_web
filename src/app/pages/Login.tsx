import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Lock, User, ChevronDown, ChevronLeft, Building2, LayoutGrid } from "lucide-react";
import logoImg from "../../imports/logo_ic.png";
import logo2Img from "../../imports/logo_2.png";
import bgImg from "../../imports/bg.png";
import { Text } from "../components/ui/text";
import { Heading } from "../components/ui/heading";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hospital, setHospital] = useState("");
  const [ward, setWard] = useState("");

  const isStep1Complete = hospital !== "" && ward !== "";

  return (
    <div className="fixed inset-0 flex w-full bg-white overflow-hidden font-sans">
      {/* Global Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="absolute inset-0 z-1 bg-white/10 backdrop-blur-[2px]" />

      {/* Content Layer */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left Panel: Brand Visuals (50%) */}
        <div className="hidden md:flex w-1/2 relative flex-col justify-center p-16 lg:p-24 overflow-hidden">
          <div className="relative z-10 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              <img src={logoImg} alt="" className="h-20 w-20 object-contain mb-6" />
              <Heading level="h1" className="text-[var(--color-sub-primary)] leading-[1.2] mb-6 text-5xl">
                간호 업무의
                <br />
                <span className="text-[var(--color-brand-primary)]">새로운 기준</span>
              </Heading>

              <Text size="lg" className="text-content-secondary leading-relaxed font-medium opacity-80 max-w-md">
                해피너스는 의료진의 더 편리하고 정확한 업무 환경을 위해 최신 기술과 사용자 중심의 설계를 결합했습니다.
              </Text>
            </motion.div>
          </div>

          <div className="absolute bottom-16 lg:bottom-20 left-16 lg:left-24 z-10">
            <p className="text-[13px] text-content-muted font-medium bg-white/40 inline-block px-3 py-1 rounded-md backdrop-blur-sm border border-white/20">
              © 2026 Happynurse. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form (50%) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white relative z-30 md:rounded-l-[60px] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] border-l border-white/20">
          <div className="absolute top-10 right-12 hidden md:block">
            <img src={logo2Img} alt="해피너스" className="h-4 object-contain opacity-50" />
          </div>

          <div className="w-full max-w-[420px] px-4">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-12">
              <div className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", step === 1 ? "bg-[var(--color-brand-primary)]" : "bg-slate-300")} />
              <div className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", step === 2 ? "bg-[var(--color-brand-primary)]" : "bg-slate-100")} />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <div>
                    <Heading level="h2" className="text-3xl font-bold text-[var(--color-sub-primary)] mb-3">
                      접속 정보 선택
                    </Heading>
                    <p className="text-content-tertiary font-medium">소속된 병원과 현재 근무 병동을 선택해 주세요.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-content-secondary ml-1">소속 병원</Label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted" />
                        <Input
                          placeholder="병원을 검색하세요"
                          value={hospital}
                          onChange={(e) => setHospital(e.target.value)}
                          className="pl-12 h-14 bg-slate-50/50 border-slate-200 focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-[var(--color-brand-primary)]/5 rounded-2xl text-base font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-content-secondary ml-1">근무 병동</Label>
                      <div className="relative">
                        <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted z-10 pointer-events-none" />
                        <Select value={ward} onValueChange={setWard}>
                          <SelectTrigger className="pl-12 h-14 bg-slate-50/50 border-slate-200 focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-primary)]/5 rounded-2xl text-base font-bold text-content-primary transition-all">
                            <SelectValue placeholder="접속할 병동을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] rounded-xl border-[var(--color-border-base)] shadow-xl">
                            <SelectItem value="71">71병동 (일반내과)</SelectItem>
                            <SelectItem value="72">72병동 (소화기내과)</SelectItem>
                            <SelectItem value="icu">ICU (중환자실)</SelectItem>
                            <SelectItem value="er">ER (응급실)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={!isStep1Complete}
                    onClick={() => setStep(2)}
                    className="w-full h-15 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] !text-white font-bold text-lg rounded-2xl shadow-xl shadow-[var(--color-brand-primary)]/20 transition-all disabled:opacity-30 flex items-center justify-center gap-2 group"
                  >
                    다음 단계
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <div>
                    <button 
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-sm font-bold text-content-muted hover:text-[var(--color-brand-primary)] mb-6 transition-colors group"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      병원/병동 다시 선택
                    </button>
                    <Heading level="h2" className="text-3xl font-bold text-[var(--color-sub-primary)] mb-3">
                      환영합니다!
                    </Heading>
                    <div className="flex items-center gap-2 text-content-tertiary font-medium">
                      <span className="text-[var(--color-brand-primary)] font-bold">{hospital}</span>
                      <span>{ward}병동으로 로그인합니다.</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-content-secondary ml-1">사원 아이디</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted" />
                        <Input
                          placeholder="아이디를 입력하세요"
                          className="pl-12 h-14 bg-slate-50/50 border-slate-200 focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-[var(--color-brand-primary)]/5 rounded-2xl text-base font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-content-secondary ml-1">비밀번호</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted" />
                        <Input
                          type="password"
                          placeholder="비밀번호를 입력하세요"
                          className="pl-12 h-14 bg-slate-50/50 border-slate-200 focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-[var(--color-brand-primary)]/5 rounded-2xl text-base font-semibold transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                      <Checkbox id="save-id" className="rounded-md border-slate-300" defaultChecked />
                      <span className="text-sm text-content-tertiary font-semibold group-hover:text-content-primary transition-colors">기록 저장</span>
                    </label>
                    <button className="text-sm text-content-muted font-bold hover:underline">비밀번호 찾기</button>
                  </div>

                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="w-full h-15 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] !text-white font-bold text-lg rounded-2xl shadow-xl shadow-[var(--color-brand-primary)]/20 transition-all flex items-center justify-center gap-2"
                  >
                    로그인 완료
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
