"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useContact } from "@/lib/hooks/useContact";

export default function ContactForm() {
  const { mutate: sendMessage, isPending, isSuccess, error } = useContact();

  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(form);
  };

  const errorMessage = error?.response?.data?.message ?? error?.message ?? null;

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center gap-4">
        <CheckCircle2 size={44} className="text-emerald-500" />
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Message sent!</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Thanks for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
        <button
          onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h2>
      <p className="text-slate-400 text-sm mb-6">I will get back to you as soon as possible.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set("name")}
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
          <input
            type="text"
            placeholder="Collaboration, job opportunity, feedback..."
            value={form.subject}
            onChange={set("subject")}
            required
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
          <textarea
            placeholder="Tell me what is on your mind..."
            value={form.message}
            onChange={set("message")}
            required
            rows={5}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition resize-none"
          />
        </div>

        {/* Error */}
        {errorMessage && (
          <p className="text-xs text-red-500 font-medium -mt-1">{errorMessage}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-[0.985]"
        >
          {isPending ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : "Send Message"}
        </button>

        <p className="text-center text-xs text-slate-400">
          Or email me directly at{" "}
          <a href="mailto:Eyasadam01@outlook.com" className="text-blue-500 hover:underline">
            Eyasadam01@outlook.com
          </a>
        </p>
      </form>
    </div>
  );
}
