// Provides the application functionality defined in this module.

import api from "./api";

// Get all units
export const getAllUnits = async () => {
  const response = await api.get("/admin/units");
  return response.data;
};

// Get unit by ID
export const getUnitById = async (unitId) => {
  const response = await api.get(`/admin/units/${unitId}`);
  return response.data;
};

// Get units by site ID
export const getUnitsBySite = async (siteId) => {
  const response = await api.get(`/admin/units/site/${siteId}`);
  return response.data;
};

// Get units by site ID and status
export const getUnitsBySiteAndStatus = async (siteId, status) => {
  const response = await api.get(
    `/admin/units/site/${siteId}/status`,
    {
      params: { status },
    }
  );

  return response.data;
};

// Create new unit
export const createUnit = async (unitData) => {
  const response = await api.post("/admin/units", unitData);
  return response.data;
};

// Update existing unit
export const updateUnit = async (unitId, unitData) => {
  const response = await api.put(`/admin/units/${unitId}`, unitData);
  return response.data;
};

// Update unit status
export const updateUnitStatus = async (unitId, status) => {
  const response = await api.patch(
    `/admin/units/${unitId}/status`,
    null,
    { params: { status } }
  );

  return response.data;
};

// Delete unit
export const deleteUnit = async (unitId) => {
  const response = await api.delete(`/admin/units/${unitId}`);
  return response.data;
};
