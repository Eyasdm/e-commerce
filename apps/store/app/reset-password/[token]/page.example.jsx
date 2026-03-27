// app/reset-password/[token]/page.jsx
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AuthNav from "@/components/AuthNav";
import LeftPanel from "@/components/LeftPanel";

export default function ResetPasswordPage({ params }) {
  return (
    <>
      <AuthNav />
      <main className="min-h-[calc(100vh-4rem)] flex">
        <LeftPanel />
        <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-105 overflow-hidden p-7">
            <ResetPasswordForm token={params.token} />
          </div>
        </div>
      </main>
    </>
  );
}
