import { queryKeys } from "@/constants/query-keys";
import { getEmployees } from "@/services/employees";
import { GetEmployeesParams } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = (params: GetEmployeesParams) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn: ({ signal }) => getEmployees(params, signal),
  });

  return {
    employees: data?.data?.employees ?? [],
    total: data?.meta?.total ?? 0,
    totalPages: data?.meta?.totalPages ?? 0,
    isLoading,
    refetch,
  };
};
