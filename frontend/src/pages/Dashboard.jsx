
import { useEffect, useState } from "react";
import api from "../services/api";

const StatCard = ({ title, value, description, icon }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value ?? 0}
          </h3>
          <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/dashboard/statistics");

      setStatistics(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={fetchStatistics}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: statistics?.totalUsers,
      description: "All registered users",
      icon: "👥",
    },
    {
      title: "Super Admins",
      value: statistics?.totalSuperAdmins,
      description: "System administrators",
      icon: "🛡️",
    },
    {
      title: "Admins",
      value: statistics?.totalAdmins,
      description: "Administrative users",
      icon: "👨‍💼",
    },
    {
      title: "Site Managers",
      value: statistics?.totalSiteManagers,
      description: "Site management users",
      icon: "🏢",
    },
    {
      title: "Employees",
      value: statistics?.totalEmployees,
      description: "Registered employees",
      icon: "👨‍💻",
    },
    {
      title: "Total Sites",
      value: statistics?.totalSites,
      description: "All registered sites",
      icon: "🏬",
    },
    {
      title: "Active Sites",
      value: statistics?.activeSites,
      description: "Currently active sites",
      icon: "✅",
    },
    {
      title: "Inactive Sites",
      value: statistics?.inactiveSites,
      description: "Inactive sites",
      icon: "⏸️",
    },
    {
      title: "Total Units",
      value: statistics?.totalUnits,
      description: "All registered units",
      icon: "🏗️",
    },
    {
      title: "Active Units",
      value: statistics?.activeUnits,
      description: "Currently active units",
      icon: "🟢",
    },
    {
      title: "Inactive Units",
      value: statistics?.inactiveUnits,
      description: "Inactive units",
      icon: "🔴",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Overview of your enterprise operations.
          </p>
        </div>

        <button
          onClick={fetchStatistics}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
