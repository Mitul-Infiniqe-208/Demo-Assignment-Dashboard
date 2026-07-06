"use client";

import { FlexCol } from "@/components/common/flex-col";
import { useDebounce } from "@/hooks/use-debounce";
import { GetEmployeesParams } from "@/types/employees";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import AddEmployeeDialog from "./components/add-employee-dialog";
import EmployeesPagination from "./components/employees-pagination";
import EmployeesSearch from "./components/employees-search";
import EmployeesTable from "./components/employees-table";
import { useEmployees } from "./hooks/useEmployees";

const EMPLOYEES_PAGE_SIZE = 10;

export default function Employees() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleSortingChange: OnChangeFn<SortingState> = useCallback((updater) => {
    setSorting(updater);
    setCurrentPage(1);
  }, []);

  const params: GetEmployeesParams = useMemo(() => {
    const sort = sorting[0];
    return {
      offset: (currentPage - 1) * EMPLOYEES_PAGE_SIZE,
      limit: EMPLOYEES_PAGE_SIZE,
      searchText: debouncedSearch || undefined,
      sortBy: sort?.id,
      sortOrder: sort ? (sort.desc ? "DESC" : "ASC") : undefined,
    };
  }, [currentPage, debouncedSearch, sorting]);

  const { employees, total, totalPages, isLoading } = useEmployees(params);

  return (
    <FlexCol gap={6}>
      <h1 className="text-2xl font-semibold">Employees</h1>

      <EmployeesSearch value={search} onChange={handleSearchChange} />

      <EmployeesTable
        data={employees}
        isLoading={isLoading}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />

      {total > EMPLOYEES_PAGE_SIZE ? (
        <EmployeesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          pageSize={EMPLOYEES_PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      ) : null}

      <AddEmployeeDialog />
    </FlexCol>
  );
}
