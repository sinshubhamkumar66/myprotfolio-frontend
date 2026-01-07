import axios from "axios";

/**
 * Base API instance
 * Works for local + production
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
});

/**
 * Automatically attach JWT token
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   SUMMARY APIs
====================== */
export const getSummary = () => api.get("/summary");

export const createSummary = (data) =>
  api.post("/admin/summary", data);

export const deleteSummary = (id) =>
  api.delete(`/admin/summary/${id}`);

/* ======================
   SKILLS APIs
====================== */
export const getSkills = () => api.get("/skills");

export const createSkill = (data) =>
  api.post("/admin/skills", data);

export const deleteSkill = (id) =>
  api.delete(`/admin/skills/${id}`);

/* ======================
   PROFILE APIs
====================== */
export const getProfile = () => api.get("/profile");

export const createProfile = (data) =>
  api.post("/admin/profile", data);

/* ======================
   PROJECT APIs
====================== */
export const getProjects = () => api.get("/projects");

export const createProject = (data) =>
  api.post("/admin/projects", data);

export const deleteProject = (id) =>
  api.delete(`/admin/projects/${id}`);

/* ======================
   AUTH APIs 
====================== */
export const loginUser = (data) =>
  api.post("/login", data);

export const signupUser = (data) =>
  api.post("/signup", data);

export default api;
