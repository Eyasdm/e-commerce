"use client";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useMyOrders } from "@/lib/hooks/useMyOrders";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import {
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Package,
  Pencil,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { user, setUser, clearAuth, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { data: orders = [] } = useMyOrders();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  // Edit name state
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");

  // Change password state
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [isChangingPw, setIsChangingPw] = useState(false);

  useEffect(() => {
    if (user) setNameValue(user.name);
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated]);

  if (loading || !user)
    return (
      <main className="max-w-2xl mx-auto px-6 py-20 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-slate-300" />
      </main>
    );

  const handleSaveName = () => {
    if (!nameValue.trim() || nameValue === user.name) {
      setEditingName(false);
      return;
    }
    updateProfile(
      { name: nameValue },
      {
        onSuccess: (updatedUser) => {
          setUser(updatedUser);
          setEditingName(false);
        },
      },
    );
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.passwordConfirm) {
      toast.error("Passwords don't match");
      return;
    }
    setIsChangingPw(true);
    try {
      await api.patch("/auth/update-password", pwForm);
      toast.success("Password updated successfully!");
      setPwForm({ currentPassword: "", newPassword: "", passwordConfirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password.");
    } finally {
      setIsChangingPw(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const recentOrders = orders.slice(0, 3);

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
        <p className="text-slate-400 mt-1">
          Manage your profile and preferences
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400 w-full"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={isUpdating}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shrink-0"
                  >
                    {isUpdating ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Check size={13} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingName(false);
                      setNameValue(user.name);
                    }}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shrink-0"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-900 text-lg truncate">
                    {user.name}
                  </h2>
                  <button
                    onClick={() => setEditingName(true)}
                    className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition shrink-0"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}
              <p className="text-slate-400 text-sm mt-0.5 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-medium text-slate-700 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
              <Shield size={16} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Role</p>
                <p className="text-sm font-medium text-slate-700 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-blue-600" />
              <h3 className="font-bold text-slate-900">Recent Orders</h3>
            </div>
            <Link
              href="/orders"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-slate-400 text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <Link
                  key={order._id}
                  href={`/orders/${order._id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition group"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-slate-300 group-hover:text-blue-500 transition"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-blue-600" />
            <h3 className="font-bold text-slate-900">Change Password</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3">
            {["currentPassword", "newPassword", "passwordConfirm"].map(
              (field) => (
                <div key={field} className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder={
                      field === "currentPassword"
                        ? "Current password"
                        : field === "newPassword"
                          ? "New password"
                          : "Confirm new password"
                    }
                    value={pwForm[field]}
                    onChange={(e) =>
                      setPwForm({ ...pwForm, [field]: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 pr-10"
                  />
                  {field === "newPassword" && (
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </div>
              ),
            )}

            <button
              type="submit"
              disabled={isChangingPw}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
            >
              {isChangingPw ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl border border-red-100 shadow-sm p-4 flex items-center justify-between text-red-500 hover:bg-red-50 transition group"
        >
          <div className="flex items-center gap-3">
            <LogOut size={16} />
            <span className="font-semibold text-sm">Log Out</span>
          </div>
          <ChevronRight
            size={16}
            className="text-red-300 group-hover:text-red-500 transition"
          />
        </button>
      </div>
    </main>
  );
}
