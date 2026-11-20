// Renders the interface and behavior for this application module.

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Unauthorized = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          🔒
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Access Denied
        </h1>

        <p className="mt-3 text-slate-500">
          Sorry, you don't have permission to access this page.
          Please contact your administrator if you believe this is a mistake.
        </p>

        {user && (
          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-left">
            <p className="text-sm text-slate-500">
              Logged in as
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {user.name}
            </p>

            <p className="text-sm text-slate-600">
              {user.email}
            </p>

            <p className="mt-2 text-sm">
              <span className="font-medium text-slate-600">
                Role: 
              </span>

              <span className="font-semibold text-blue-600">
                {user.role}
              </span>
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            to="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>

          <button
            onClick={logout}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Unauthorized;
