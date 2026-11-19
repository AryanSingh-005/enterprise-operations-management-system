
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Units from "./pages/Units";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const AppRoutes = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading application...</p>
      </div>
    );
  }

  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            element={
              ["SUPER_ADMIN", "ADMIN"].includes(user?.role)
                ? <Sites />
                : <Navigate to="/unauthorized" replace />
            }
            path="/sites"
          />

          <Route
            element={
              ["SUPER_ADMIN", "ADMIN", "SITE_MANAGER"].includes(user?.role)
                ? <Units />
                : <Navigate to="/unauthorized" replace />
            }
            path="/units"
          />

          <Route
            element={
              user?.role === "SUPER_ADMIN"
                ? <Users />
                : <Navigate to="/unauthorized" replace />
            }
            path="/users"
          />

        </Route>

      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
