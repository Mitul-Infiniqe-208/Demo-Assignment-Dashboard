"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Employee } from "@/types/employees";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

interface DeleteEmployeeDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteEmployeeDialog({
  employee,
  open,
  onOpenChange,
}: DeleteEmployeeDialogProps) {
  const { deleteEmployee, isDeleting } = useDeleteEmployee();

  const handleDelete = async () => {
    if (!employee) return;
    try {
      await deleteEmployee(employee.id);
      onOpenChange(false);
    } catch {
      // error toast already handled in useDeleteEmployee
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Employee</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {employee?.fullName ?? "this employee"}? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
