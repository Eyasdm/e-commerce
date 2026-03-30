import { Trash2, Loader2 } from "lucide-react";

export default function UserTableRow({
  user,
  onDelete,
  onRoleToggle,
  isDeleting,
  isUpdating,
}) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isAdmin = user.role === "admin";

  return (
    <tr className="hover:bg-slate-50 transition">
      {/* Avatar */}
      <td className="px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
      </td>

      {/* Name */}
      <td className="px-4 py-3">
        <p className="font-medium text-slate-800 text-sm">{user.name}</p>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-slate-500 text-sm">{user.email}</td>

      {/* Role */}
      <td className="px-4 py-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
            isAdmin
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Join Date */}
      <td className="px-4 py-3 text-slate-500 text-xs">
        {new Date(user.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Role toggle */}
          <button
            onClick={() => onRoleToggle(user._id, isAdmin ? "user" : "admin")}
            disabled={isUpdating}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
              isAdmin
                ? "border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-500"
                : "border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
            } disabled:opacity-40`}
          >
            {isUpdating ? (
              <Loader2 size={12} className="animate-spin" />
            ) : isAdmin ? (
              "Revoke Admin"
            ) : (
              "Make Admin"
            )}
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(user._id)}
            disabled={isDeleting}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition disabled:opacity-40"
          >
            {isDeleting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
