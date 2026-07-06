import * as yup from "yup";

export const createEmployeeSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  contactNo: yup.string().trim().required("Contact number is required"),
  authorizedDealerEmployeeRoleId: yup.string().required("Role is required"),
  email: yup.string().trim().email("Enter a valid email address"),
  address: yup.string().trim(),
  pinCode: yup.string().trim(),
  state: yup.string().trim(),
  city: yup.string().trim(),
  area: yup.string().trim(),
  country: yup.string().trim(),
});

export type CreateEmployeeSchema = yup.InferType<typeof createEmployeeSchema>;
