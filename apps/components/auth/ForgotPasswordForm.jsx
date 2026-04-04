"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import AuthInput from "./AuthInput";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState("");
  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    error,
  } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  const errorMessage = error?.response?.data?.message ?? error?.message ?? null;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center py-4 gap-4">
        <div className="text-5xl">📬</div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">
            Check your inbox
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            We sent a reset link to
            <br />
            <strong className="text-slate-800">{email}</strong>
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to login
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors self-start"
      >
        <ArrowLeft size={14} /> Back to login
      </button>

      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1">
          Reset your password
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Error message */}
      {errorMessage && (
        <p className="text-xs text-red-500 font-medium -mt-1">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send Reset Link"}
      </button>
    </form>
  );
}
