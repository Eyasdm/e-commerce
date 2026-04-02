import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useSidebar } from "@/context/SidebarContext";

export default function AdminLayoutComponent({ children }) {
  const { isOpen, close } = useSidebar();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={close}
        />
      )}

      <Sidebar />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? "lg:ml-64" : "lg:ml-16"
        } ml-0`}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
