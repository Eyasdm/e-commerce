"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import AuthInput from "./AuthInput";
import AuthDivider from "./AuthDivider";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formError, setFormError] = useState("");
  const { checkAuth } = useAuth();

  const router = useRouter();

  const { mutate: register, isPending, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !password || !passwordConfirm) {
      return setFormError("All fields are required");
    }

    if (password !== passwordConfirm) {
      return setFormError("Passwords do not match");
    }

    register(
      { name, email, password, passwordConfirm },
      {
        onSuccess: async () => {
          await checkAuth(); // wait for auth to hydrate
          router.push("/");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AuthInput
        icon={User}
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <AuthInput
        icon={Lock}
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        rightIcon={showConfirm ? EyeOff : Eye}
        onRightClick={() => setShowConfirm(!showConfirm)}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150 disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create Account"}
      </button>

      {formError && (
        <p className="text-xs text-red-500 text-center">{formError}</p>
      )}

      {error && (
        <p className="text-xs text-red-500 text-center">Registration failed</p>
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
