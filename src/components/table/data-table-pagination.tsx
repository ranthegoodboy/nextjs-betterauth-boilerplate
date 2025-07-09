import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [rows, setRows] = useQueryState("rows", { defaultValue: "10" });

  useEffect(() => {
    const pageNum = parseInt(page);
    const rowsNum = parseInt(rows);

    if (!isNaN(pageNum) && pageNum > 0) {
      table.setPageIndex(pageNum - 1);
    }

    if (!isNaN(rowsNum) && [10, 20, 30, 40, 50].includes(rowsNum)) {
      table.setPageSize(rowsNum);
    }
  }, [page, rows, table]);

  // Update URL when table pagination changes
  const handlePageChange = async (newPage: number) => {
    await setPage(newPage.toString());
    table.setPageIndex(newPage - 1);
  };

  const handleRowsChange = async (newRows: string) => {
    await setRows(newRows);
    table.setPageSize(parseInt(newRows));
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={rows} onValueChange={handleRowsChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rows} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              handlePageChange(table.getState().pagination.pageIndex)
            }
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              handlePageChange(table.getState().pagination.pageIndex + 2)
            }
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(table.getPageCount())}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
