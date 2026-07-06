import { queryKeys } from "@/constants/query-keys";
import { getEmployeeRoles } from "@/services/employees";
import { useQuery } from "@tanstack/react-query";

export const useEmployeeRoles = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.employeeRoles.all(),
    queryFn: ({ signal }) => getEmployeeRoles(undefined, signal),
  });

  return {
    roles: data?.data?.roles ?? [],
    isLoading,
  };
};
