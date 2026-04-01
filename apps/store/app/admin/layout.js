"use client";

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AdminLayoutComponent from "@/components/admin/layout/AdminLayoutComponent";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <SidebarProvider>
        <AdminLayoutComponent>{children}</AdminLayoutComponent>
      </SidebarProvider>
    </AdminAuthProvider>
  );
}
