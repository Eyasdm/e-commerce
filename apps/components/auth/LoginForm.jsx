"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import AuthInput from "./AuthInput";
import AuthDivider from "./AuthDivider";
import GoogleButton from "./GoogleButton";
import Link from "next/link";

export default function LoginForm({ onForgot }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: async () => {
          toast.success("Welcome back!");
          // ← check role after login
          const res = await fetch("/api/v1/auth/me", {
            credentials: "include",
          });
          const data = await res.json();
          const role = data?.data?.user?.role;
          if (role === "admin") {
            router.push("/admin/overview");
          } else {
            router.push("/");
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Login failed");
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

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgot}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-auto"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>

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
