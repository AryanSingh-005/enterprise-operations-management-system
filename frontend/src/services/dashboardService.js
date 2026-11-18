
import api from "./api";

// Fetch dashboard statistics
export const getDashboardStatistics = async () => {
  const response = await api.get("/admin/dashboard/statistics");

  return response.data;
};
