"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthInput from "./AuthInput";
import { useResetPassword } from "@/hooks/useAuth";

// Used on /reset-password/[token] page
export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    error,
  } = useResetPassword();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirm) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    resetPassword(
      { token, password },
      { onSuccess: () => router.push("/auth") },
    );
  };

  const errorMessage =
    validationError ?? error?.response?.data?.message ?? error?.message ?? null;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center py-4 gap-4">
        <div className="text-5xl">✅</div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">
            Password updated!
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            You can now log in with your new password.
          </p>
        </div>
        <button
          onClick={() => router.push("/auth")}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1">
          Set new password
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Choose a strong password for your account.
        </p>
      </div>

      <AuthInput
        icon={Lock}
        type={showPass ? "text" : "password"}
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightIcon={showPass ? EyeOff : Eye}
        onRightClick={() => setShowPass(!showPass)}
      />

      <AuthInput
        icon={Lock}
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        rightIcon={showConfirm ? EyeOff : Eye}
        onRightClick={() => setShowConfirm(!showConfirm)}
      />

      {errorMessage && (
        <p className="text-xs text-red-500 font-medium -mt-1">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}
