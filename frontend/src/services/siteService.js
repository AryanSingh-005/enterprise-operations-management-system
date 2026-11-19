
import api from "./api";

// Get all sites
export const getAllSites = async () => {
  const response = await api.get("/admin/sites");
  return response.data;
};

// Get site by ID
export const getSiteById = async (siteId) => {
  const response = await api.get(`/admin/sites/${siteId}`);
  return response.data;
};

// Create new site
export const createSite = async (siteData) => {
  const response = await api.post("/admin/sites", siteData);
  return response.data;
};

// Update existing site
export const updateSite = async (siteId, siteData) => {
  const response = await api.put(`/admin/sites/${siteId}`, siteData);
  return response.data;
};

// Update site status
export const updateSiteStatus = async (siteId, status) => {
  const response = await api.patch(
    `/admin/sites/${siteId}/status`,
    null,
    { params: { status } }
  );

  return response.data;
};

// Delete site
export const deleteSite = async (siteId) => {
  const response = await api.delete(`/admin/sites/${siteId}`);
  return response.data;
};

// Search sites
export const searchSites = async (keyword) => {
  const response = await api.get("/admin/sites/search", {
    params: { name: keyword },
  });

  return response.data;
};
