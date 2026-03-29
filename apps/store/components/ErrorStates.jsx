"use client";

import { AlertTriangle, RefreshCcw, WifiOff, ShieldOff, ServerCrash } from "lucide-react";

// ── Error type detection ───────────────────────────────────────────────────────
function classifyError(error) {
  const status = error?.response?.status ?? error?.status;
  if (!status && !error?.response) {
    return { icon: WifiOff, title: "No connection", message: "Check your internet and try again.", color: "amber" };
  }
  if (status === 401 || status === 403) {
    return { icon: ShieldOff, title: "Not authorised", message: "Please log in to access this content.", color: "blue" };
  }
  if (status === 404) {
    return { icon: AlertTriangle, title: "Not found", message: "This content doesn't exist or has been removed.", color: "slate" };
  }
  if (status >= 500) {
    return { icon: ServerCrash, title: "Server error", message: "Our servers hit a snag. Try again in a moment.", color: "red" };
  }
  return { icon: AlertTriangle, title: "Something went wrong", message: error?.message ?? "An unexpected error occurred.", color: "red" };
}

const colorMap = {
  red:   { bg: "bg-red-50",   border: "border-red-100",  icon: "text-red-400",   btn: "bg-red-500 hover:bg-red-600 shadow-red-200"   },
  amber: { bg: "bg-amber-50", border: "border-amber-100",icon: "text-amber-400", btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-200" },
  blue:  { bg: "bg-blue-50",  border: "border-blue-100", icon: "text-blue-400",  btn: "bg-blue-500 hover:bg-blue-600 shadow-blue-200"   },
  slate: { bg: "bg-slate-50", border: "border-slate-100",icon: "text-slate-400", btn: "bg-slate-500 hover:bg-slate-600 shadow-slate-200" },
};

// ── Inline error component (for query errors inside a section) ─────────────────
export function QueryError({ error, onRetry, className = "" }) {
  const { icon: Icon, title, message, color } = classifyError(error);
  const c = colorMap[color];

  return (
    <div className={`rounded-2xl border ${c.bg} ${c.border} p-6 flex flex-col items-center text-center gap-3 ${className}`}>
      <div className={`w-12 h-12 rounded-full ${c.bg} flex items-center justify-center`}>
        <Icon size={22} className={c.icon} />
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-xl ${c.btn} shadow-sm transition-all active:scale-95`}
        >
          <RefreshCcw size={13} />
          Try again
        </button>
      )}
    </div>
  );
}

// ── Full-page error (for page-level failures) ─────────────────────────────────
export function PageError({ error, onRetry }) {
  const { icon: Icon, title, message, color } = classifyError(error);
  const c = colorMap[color];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-5">
      <div className={`w-20 h-20 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center`}>
        <Icon size={32} className={c.icon} />
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-1">{title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl text-sm ${c.btn} shadow-md transition-all active:scale-95`}
        >
          <RefreshCcw size={15} />
          Try again
        </button>
      )}
    </div>
  );
}
