import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { apiClient } from "../lib/client";

export enum CurrencyId {
  USD = "USD",
  ARS = "ARS",
}

export enum Currency {
  USD = "Dollar",
  ARS = "Peso Argentino",
}

export enum QUERY_KEYS {
  BALANCE = "balance",
  WAGES = "wages",
}

export interface Wage {
  amount: number;
  currency: Currency;
  currencyId: CurrencyId;
}

export interface Balance {
  amount: number;
  currency: Currency;
  currencyId: CurrencyId;
}

interface WagesResponse {
  wages: Wage[];
}

interface BalancesResponse {
  balances: Balance[];
}

export const useBalance = (): UseQueryResult<BalancesResponse, unknown> => {
  return useQuery<BalancesResponse, unknown>(QUERY_KEYS.BALANCE, () =>
    apiClient.get("balance")
  );
};

export const useWages = (): UseQueryResult<WagesResponse, unknown> => {
  return useQuery<WagesResponse, unknown>(QUERY_KEYS.WAGES, () =>
    apiClient.get("wages")
  );
};

export const useSubmitWageRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { amount: number; currencyId: string }) =>
      apiClient.post("wages/access", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEYS.WAGES);
        queryClient.invalidateQueries(QUERY_KEYS.BALANCE);
      },
    }
  );
};
