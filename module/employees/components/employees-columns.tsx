import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/types/employees";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

function getInitials(employee: Employee) {
  return `${employee.firstName?.[0] ?? ""}${employee.lastName?.[0] ?? ""}`.toUpperCase();
}

interface GetEmployeesColumnsParams {
  onToggleStatus: (id: string) => void;
  togglingId?: string;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const getEmployeesColumns = ({
  onToggleStatus,
  togglingId,
  onEdit,
  onDelete,
}: GetEmployeesColumnsParams): ColumnDef<Employee>[] => [
  {
    accessorKey: "fullName",
    header: "Employee",
    enableSorting: true,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            {employee.image ? <AvatarImage src={employee.image} alt={employee.fullName} /> : null}
            <AvatarFallback>{getInitials(employee)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{employee.fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactNo",
    header: "Contact",
    enableSorting: true,
    cell: ({ row }) => row.original.contactNo,
  },
  {
    id: "role",
    header: "Role",
    enableSorting: false,
    accessorFn: (row) => row.authorizedDealerEmployeeRole?.name,
    cell: ({ row }) => row.original.authorizedDealerEmployeeRole?.name ?? "—",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const employee = row.original;
      const isToggling = togglingId === employee.id;
      return (
        <button
          type="button"
          onClick={() => onToggleStatus(employee.id)}
          disabled={isToggling}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Badge
            variant={employee.isActive ? "default" : "outline"}
            className="w-20 justify-center"
          >
            {isToggling ? "Updating…" : employee.isActive ? "Active" : "Inactive"}
          </Badge>
        </button>
      );
    },
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="cursor-pointer">
              <MoreVertical />
              <span className="sr-only">Open actions menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(employee)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(employee)}>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
