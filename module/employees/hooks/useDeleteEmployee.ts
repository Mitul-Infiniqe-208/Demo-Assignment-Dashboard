import { queryKeys } from "@/constants/query-keys";
import { deleteEmployee } from "@/services/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (response) => {
      if (response?.status) {
        toast.success("Employee Deleted", {
          description: response.message || "Employee deleted successfully.",
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.employees.all() });
      } else {
        toast.error("Failed to Delete Employee", {
          description: response?.message || "Please try again.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error While Deleting Employee", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  return {
    deleteEmployee: mutateAsync,
    isDeleting: isPending,
  };
};
