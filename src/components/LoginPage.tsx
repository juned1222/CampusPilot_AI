/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Smartphone, 
  Mail, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; phone?: string; avatar: string }) => void;
  defaultEmail?: string;
}

export default function LoginPage({ onLoginSuccess, defaultEmail = 'junedshekhkhan@gmail.com' }: LoginPageProps) {
  const [authMethod, setAuthMethod] = useState<'none' | 'google' | 'phone'>('none');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successState, setSuccessState] = useState(false);
  
  // Custom timer for OTP
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Suggested custom user name auto-generator based on email
  const autoSuggestedName = React.useMemo(() => {
    if (defaultEmail.includes('juned')) return 'Juned Khan';
    return 'Engineering Scholar';
  }, [defaultEmail]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Handle Google Login Flow
  const handleGoogleLogin = () => {
    setErrorMessage('');
    setIsSubmitting(true);
    
    // Smooth high-fidelity Google simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessState(true);
      
      setTimeout(() => {
        onLoginSuccess({
          name: autoSuggestedName,
          email: defaultEmail,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', // Beautiful portrait
        });
      }, 1200);
    }, 1500);
  };

  // Handle Request OTP
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Simple phone verification (10 digits)
    const rawPhone = phoneNumber.replace(/\D/g, '');
    if (rawPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      // Auto-focus first input box
      setTimeout(() => {
        const firstInput = document.getElementById('otp-cell-0');
        if (firstInput) firstInput.focus();
      }, 100);
    }, 1200);
  };

  // Handle OTP digit entry
  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return; // only allow numbers
    
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1); // take only last digit
    setOtpCode(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-cell-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-cell-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otpCode];
        newOtp[index - 1] = '';
        setOtpCode(newOtp);
      }
    }
  };

  // Handle Phone Verification Submission
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const code = otpCode.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter the full 6-digit security code.');
      return;
    }

    setIsSubmitting(true);
    
    // High premium verified sequence simulation
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Let any 6-digit code pass for convenient testing, with a custom feedback hint
      setSuccessState(true);
      setTimeout(() => {
        onLoginSuccess({
          name: autoSuggestedName,
          email: `${phoneNumber}@rgpv.campus.in`,
          phone: `+91 ${phoneNumber}`,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' // Stylish user avatar
        });
      }, 1200);
    }, 1500);
  };

  const resendOtp = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setOtpCode(['', '', '', '', '', '']);
    setErrorMessage('New OTP security code transmitted successfully.');
    setTimeout(() => setErrorMessage(''), 3000);
  };

  return (
    <div id="login-container" className="fixed inset-0 h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 z-50 overflow-hidden select-none">
      
      {/* Background Tech Mesh Visuals */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/8 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="w-full max-w-5xl bg-slate-900/60 border border-slate-800 rounded-3xl shadow-xl shadow-indigo-950/20 grid grid-cols-1 md:grid-cols-12 overflow-hidden backdrop-blur-2xl">
        
        {/* Left Grid: Features and Branding Showcase */}
        <div className="hidden md:flex md:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 p-10 flex-col justify-between border-r border-slate-800 relative overflow-hidden">
          {/* Accent lighting for left panel */}
          <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-650 text-white shadow-lg shadow-indigo-900/50">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-sans text-lg font-black tracking-tight text-white block">CampusPilot <span className="text-indigo-400">AI</span></span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Academic Intelligence Hub</span>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-black text-white leading-tight font-sans tracking-tight">
                Secure engineering maximum marks under constrained time.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tuned specifically for RGPV guidelines and grading schemas. Access peer lectures, verified answers, formula catalogs, and viva score predictions.
              </p>
            </div>
          </div>

          {/* Interactive Feature List Cards */}
          <div className="space-y-3.5 my-8 relative z-10">
            <div className="flex items-start gap-3 p-3 bg-slate-950/40 rounded-2xl border border-slate-850/60 backdrop-blur">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 flex items-center justify-center">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Exam Emergency Rescue</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">High-yielding study roadmaps custom generated to score maximum marks in 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/40 rounded-2xl border border-slate-850/60 backdrop-blur">
              <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Interactive Viva Prep</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Simulate actual internal and external examiner panel checks with feedback loops.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950/40 rounded-2xl border border-slate-850/60 backdrop-blur">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Peer Contributed Sheets</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Upload, clean and automatically scan summaries, PYQs, exam patterns and viva hacks.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-5 text-[10px] font-mono text-slate-500 relative z-10">
            <span>SECURED LOCK SHIELD</span>
            <span>v2.1.0-beta</span>
          </div>
        </div>

        {/* Right Grid: Active Portal Verification Frame */}
        <div className="col-span-12 md:col-span-6 p-6 sm:p-12 flex flex-col justify-center min-h-[450px]">
          
          <AnimatePresence mode="wait">
            
            {/* 1. Normal Landing State (Choice Picker) */}
            {authMethod === 'none' && !successState && (
              <motion.div 
                key="choice"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  {/* Small logo for mobile header */}
                  <div className="flex md:hidden items-center space-x-2 mb-6 justify-center">
                    <GraduationCap className="h-6 w-6 text-indigo-400" />
                    <span className="font-sans font-bold text-white tracking-tight">CampusPilot AI</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-100 font-sans text-center md:text-left">Get Started</h3>
                  <p className="text-xs text-slate-400 mt-1.5 text-center md:text-left">
                    Welcome to the Next-Gen engineering test-prep engine. Choose an authentication channel below to access your custom dashboard.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  
                  {/* Google Authenticator Option */}
                  <button
                    onClick={() => setAuthMethod('google')}
                    id="btn-login-google-channel"
                    className="w-full flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 p-4 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-200 block">Continue with Google / Gmail</span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{defaultEmail}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </button>

                  {/* OTP Authenticator Option */}
                  <button
                    onClick={() => setAuthMethod('phone')}
                    id="btn-login-phone-channel"
                    className="w-full flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 p-4 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-200 block">Mobile Number with OTP</span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Simulate instant Indian 10-digit login</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </button>

                </div>

                <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-850 flex items-start gap-2">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center text-[10px] font-black text-indigo-400">i</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Designed for students preparing under short timelines. Connecting your account unlocks permanent academic milestones tracking.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. Google Verification Loading Flow */}
            {authMethod === 'google' && !successState && (
              <motion.div
                key="google-flow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => { setAuthMethod('none'); setErrorMessage(''); }}
                    className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">Gmail Authenticator</span>
                </div>

                <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-5 text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <Mail className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Google Credentials Selected</h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">{defaultEmail}</p>
                  </div>

                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Google identity provides dynamic academic personalization. Logs you in as <b className="text-indigo-400 font-bold">{autoSuggestedName}</b> instantly.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-650 active:scale-[0.98] text-white text-xs font-bold py-3 px-5 rounded-xl disabled:opacity-50 disabled:pointer-events-none transition-all shadow-lg shadow-red-900/10 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                          <span>Contacting API Secure Gateways...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Authenticate Account</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isSubmitting && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-center font-mono text-indigo-400 animate-pulse"
                  >
                    Applying secure OAuth headers & establishing CampusPilot session...
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* 3. Mobile Number OTP Flow */}
            {authMethod === 'phone' && !successState && (
              <motion.div
                key="phone-flow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Flow Nav Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => { 
                        if (otpSent) {
                          setOtpSent(false);
                        } else {
                          setAuthMethod('none');
                        }
                        setErrorMessage('');
                      }} 
                      className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">
                      {otpSent ? 'Enter Security OTP' : 'Request Mobile OTP'}
                    </span>
                  </div>
                  {otpSent && (
                    <span className="text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded font-mono text-indigo-400">
                      OTP Sent to +91 {phoneNumber}
                    </span>
                  )}
                </div>

                {errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {!otpSent ? (
                  /* Form A: Enter phone number */
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Indian Mobile Number</label>
                      <div className="flex bg-slate-950 border border-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all">
                        <div className="flex items-center px-4 bg-slate-900 border-r border-slate-800 text-xs text-slate-400 font-mono">
                          +91
                        </div>
                        <input
                          type="tel"
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 bg-transparent py-3.5 px-4 text-xs font-semibold focus:outline-none text-slate-200 placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      We will verify this number dynamically using our simulated OTP microservice (works instantly with any active test sequence).
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting || phoneNumber.length < 10}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-600 active:scale-[0.98] text-white text-xs font-bold py-3.5 px-5 rounded-xl disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-indigo-950/50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                          <span>Routing SMS gateways...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Secure Validation Code</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Form B: Enter 6 digit OTP */
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                          6-Digit Verification Code
                        </label>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Enter <code className="text-indigo-400 bg-indigo-500/5 px-1 py-0.5 rounded font-bold">123456</code> or any code
                        </span>
                      </div>
                      
                      {/* Flex grid for cells */}
                      <div className="flex justify-between gap-2.5">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-cell-${idx}`}
                            type="text"
                            maxLength={1}
                            pattern="\d*"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-11 h-12 text-center text-lg font-black bg-slate-950 rounded-xl border border-slate-800 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">
                        {timer > 0 ? (
                          `Code expires in ${timer}s`
                        ) : (
                          <span className="text-red-400">Code expired</span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={!canResend}
                        className={`font-semibold cursor-pointer select-none transition-colors ${
                          canResend 
                            ? 'text-indigo-400 hover:text-indigo-300 underline' 
                            : 'text-slate-650 text-slate-600 pointer-events-none'
                        }`}
                      >
                        Resend OTP Address
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || otpCode.join('').length < 6}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-650 to-indigo-650 hover:from-emerald-600 hover:to-indigo-600 active:scale-[0.98] text-white text-xs font-bold py-3.5 px-5 rounded-xl disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                          <span>Verifying OTP Passcode...</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="h-4.5 w-4.5 text-emerald-400" />
                          <span>Verify Passcode & Access Engine</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* 4. Complete Success Verification Screen */}
            {successState && (
              <motion.div
                key="success-splash"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-6"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-sans">Authentication Verified!</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Session successfully opened as <span className="text-indigo-400 font-bold">{autoSuggestedName}</span>
                  </p>
                </div>

                <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-1/2 h-full bg-gradient-to-r from-emerald-400 to-indigo-500 rounded-full"
                  />
                </div>

                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest animate-pulse">
                  Configuring real-time RGPV curriculum states...
                </p>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
