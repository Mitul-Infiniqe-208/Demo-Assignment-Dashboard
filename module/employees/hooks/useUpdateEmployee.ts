import { queryKeys } from "@/constants/query-keys";
import { updateEmployee } from "@/services/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: (response) => {
      if (response?.status) {
        toast.success("Employee Updated", {
          description: response.message || "Employee updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.employees.all() });
      } else {
        toast.error("Failed to Update Employee", {
          description: response?.message || "Please try again.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error While Updating Employee", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  return {
    updateEmployee: mutateAsync,
    isUpdating: isPending,
  };
};
