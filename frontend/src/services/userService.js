// Provides the application functionality defined in this module.

import api from "./api";

// Create a new user
export const createUser = async (userData) => {
  const response = await api.post(
    "/super-admin/users",
    userData
  );

  return response.data;
};
