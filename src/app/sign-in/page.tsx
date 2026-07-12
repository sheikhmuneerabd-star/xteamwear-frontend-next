"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import xteamwear from "@/assets/logo.svg";
import google from "@/assets/google.png";

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

        // Registration ke turant baad auto sign-in
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
          setError("Account created — please sign in.");
          setMode("signin");
          setLoading(false);
          return;
        }
        router.push("/");
        return;
      }

      // Sign in mode
      const result = await signIn("credentials", { email, password, redirect: false });

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
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center py-10">
        <div className="bg-gray-100 rounded-2xl xl:w-[37%] lg:w-[45%] md:w-[58%] w-[92%] px-[40px] py-9">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image className="w-[280px] h-auto" src={xteamwear} alt="xteamwear" />
            </div>

            <div className="space-y-3">
              <p className="text-2xl font-medium">{mode === "signin" ? "Sign in" : "Create account"}</p>
              <p className="text-gray-600">
                {mode === "signin" ? "Sign in or create an account" : "Join Xteamwear to track your orders"}
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 bg-white hover:bg-white/50 w-full h-[50px] rounded-lg font-medium border border-gray-600 justify-center"
              >
                <Image className="w-[25px] h-auto" src={google} alt="google" /> Continue With Google
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full h-[1px] bg-gray-400"></div>
              <div className="text-gray-600">or</div>
              <div className="w-full h-[1px] bg-gray-400"></div>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="flex flex-col space-y-3">
              {mode === "register" && (
                <input
                  className="w-full h-[50px] rounded-lg bg-gray-100 border-[2px] border-gray-300 placeholder:text-gray-600 focus:border-gray-600 transition-all duration-300 outline-none pl-3"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <input
                className="w-full h-[50px] rounded-lg bg-gray-100 border-[2px] border-gray-300 placeholder:text-gray-600 focus:border-gray-600 transition-all duration-300 outline-none pl-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="w-full h-[50px] rounded-lg bg-gray-100 border-[2px] border-gray-300 placeholder:text-gray-600 focus:border-gray-600 transition-all duration-300 outline-none pl-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[50px] rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Please wait..." : mode === "signin" ? "Continue" : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button type="button" className="font-medium underline" onClick={() => { setMode("register"); setError(""); }}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button type="button" className="font-medium underline" onClick={() => { setMode("signin"); setError(""); }}>
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="flex gap-2 justify-center text-gray-600 text-[14px] mt-4">
            <p>By continuing, you agree to our</p>
            <p className="font-medium underline cursor-pointer">Terms of service</p>
          </div>
        </div>
      </div>
      <p className="text-center py-5 text-[14px] font-medium cursor-pointer">Privacy policy</p>
    </div>
  );
}