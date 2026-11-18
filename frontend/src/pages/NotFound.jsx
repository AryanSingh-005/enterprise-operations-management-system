
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">

        <h1 className="text-8xl font-extrabold text-blue-600">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          The page you are looking for doesn't exist or may
          have been moved.
        </p>

        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {isAuthenticated ? "Back to Dashboard" : "Back to Login"}
        </Link>

      </div>

    </div>
  );
};

export default NotFound;
