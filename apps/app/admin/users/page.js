"use client";
import { useState } from "react";
import { useAllUsers } from "@/hooks/admin/useAllUsers";
import {
  useDeleteUser,
  useUpdateUserRole,
} from "@/hooks/admin/useUserMutations";
import { Loader2, Trash2 } from "lucide-react";
import UserTableRow from "@/components/admin/users/UserTableRow";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], isLoading } = useAllUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateUserRole();

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const initials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900">Users</h2>
          <p className="text-sm text-slate-400">{users.length} total users</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400 transition flex-1 sm:w-64 sm:flex-none"
          />
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
            {["all", "user", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  roleFilter === r
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="block lg:hidden space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-slate-300" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-12">
            No users found
          </p>
        ) : (
          filtered.map((user) => {
            const isAdmin = user.role === "admin";
            return (
              <div
                key={user._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isAdmin ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {user.role}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() =>
                      updateRole({
                        id: user._id,
                        role: isAdmin ? "user" : "admin",
                      })
                    }
                    disabled={isUpdating}
                    className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 transition disabled:opacity-40 whitespace-nowrap"
                  >
                    {isUpdating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : isAdmin ? (
                      "Revoke"
                    ) : (
                      "Admin"
                    )}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    disabled={isDeleting}
                    className="w-full h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition disabled:opacity-40"
                  >
                    {isDeleting ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Avatar", "Name", "Email", "Role", "Joined", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-slate-400 px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2
                      size={24}
                      className="animate-spin text-slate-300 mx-auto"
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    onDelete={deleteUser}
                    onRoleToggle={(id, role) => updateRole({ id, role })}
                    isDeleting={isDeleting}
                    isUpdating={isUpdating}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
            Showing {filtered.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}
