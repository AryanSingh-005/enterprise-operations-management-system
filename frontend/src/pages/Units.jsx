
import { useEffect, useState } from "react";
import {
  getAllUnits,
  createUnit,
  updateUnit,
  deleteUnit,
  updateUnitStatus,
  getUnitsBySite,
} from "../services/unitService";
import { getAllSites } from "../services/siteService";

const initialForm = {
  unitName: "",
  unitCode: "",
  siteId: "",
  status: "ACTIVE",
};

const Units = () => {
  const [units, setUnits] = useState([]);
  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);
  const [selectedSite, setSelectedSite] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load units and sites
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      const [unitData, siteData] = await Promise.all([
        getAllUnits(),
        getAllSites(),
      ]);

      setUnits(Array.isArray(unitData) ? unitData : []);
      setSites(Array.isArray(siteData) ? siteData : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load units and sites."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Filter units by site
  const handleSiteFilter = async (siteId) => {
    setSelectedSite(siteId);
    setError("");

    try {
      setLoading(true);

      const data = siteId
        ? await getUnitsBySite(siteId)
        : await getAllUnits();

      setUnits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to filter units."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      ...initialForm,
      siteId: selectedSite,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (unit) => {
    setEditingId(unit.id);

    setFormData({
      unitName: unit.unitName || "",
      unitCode: unit.unitCode || "",
      siteId: String(unit.siteId || ""),
      status: unit.status || "ACTIVE",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Create or update unit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        siteId: Number(formData.siteId),
      };

      if (editingId) {
        await updateUnit(editingId, payload);
        setSuccess("Unit updated successfully.");
      } else {
        await createUnit(payload);
        setSuccess("Unit created successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(initialForm);

      await handleSiteFilter(selectedSite);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to save unit."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete unit
  const handleDelete = async (unitId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteUnit(unitId);

      setSuccess("Unit deleted successfully.");
      await handleSiteFilter(selectedSite);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to delete unit."
      );
    }
  };

  // Toggle unit status
  const handleStatusChange = async (unit) => {
    const newStatus =
      unit.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      setError("");
      setSuccess("");

      await updateUnitStatus(unit.id, newStatus);

      setSuccess("Unit status updated successfully.");
      await handleSiteFilter(selectedSite);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update unit status."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Unit Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage units across your registered sites.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add New Unit
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

      {/* Site Filter */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Filter Units by Site
        </label>

        <select
          value={selectedSite}
          onChange={(e) => handleSiteFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500 md:max-w-sm"
        >
          <option value="">All Sites</option>

          {sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.siteName} ({site.siteCode})
            </option>
          ))}
        </select>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold text-slate-900">
            {editingId ? "Edit Unit" : "Create New Unit"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Unit Name
                </label>

                <input
                  name="unitName"
                  value={formData.unitName}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={150}
                  placeholder="Enter unit name"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Unit Code
                </label>

                <input
                  name="unitCode"
                  value={formData.unitCode}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={50}
                  placeholder="Example: NOI-UNIT-001"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Select Site
                </label>

                <select
                  name="siteId"
                  value={formData.siteId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select a site</option>

                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.siteName} ({site.siteCode})
                    </option>
                  ))}
                </select>
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
                    ? "Update Unit"
                    : "Create Unit"}
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

      {/* Units Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="font-semibold text-slate-800">
            All Units ({units.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading units...
          </div>
        ) : units.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No units found. Create your first unit.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left text-sm">

              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4">Unit Name</th>
                  <th className="px-5 py-4">Unit Code</th>
                  <th className="px-5 py-4">Site</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-50">

                    <td className="px-5 py-4 font-medium text-slate-900">
                      {unit.unitName}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {unit.unitCode}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {unit.siteName || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          unit.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {unit.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() => handleEdit(unit)}
                          className="rounded-md bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleStatusChange(unit)}
                          className="rounded-md bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                        >
                          Toggle Status
                        </button>

                        <button
                          onClick={() => handleDelete(unit.id)}
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

export default Units;
