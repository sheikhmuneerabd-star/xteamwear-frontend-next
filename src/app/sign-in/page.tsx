"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import bespoketeamwear from "@/assets/BSW-BLACK-LOGO.webp";
import google from "@/assets/google.png";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline, IoArrowBack, IoLockClosedOutline, IoPersonOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import { Trophy, Eye, EyeOff } from "lucide-react";

export default function SignInUpPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  
  // Input State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Registration OTP Step State
  const [signupStep, setSignupStep] = useState<"details" | "verify_otp">("details");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password Strength Logic
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
    if (mode === "register" && signupStep === "verify_otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [mode, signupStep, timer]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  // Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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

  // Step 1: Send Registration OTP
  const handleRequestSignUpOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send verification OTP.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSignupStep("verify_otp");
      setTimer(60);
      setCanResend(false);
    } catch {
      setError("Failed to send OTP code.");
      setLoading(false);
    }
  };

  // Step 2: Complete Registration with OTP
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, otp: finalOtp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMode("signin");
        setError("Account created — please sign in.");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch {
      setError("Registration failed.");
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
      
      {/* 🚀 LEFT SIDEBAR - BRANDING */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-3">
          <Link href="/">
            <Image
              className="w-[180px] sm:w-[205px] h-auto object-contain brightness-0 invert"
              src={bespoketeamwear}
              alt="Bespoketeamwear"
              priority
            />
          </Link>
        </div>

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

        <div className="relative z-10 p-4.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
          <p className="text-xs text-slate-300 italic mb-2.5 leading-relaxed">
            "Bespoketeamwear made ordering our squad's football kits effortless. The 3D preview and print quality were top-notch!"
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

          {/* Header Text */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {mode === "signin" 
                ? "Welcome back" 
                : (signupStep === "details" ? "Create an account" : "Verify Email OTP")}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {mode === "signin" 
                ? "Sign in to access your orders and saved designs" 
                : (signupStep === "details" ? "Fill details to receive email verification code" : `Verification OTP sent to ${email}`)}
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

          {/* 1️⃣ SIGN IN FORM */}
          {mode === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Sign In"}
              </button>
            </form>
          )}

          {/* 2️⃣ SIGN UP FORM (2-STEP WITH OTP) */}
          {mode === "register" && (
            signupStep === "details" ? (
              <form onSubmit={handleRequestSignUpOTP} className="space-y-4">
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

                  {/* Password Strength Meter */}
                  {password && (
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <IoLockClosedOutline className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Send Verification OTP"}
                </button>
              </form>
            ) : (
              /* OTP Verification Step */
              <form onSubmit={handleCompleteRegistration} className="space-y-5">
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
                  {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Verify & Create Account"}
                </button>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setSignupStep("details")}
                    className="hover:text-slate-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <IoArrowBack /> Back to Details
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestSignUpOTP}
                    disabled={!canResend}
                    className={`${canResend ? "text-amber-600 underline cursor-pointer" : "text-slate-400 cursor-not-allowed"}`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                  </button>
                </div>
              </form>
            )
          )}

          {/* Toggle Mode Switch */}
          <p className="text-center text-xs text-slate-500 pt-1">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-bold text-amber-600 hover:text-amber-700 underline underline-offset-2 ml-1 cursor-pointer"
                  onClick={() => {
                    setMode("register");
                    setSignupStep("details");
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
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </p>

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