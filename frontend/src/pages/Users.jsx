// Renders the interface and behavior for this application module.

import { useState } from "react";
import { createUser } from "../services/userService";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
};

const Users = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");
    setCreatedUser(null);

    try {
      const response = await createUser(formData);

      setCreatedUser(response);
      setSuccess("User created successfully!");
      setFormData(initialForm);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to create user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          User Management
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create users and assign organizational roles.
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Created User Details */}
      {createdUser && (
        <div className="mb-6 rounded-xl border border-green-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-green-700">
            Newly Created User
          </h2>

          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="text-slate-500">Name: </span>
              {createdUser.name}
            </p>

            <p>
              <span className="text-slate-500">Email: </span>
              {createdUser.email}
            </p>

            <p>
              <span className="text-slate-500">User ID: </span>
              {createdUser.id}
            </p>

            <p>
              <span className="text-slate-500">Role: </span>
              {createdUser.role}
            </p>
          </div>
        </div>
      )}

      {/* User Creation Form */}
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Create New User
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter user details and select an appropriate role.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              minLength={2}
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@enterprise.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Temporary Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter temporary password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-20 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Assign Role
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="SITE_MANAGER">Site Manager</option>
              <option value="ADMIN">Admin</option>
            </select>

            <p className="mt-2 text-xs text-slate-500">
              SUPER_ADMIN accounts cannot be created through this form.
            </p>
          </div>

          {/* Submit */}
          <div className="flex flex-wrap gap-3 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating User..." : "Create User"}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData(initialForm);
                setError("");
                setSuccess("");
                setCreatedUser(null);
              }}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Reset Form
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Users;
