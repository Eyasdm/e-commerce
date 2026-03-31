import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import Overview from "./pages/Overview";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Account from "./pages/Account";

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!admin)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-white text-lg font-semibold mb-2">Access Denied</p>
          <p className="text-slate-400 text-sm">
            Please login from the store first.
          </p>
          <a
            href="http://localhost:3000/auth"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-semibold"
          >
            Go to Login
          </a>
        </div>
      </div>
    );

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
