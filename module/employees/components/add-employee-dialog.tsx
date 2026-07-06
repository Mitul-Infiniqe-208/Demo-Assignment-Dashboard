"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/types/employees";
import { useAddEmployee } from "../hooks/useAddEmployee";
import { useEmployeeRoles } from "../hooks/useEmployeeRoles";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import {
  createEmployeeSchema,
  type CreateEmployeeSchema,
} from "../schema/create-employee-schema";

const OPTIONAL_FIELDS: {
  name: keyof CreateEmployeeSchema;
  label: string;
}[] = [
  { name: "email", label: "Email" },
  { name: "address", label: "Address" },
  { name: "city", label: "City" },
  { name: "area", label: "Area" },
  { name: "state", label: "State" },
  { name: "country", label: "Country" },
  { name: "pinCode", label: "Pin Code" },
];

const EMPTY_FORM_VALUES = {
  firstName: "",
  lastName: "",
  contactNo: "",
  authorizedDealerEmployeeRoleId: "",
  email: "",
  address: "",
  pinCode: "",
  state: "",
  city: "",
  area: "",
  country: "",
};

function mapEmployeeToFormValues(employee: Employee) {
  return {
    firstName: employee.firstName ?? "",
    lastName: employee.lastName ?? "",
    contactNo: employee.contactNo ?? "",
    authorizedDealerEmployeeRoleId:
      employee.authorizedDealerEmployeeRoleId ?? employee.authorizedDealerEmployeeRole?.id ?? "",
    email: employee.email ?? "",
    address: employee.address ?? "",
    pinCode: employee.pinCode ?? "",
    state: employee.state ?? "",
    city: employee.city ?? "",
    area: employee.area ?? "",
    country: employee.country ?? "",
  };
}

interface AddEmployeeDialogProps {
  mode?: "add" | "edit";
  employee?: Employee | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddEmployeeDialog({
  mode = "add",
  employee = null,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: AddEmployeeDialogProps = {}) {
  const isEdit = mode === "edit";
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isEdit ? (openProp ?? false) : internalOpen;
  const setOpen = isEdit ? (onOpenChangeProp ?? (() => {})) : setInternalOpen;

  const { roles } = useEmployeeRoles();
  const { addEmployee, isAdding } = useAddEmployee();
  const { updateEmployee, isUpdating } = useUpdateEmployee();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  useEffect(() => {
    if (isEdit && open && employee) {
      reset(mapEmployeeToFormValues(employee));
    }
  }, [isEdit, open, employee, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (isEdit && employee) {
        await updateEmployee({ id: employee.id, payload: values });
      } else {
        await addEmployee(values);
      }
      reset();
      setOpen(false);
    } catch {
      // error toast already handled in useAddEmployee / useUpdateEmployee
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      {!isEdit && (
        <DialogTrigger asChild>
          <Button
            size="icon-lg"
            className="fixed right-6 bottom-6 rounded-full shadow-lg"
          >
            <Plus />
            <span className="sr-only">Add Employee</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Employee" : "Add Employee"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col overflow-hidden">
          <FieldGroup className="flex-1 overflow-y-auto px-1 py-1">
            <Field data-invalid={!!errors.firstName}>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input id="firstName" aria-invalid={!!errors.firstName} {...register("firstName")} />
              <FieldError errors={errors.firstName ? [errors.firstName] : undefined} />
            </Field>

            <Field data-invalid={!!errors.lastName}>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input id="lastName" aria-invalid={!!errors.lastName} {...register("lastName")} />
              <FieldError errors={errors.lastName ? [errors.lastName] : undefined} />
            </Field>

            <Field data-invalid={!!errors.contactNo}>
              <FieldLabel htmlFor="contactNo">Contact No</FieldLabel>
              <Input id="contactNo" aria-invalid={!!errors.contactNo} {...register("contactNo")} />
              <FieldError errors={errors.contactNo ? [errors.contactNo] : undefined} />
            </Field>

            <Field data-invalid={!!errors.authorizedDealerEmployeeRoleId}>
              <FieldLabel htmlFor="authorizedDealerEmployeeRoleId">Role</FieldLabel>
              <Controller
                control={control}
                name="authorizedDealerEmployeeRoleId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="authorizedDealerEmployeeRoleId"
                      className="w-full"
                      aria-invalid={!!errors.authorizedDealerEmployeeRoleId}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                errors={
                  errors.authorizedDealerEmployeeRoleId
                    ? [errors.authorizedDealerEmployeeRoleId]
                    : undefined
                }
              />
            </Field>

            {OPTIONAL_FIELDS.map(({ name, label }) => (
              <Field key={name} data-invalid={!!errors[name]}>
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <Input id={name} aria-invalid={!!errors[name]} {...register(name)} />
                <FieldError errors={errors[name] ? [errors[name]] : undefined} />
              </Field>
            ))}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isEdit ? isUpdating : isAdding}>
              {isEdit
                ? isUpdating
                  ? "Saving..."
                  : "Save Changes"
                : isAdding
                  ? "Adding..."
                  : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
