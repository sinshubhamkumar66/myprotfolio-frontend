import api from "./api";

/**
 * Login user
 * @param { username, password }
 */
export const login = (data) => {
  return api.post("/login", data);
};

/**
 * Signup user
 * @param { username, password }
 */
export const signup = (data) => {
  return api.post("/signup", data);
};
