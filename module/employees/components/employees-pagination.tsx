import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EmployeesPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

type PageToken = number | "ellipsis";

const MAX_VISIBLE_PAGES = 8;

function buildPages(currentPage: number, totalPages: number): PageToken[] {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageToken[] = [];
  const slots = MAX_VISIBLE_PAGES - 2;

  let start = currentPage - Math.floor(slots / 2);
  let end = currentPage + Math.floor(slots / 2);

  if (start < 2) {
    start = 2;
    end = start + slots - 1;
  }

  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - slots + 1;
  }

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

function goToPage(event: React.MouseEvent, page: number, onPageChange: (page: number) => void) {
  event.preventDefault();
  onPageChange(page);
}

export default function EmployeesPagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: EmployeesPaginationProps) {
  if (totalPages <= 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const pages = buildPages(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {total} employees
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => goToPage(event, currentPage - 1, onPageChange)}
            />
          </PaginationItem>

          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(event) => goToPage(event, page, onPageChange)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => goToPage(event, currentPage + 1, onPageChange)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
