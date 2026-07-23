"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import xteamwear from "@/assets/logo.svg";
import google from "@/assets/google.png";
import { ImSpinner2 } from "react-icons/im";

export default function SignInUpPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

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

            {/* Header Text */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {mode === "signin" ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-sm text-gray-500">
                {mode === "signin"
                  ? "Sign in to access your orders and saved designs"
                  : "Join Xteamwear to customize and track your sportswear"}
              </p>
            </div>

            {/* OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 w-full h-12 rounded-xl font-medium border border-gray-300 text-gray-700 transition-all duration-200 shadow-sm"
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

            {/* Form */}
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

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-semibold text-sm bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

            {/* Toggle Switch */}
            <p className="text-center text-sm text-gray-600">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
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
                    className="font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
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
          </div>

          <div className="flex gap-1.5 justify-center text-gray-500 text-xs mt-8 pt-4 border-t border-gray-100">
            <span>By continuing, you agree to our</span>
            <Link href="/terms" className="font-medium underline hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs font-medium text-gray-500">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}