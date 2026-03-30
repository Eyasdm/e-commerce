import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import { Loader2, ChevronDown } from "lucide-react";

export function StatusDropdown({ orderId, currentStatus }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async (status) => {
      await api.patch(`/orders/admin/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-all-orders"] });
      setOpen(false);
    },
  });

  const options = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ].filter((s) => s !== currentStatus);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        disabled={isPending}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition px-2 py-1 rounded-lg hover:bg-slate-100"
      >
        {isPending ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <ChevronDown size={12} />
        )}
        Update
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 min-w-32">
          {options.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 capitalize transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
