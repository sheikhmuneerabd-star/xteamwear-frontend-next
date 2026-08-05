"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import xteamwear from "@/assets/logo.svg";
import google from "@/assets/google.png";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline, IoArrowBack, IoLockClosedOutline, IoPersonOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import { Trophy, Eye, EyeOff } from "lucide-react";

export default function SignInUpPage() {
  const router = useRouter();
  const [authType, setAuthType] = useState<"password" | "otp">("password");
  const [mode, setMode] = useState<"signin" | "register">("signin");
  
  // Basic State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState<"request" | "verify">("request");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password Strength Logic (Visual Only)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-200" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500", text: "text-red-500" };
    if (score <= 3) return { score: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
    return { score: 4, label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  // OTP Resend Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authType === "otp" && otpStep === "verify" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [authType, otpStep, timer]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  // 1. Password Based Submit
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Registration failed");
          setLoading(false);
          return;
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Account created — please sign in.");
          setMode("signin");
          setLoading(false);
          return;
        }
        router.push("/");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // 2. Request Email OTP
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP code.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setOtpStep("verify");
      setTimer(60);
      setCanResend(false);
    } catch {
      setError("Failed to send OTP code.");
      setLoading(false);
    }
  };

  // 3. Verify Email OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: finalOtp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid or expired OTP");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        isOtpLogin: true,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to sign in. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch {
      setError("Verification failed.");
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 font-sans">
      
      {/* 🚀 LEFT SIDEBAR - BRANDING & STATS PANEL */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        {/* Logo / Brand Header */}
        <div className="relative z-10 flex items-center space-x-3">
          <Link href="/">
            <Image
              className="w-[180px] sm:w-[220px] h-auto object-contain brightness-0 invert"
              src={xteamwear}
              alt="XTeamWear"
              priority
            />
          </Link>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 my-8">
          <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase rounded-full mb-4 border border-amber-400/20">
            Professional Team Apparel
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Design Custom Gear That Powers Champions.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Join thousands of sports clubs & organizations designing high-performance custom teamwear.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3.5 mt-8">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">10K+</h3>
              <p className="text-xs text-slate-400 mt-0.5">Teams Outfitted</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">100%</h3>
              <p className="text-xs text-slate-400 mt-0.5">Custom Sublimation</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">3D</h3>
              <p className="text-xs text-slate-400 mt-0.5">Live Design Studio</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">Fast</h3>
              <p className="text-xs text-slate-400 mt-0.5">Worldwide Shipping</p>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="relative z-10 p-4.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
          <p className="text-xs text-slate-300 italic mb-2.5 leading-relaxed">
            "XTeamwear made ordering our squad's football kits effortless. The 3D preview and print quality were top-notch!"
          </p>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-amber-400 border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Alex Morgan</h4>
              <p className="text-[10px] text-slate-400">Manager, United Sports FC</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 RIGHT FORM PANEL */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md space-y-5">

          {/* Auth Switch Tabs (Password vs OTP) */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthType("password"); setError(""); }}
              className={`py-2 rounded-lg transition-all ${
                authType === "password" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => { setAuthType("otp"); setError(""); setOtpStep("request"); }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                authType === "otp" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              <IoMailOutline className="text-sm" /> Email OTP
            </button>
          </div>

          {/* Header Text */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {authType === "otp" 
                ? (otpStep === "request" ? "Instant OTP Sign In" : "Verify Email OTP")
                : (mode === "signin" ? "Welcome back" : "Create an account")}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {authType === "otp"
                ? (otpStep === "request" ? "Enter email to receive a 6-digit login code" : `Code sent to ${email}`)
                : (mode === "signin" ? "Sign in to access your orders and saved designs" : "Join XTeamwear to customize and track your sportswear")}
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm flex items-center justify-center space-x-3 shadow-sm hover:shadow transition-all"
          >
            <Image className="w-5 h-5" src={google} alt="Google" />
            <span className="font-semibold">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold absolute">
              or continue with email
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* CONDITIONAL AUTH FORM */}
          {authType === "password" ? (
            /* PASSWORD AUTH FORM */
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <IoMailOutline className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <IoLockClosedOutline className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter (Visual Feature) */}
                {mode === "register" && password && (
                  <div className="mt-2">
                    <div className="flex space-x-1.5 h-1.5 w-full">
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 1 ? strength.color : "bg-slate-200"}`} />
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 2 ? strength.color : "bg-slate-200"}`} />
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 3 ? strength.color : "bg-slate-200"}`} />
                      <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 4 ? strength.color : "bg-slate-200"}`} />
                    </div>
                    <p className={`text-[11px] font-medium mt-1 ${strength.text}`}>
                      Password strength: {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin text-lg" />
                    <span>Processing...</span>
                  </>
                ) : mode === "signin" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          ) : (
            /* EMAIL OTP FORM */
            otpStep === "request" ? (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <IoMailOutline className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Send Login Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-lg font-black bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none focus:bg-white transition-all"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Verify & Sign In"}
                </button>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setOtpStep("request")}
                    className="hover:text-slate-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <IoArrowBack /> Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestOTP}
                    disabled={!canResend}
                    className={`${canResend ? "text-amber-600 underline cursor-pointer" : "text-slate-400 cursor-not-allowed"}`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                  </button>
                </div>
              </form>
            )
          )}

          {/* Toggle Mode Switch for Password Mode */}
          {authType === "password" && (
            <p className="text-center text-xs text-slate-500 pt-1">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="font-bold text-amber-600 hover:text-amber-700 underline underline-offset-2 ml-1 cursor-pointer"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-bold text-amber-600 hover:text-amber-700 underline underline-offset-2 ml-1 cursor-pointer"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          )}

          {/* Guarantee Badge */}
          <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl flex items-center space-x-2 text-amber-800 text-xs">
            <IoShieldCheckmarkSharp className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Secure SSL Encryption. Free account included.</span>
          </div>

          {/* Footer Terms */}
          <div className="flex gap-1 justify-center text-slate-400 text-xs pt-3 border-t border-slate-100">
            <span>By continuing, you agree to our</span>
            <Link href="/terms" className="font-medium underline hover:text-slate-800">
              Terms
            </Link>
            <span>&</span>
            <Link href="/privacy-policy" className="font-medium underline hover:text-slate-800">
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}