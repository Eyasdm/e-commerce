import AuthNav from "../../components/auth/AuthNav";
import LeftPanel from "../../components/auth/LeftPanel";
import AuthCard from "../../components/auth/AuthCard";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex flex-1">
        <LeftPanel />

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center pt-10">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
