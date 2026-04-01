"use client";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminLayoutComponent from "@/components/admin/layout/AdminLayoutComponent";
import { useAuth } from "@/context/AdminAuthContext";

function AdminGuard({ children }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return null;

  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <SidebarProvider>
        <AdminGuard>{children}</AdminGuard>
      </SidebarProvider>
    </AdminAuthProvider>
  );
}
