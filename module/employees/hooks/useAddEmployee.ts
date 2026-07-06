import { queryKeys } from "@/constants/query-keys";
import { createEmployee } from "@/services/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEmployee,
    onSuccess: (response) => {
      if (response?.status) {
        toast.success("Employee Added", {
          description: response.message || "Employee created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.employees.all() });
      } else {
        toast.error("Failed to Add Employee", {
          description: response?.message || "Please try again.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error While Adding Employee", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  return {
    addEmployee: mutateAsync,
    isAdding: isPending,
  };
};
