import { Employee } from "./employee";

export interface IUserRole {
  name: string;
  slug: string;
}

export interface ISalePerson {
  firstName: string;
  lastName: string;
  contactNo: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;

  role: IUserRole;

  companyName: string;
  gstNo: string;
  pinCode: string;
  city: string;
  state: string;
  address: string;

  image: string | null;

  isAuthorizedDealer: boolean;
  salePersonId: string;
  referenceCode: string;

  salePerson: ISalePerson;

  authorizedDealerEmployee: Employee | null;
}

export interface MeResponse {
  user: IUser;
  isEmployeeLogin: boolean;
}
