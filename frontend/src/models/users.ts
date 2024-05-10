import { useQuery, UseQueryResult } from "react-query";
import { apiClient } from "../lib/client";

interface User {
  employeeId: string;
}

interface EmployeesResponse {
  employeesIds: User[];
}

export enum QUERY_KEYS {
  USERS = "users",
}

export const useUsers = (): UseQueryResult<EmployeesResponse, unknown> => {
  return useQuery<EmployeesResponse, unknown>(QUERY_KEYS.USERS, () =>
    apiClient.get("users")
  );
};
