
import { useEffect, useState } from "react";
import {
  getAllSites,
  createSite,
  updateSite,
  deleteSite,
  updateSiteStatus,
} from "../services/siteService";

const initialForm = {
  siteName: "",
  siteCode: "",
  location: "",
  managerId: "",
  status: "ACTIVE",
};

const Sites = () => {
  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSites = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllSites();
      setSites(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load sites."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleEdit = (site) => {
    setEditingId(site.id);

    setFormData({
      siteName: site.siteName || "",
      siteCode: site.siteCode || "",
      location: site.location || "",
      managerId: String(site.siteManagerId || ""),
      status: site.status || "ACTIVE",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        managerId: Number(formData.managerId),
      };

      if (editingId) {
        await updateSite(editingId, payload);
        setSuccess("Site updated successfully.");
      } else {
        await createSite(payload);
        setSuccess("Site created successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(initialForm);

      await fetchSites();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to save site."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (siteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this site?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteSite(siteId);

      setSuccess("Site deleted successfully.");
      await fetchSites();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to delete site."
      );
    }
  };

  const handleStatusChange = async (site) => {
    const newStatus =
      site.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      setError("");
      setSuccess("");

      await updateSiteStatus(site.id, newStatus);

      setSuccess("Site status updated successfully.");
      await fetchSites();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update site status."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Site Management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your organization's sites.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add New Site
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            {editingId ? "Edit Site" : "Create New Site"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Site Name
                </label>
                <input
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={150}
                  placeholder="Enter site name"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Site Code
                </label>
                <input
                  name="siteCode"
                  value={formData.siteCode}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  placeholder="Example: NOI-001"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  placeholder="Enter site location"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Site Manager ID
                </label>
                <input
                  type="number"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter existing Site Manager user ID"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Enter the ID of an existing active SITE_MANAGER.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Site"
                    : "Create Site"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData(initialForm);
                }}
                className="rounded-lg border px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sites Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="font-semibold text-slate-800">
            All Sites ({sites.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading sites...
          </div>
        ) : sites.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No sites found. Create your first site.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">

              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4">Site</th>
                  <th className="px-5 py-4">Code</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Manager</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sites.map((site) => (
                  <tr key={site.id} className="hover:bg-slate-50">

                    <td className="px-5 py-4 font-medium text-slate-900">
                      {site.siteName}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {site.siteCode}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {site.location}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {site.siteManagerName || "N/A"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {site.siteManagerEmail || ""}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        site.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {site.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(site)}
                          className="rounded-md bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleStatusChange(site)}
                          className="rounded-md bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                        >
                          Toggle Status
                        </button>

                        <button
                          onClick={() => handleDelete(site.id)}
                          className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Sites;
