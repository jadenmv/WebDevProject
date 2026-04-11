import { apiClient } from "./client";

export async function authenticateUser({ isLogin, email, password, username }) {
  const endpoint = isLogin ? "/api/users/login" : "/api/users/register";
  const payload = isLogin ? { email, password } : { username, email, password }
  
  try {
    const response = await apiClient.post(endpoint, payload)

    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message || "Something went wrong")
    }

    throw new Error("Cannot connect to server")
  }



}
