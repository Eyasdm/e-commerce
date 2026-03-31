import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Loader2,
  User,
  Mail,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
} from "lucide-react";

export default function Account() {
  const { admin, setAdmin } = useAuth();

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(admin?.name || "");
  const [isSavingName, setIsSavingName] = useState(false);

  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [isSavingPw, setIsSavingPw] = useState(false);

  const initials = admin?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveName = async () => {
    if (!nameValue.trim() || nameValue === admin?.name) {
      setEditingName(false);
      return;
    }
    setIsSavingName(true);
    try {
      const res = await api.patch("/users/me", { name: nameValue });
      setAdmin(res.data.user);
      toast.success("Name updated");
      setEditingName(false);
    } catch {
      toast.error("Failed to update name");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.passwordConfirm) {
      toast.error("Passwords don't match");
      return;
    }
    setIsSavingPw(true);
    try {
      await api.patch("/auth/update-password", pwForm);
      toast.success("Password updated");
      setPwForm({ currentPassword: "", newPassword: "", passwordConfirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsSavingPw(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
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
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  autoFocus
                  className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400 w-full"
                />
                <button
                  onClick={handleSaveName}
                  disabled={isSavingName}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shrink-0"
                >
                  {isSavingName ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} />
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setNameValue(admin?.name || "");
                  }}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-lg truncate">
                  {admin?.name}
                </h2>
                <button
                  onClick={() => setEditingName(true)}
                  className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition shrink-0"
                >
                  <Pencil size={12} />
                </button>
              </div>
            )}
            <p className="text-slate-400 text-sm mt-0.5">{admin?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
            <Mail size={15} className="text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-medium text-slate-700 truncate">
                {admin?.email}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
            <Shield size={15} className="text-slate-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Role</p>
              <p className="text-sm font-medium text-blue-600 capitalize">
                {admin?.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={15} className="text-blue-600" />
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition pr-10"
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
            disabled={isSavingPw}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
          >
            {isSavingPw && <Loader2 size={14} className="animate-spin" />}
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
