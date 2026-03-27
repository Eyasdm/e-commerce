"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

import AuthInput from "./AuthInput";
import AuthDivider from "./AuthDivider";
import GoogleButton from "./GoogleButton";
import Link from "next/link";

export default function LoginForm({ onForgot }) {
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //  hook
  const { mutate: login, isPending, error } = useLogin();

  //  submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        icon={Lock}
        type={showPass ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightIcon={showPass ? EyeOff : Eye}
        onRightClick={() => setShowPass(!showPass)}
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="accent-blue-600 w-3.5 h-3.5"
          />
          Remember me
        </label>

        <button
          type="button"
          onClick={onForgot}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending} // ✅ disable while loading
        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150 disabled:opacity-60"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {/*  error handling */}
      {error && (
        <p className="text-xs text-red-500 text-center">
          Invalid email or password
        </p>
      )}

      <AuthDivider />
      <GoogleButton />

      <p className="text-center text-xs text-slate-400">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="text-blue-600 font-semibold hover:underline"
        >
          Terms & Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
