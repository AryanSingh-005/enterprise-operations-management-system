import api from "./api";

// Login user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const {
    token,
    tokenType,
    expiresIn,
    userId,
    name,
    email,
    role,
  } = response.data;

  if (!token) {
    throw new Error("Authentication token not received from server");
  }

  // Store JWT token separately
  localStorage.setItem("token", token);

  // Store only user information, never the JWT
  const user = {
    userId,
    name,
    email,
    role,
  };

  localStorage.setItem("user", JSON.stringify(user));

  return {
    tokenType,
    expiresIn,
    user,
  };
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get currently authenticated user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};
