"use client";

import Image from "next/image";
import xteamwear from "@/assets/logo.svg";
import google from "@/assets/google.png";

export default function SignInUpPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center py-10">
        <div className="bg-gray-100 rounded-2xl xl:w-[37%] lg:w-[45%] md:w-[58%] w-[92%] px-[40px] py-9">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image className="w-[280px] h-auto" src={xteamwear} alt="xteamwear" />
            </div>
            <div className="space-y-3">
              <p className="text-2xl font-medium">Sign in</p>
              <p className="text-gray-600">Sign in or create an account</p>
              <button
                type="button"
                className="w-full cursor-pointer h-[50px] rounded-lg bg-indigo-600 hover:bg-indigo-700 font-medium text-white transition-all duration-200"
              >
                Continue with shop
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-white hover:bg-white/50 w-full h-[50px] rounded-lg font-medium border border-gray-600 justify-center cursor-pointer"
              >
                <Image className="w-[25px] h-auto" src={google} alt="google" /> Continue With Google
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full h-[1px] bg-gray-400"></div>
              <div className="text-gray-600">or</div>
              <div className="w-full h-[1px] bg-gray-400"></div>
            </div>
            <div className="flex flex-col space-y-3">
              <input
                className="w-full h-[50px] rounded-lg bg-gray-100 border-[2px] border-gray-300 placeholder:text-gray-600 focus:border-gray-600 transition-all duration-300 outline-none pl-3"
                type="email"
                placeholder="Email"
              />
              <button
                type="button"
                className="w-full cursor-pointer h-[50px] rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 transition-all duration-200"
              >
                Continue
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="w-4 h-4 border border-gray-300 accent-black rounded-md checked:bg-black checked:border-black text-white"
                  type="checkbox"
                />
                <span className="text-[15px]">Email me with news and offers</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-center text-gray-600 text-[14px] mt-4">
            <p>By continuing, you agree to our</p>
            <p className="font-medium underline cursor-pointer">Terms of service</p>
          </div>
        </div>
      </div>
      <p className="text-center pb-5 text-[14px] font-medium cursor-pointer">Privacy policy</p>
    </div>
  );
}