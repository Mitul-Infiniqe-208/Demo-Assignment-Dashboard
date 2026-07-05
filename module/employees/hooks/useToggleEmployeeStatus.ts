import { queryKeys } from "@/constants/query-keys";
import { toggleEmployeeActiveInactive } from "@/services/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleEmployeeStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: toggleEmployeeActiveInactive,
    onSuccess: (response) => {
      if (response?.status) {
        toast.success(
          response.data.employee.isActive ? "Employee Activated" : "Employee Deactivated",
          { description: response.message || "Employee status updated." },
        );
        queryClient.invalidateQueries({ queryKey: queryKeys.employees.all() });
      } else {
        toast.error("Failed to Update Status", {
          description: response?.message || "Please try again.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error While Updating Status", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  return {
    toggleEmployeeStatus: mutate,
    isToggling: isPending,
    togglingId: isPending ? variables : undefined,
  };
};
