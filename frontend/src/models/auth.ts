import { apiClient } from "../lib/client";

export const login = async (employeeId: string): Promise<void> => {
  const response = await apiClient.post("login", { employeeId });

  if (response.token) {
    localStorage.setItem("user", response.token);
    return response;
  } else {
    throw new Error("Login failed");
  }
};
