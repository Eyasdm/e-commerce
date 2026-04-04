import api from "@/lib/api"; // your existing axios instance

// ── Auth endpoints ────────────────────────────────────────────────────────────

export const authApi = {
  login: async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  signup: async ({ name, email, password }) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    return data;
  },

  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },

  getMe: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  forgotPassword: async ({ email }) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  resetPassword: async ({ token, password }) => {
    const { data } = await api.patch(`/auth/reset-password/${token}`, { password });
    return data;
  },

  updatePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await api.patch("/auth/update-password", {
      currentPassword,
      newPassword,
    });
    return data;
  },

  refreshToken: async () => {
    const { data } = await api.post("/auth/refresh");
    return data;
  },
};
