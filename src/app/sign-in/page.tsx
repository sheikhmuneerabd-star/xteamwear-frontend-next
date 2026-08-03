"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import xteamwear from "@/assets/logo.svg";
import google from "@/assets/google.png";
import { ImSpinner2 } from "react-icons/im";
import { IoMailOutline, IoKeyOutline, IoArrowBack } from "react-icons/io5";

export default function SignInUpPage() {
  const router = useRouter();
  const [authType, setAuthType] = useState<"password" | "otp">("password");
  const [mode, setMode] = useState<"signin" | "register">("signin");
  
  // Basic State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState<"request" | "verify">("request");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

      // Automatically sign in via NextAuth
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
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-yellow-200">
      <div className="flex justify-center items-center py-12 px-4 sm:px-6">
        <div className="bg-white border border-gray-200/80 shadow-xl rounded-2xl xl:w-[38%] lg:w-[48%] md:w-[65%] w-full max-w-lg px-6 sm:px-10 py-10 transition-all">
          <div className="space-y-6">
            
            {/* Logo */}
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  className="w-[220px] sm:w-[260px] h-auto object-contain"
                  src={xteamwear}
                  alt="XTeamWear"
                  priority
                />
              </Link>
            </div>

            {/* Auth Switch Tabs */}
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
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {authType === "otp" 
                  ? (otpStep === "request" ? "Instant OTP Sign In" : "Verify Email OTP")
                  : (mode === "signin" ? "Welcome back" : "Create an account")}
              </h1>
              <p className="text-sm text-gray-500">
                {authType === "otp"
                  ? (otpStep === "request" ? "Enter email to receive a 6-digit login code" : `Code sent to ${email}`)
                  : (mode === "signin" ? "Sign in to access your orders and saved designs" : "Join Xteamwear to customize and track your sportswear")}
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center cursor-pointer justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 w-full h-12 rounded-xl font-medium border border-gray-300 text-gray-700 transition-all duration-200 shadow-sm"
            >
              <Image className="w-5 h-5" src={google} alt="Google" />
              <span className="text-sm font-semibold">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                or
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Error Container */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* CONDITIONAL AUTH FORM */}
            {authType === "password" ? (
              /* PASSWORD AUTH FORM */
              <form onSubmit={handleCredentialsSubmit} className="flex flex-col space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      className="w-full h-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all outline-none px-4"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full h-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all outline-none px-4"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    className="w-full h-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all outline-none px-4"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl font-semibold text-sm bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      className="w-full h-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all outline-none px-4"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-semibold text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
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
                        className="w-11 h-12 text-center text-lg font-black bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-black focus:outline-none focus:bg-white transition-all"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-semibold text-sm bg-black text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Verify & Sign In"}
                  </button>

                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pt-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep("request")}
                      className="hover:text-black underline flex items-center gap-1"
                    >
                      <IoArrowBack /> Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestOTP}
                      disabled={!canResend}
                      className={`${canResend ? "text-amber-600 underline cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                    >
                      {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                    </button>
                  </div>
                </form>
              )
            )}

            {/* Toggle Mode Switch for Password Mode */}
            {authType === "password" && (
              <p className="text-center text-sm text-gray-600">
                {mode === "signin" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      className="font-semibold text-gray-900 underline underline-offset-4 hover:text-black cursor-pointer"
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
                      className="font-semibold text-gray-900 underline underline-offset-4 hover:text-black cursor-pointer"
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
            )}

            <div className="flex gap-1.5 justify-center text-gray-500 text-xs mt-8 pt-4 border-t border-gray-100">
              <span>By continuing, you agree to our</span>
              <Link href="/terms" className="font-medium underline hover:text-gray-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs font-medium text-gray-500">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}