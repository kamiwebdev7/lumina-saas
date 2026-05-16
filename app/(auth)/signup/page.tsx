"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false);

 async function handleSignup(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);
  setError(null);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  // Ensure session exists
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    window.location.href = "/dashboard";
  }
  setLoading(false);
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] via-[#F8F1EA] to-[#F4ECE4] flex items-center justify-center px-5 py-10">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_25px_80px_rgba(91,63,43,0.12)]">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#E7D4C3]/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#DCC2AE]/30 blur-3xl" />
        </div>

        <div className="relative px-8 py-10 sm:px-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A553D] to-[#5B3F2B] text-white shadow-[0_12px_30px_rgba(111,78,55,0.28)]">
              <span className="font-serif text-2xl">L</span>
            </div>

            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#B08B6F]">
              Client Portal
            </p>

            <h1 className="font-serif text-5xl leading-none text-[#4B3326]">
              Create Account
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8C7463]">
              Begin your personalized wellness transformation today.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6B4A36]">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DED5] bg-white/70 px-4 py-3.5 text-sm text-[#4B3326] placeholder:text-[#B7A08F] outline-none transition-all duration-300 focus:border-[#B08968] focus:ring-4 focus:ring-[#EADFD4]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#6B4A36]">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DED5] bg-white/70 px-4 py-3.5 text-sm text-[#4B3326] placeholder:text-[#B7A08F] outline-none transition-all duration-300 focus:border-[#B08968] focus:ring-4 focus:ring-[#EADFD4]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#6B4A36]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#E8DED5] bg-white/70 px-4 py-3.5 pr-12 text-sm text-[#4B3326] placeholder:text-[#B7A08F] outline-none transition-all duration-300 focus:border-[#B08968] focus:ring-4 focus:ring-[#EADFD4]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#9A8475] hover:text-[#6B4A36]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#7A553D] via-[#6B4A36] to-[#53392B] text-sm font-medium text-white shadow-[0_14px_30px_rgba(111,78,55,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(111,78,55,0.34)] active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E8DED5]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B84]">
              Secure Access
            </span>
            <div className="h-px flex-1 bg-[#E8DED5]" />
          </div>

          <p className="text-center text-sm text-[#9A8475]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#6B4A36] transition hover:text-[#4B3326]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}