"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const TABS = [
  { id: "login", label: "Login" },
  { id: "register", label: "Register" },
];

export default function AuthCard() {
  const [tab, setTab] = useState("login"); // "login" | "register" | "forgot"

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-105 overflow-hidden">
      {/* Tab bar — hidden when on forgot view */}
      {tab !== "forgot" && (
        <div className="flex border-b border-slate-100 px-6">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 py-4 text-sm font-bold transition-all duration-200 border-b-2 -mb-px ${
                tab === id
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="p-7">
        {tab === "login" && <LoginForm onForgot={() => setTab("forgot")} />}
        {tab === "register" && <RegisterForm />}
        {tab === "forgot" && (
          <ForgotPasswordForm onBack={() => setTab("login")} />
        )}
      </div>
    </div>
  );
}
