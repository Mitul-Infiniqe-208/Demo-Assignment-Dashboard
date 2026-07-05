import { GetEmployeesParams } from "@/types/employees";

export const queryKeys = {
  profile: {
    me: () => ["profile", "me"] as const,
  },
  employees: {
    all: () => ["employees"] as const,
    list: (params: GetEmployeesParams) => ["employees", "list", params] as const,
  },
};
