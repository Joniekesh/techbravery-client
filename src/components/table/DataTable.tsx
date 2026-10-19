import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  Table as TanStackTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];

  pageCount?: number;
  manualPagination?: boolean;

  isLoading?: boolean;

  /**
   * Optional component rendered above the table.
   *
   * It receives the TanStack table instance, allowing
   * filters/search/column visibility to control this table.
   */
  renderToolbar?: (table: TanStackTable<TData>) => React.ReactNode;

  /**
   * Columns that should appear in the mobile card.
   *
   * Example:
   * mobileColumns={["fullName", "company", "status", "createdAt", "actions"]}
   */
  mobileColumns?: string[];

  /**
   * Number of fields to show in the mobile card.
   * Used when mobileColumns is not provided.
   */
  mobileColumnLimit?: number;

  /**
   * Whether to show column visibility controls.
   */
  enableColumnVisibility?: boolean;

  /**
   * Whether to show pagination.
   */
  enablePagination?: boolean;

  /**
   * Optional custom mobile card renderer.
   *
   * This is useful when you eventually want complete control
   * over the mobile design for a particular table.
   */
  renderMobileCard?: (
    row: Row<TData>,
    table: TanStackTable<TData>,
  ) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  manualPagination = false,
  isLoading = false,

  renderToolbar,

  mobileColumns,
  mobileColumnLimit = 5,

  enableColumnVisibility = true,
  enablePagination = true,

  renderMobileCard,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount,

    state: {
      sorting,
      globalFilter,
      pagination,
      columnVisibility,
      rowSelection,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    manualPagination,
    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  /**
   * Columns that are visible and can actually be rendered.
   */
  const visibleColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getIsVisible());

  /**
   * Columns to show on mobile.
   *
   * Priority:
   * 1. Explicit mobileColumns
   * 2. First mobileColumnLimit visible columns
   */
  const mobileVisibleColumns = mobileColumns
    ? visibleColumns.filter((column) => mobileColumns.includes(column.id))
    : visibleColumns.slice(0, mobileColumnLimit);

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      {renderToolbar && renderToolbar(table)}

      {/* Desktop / Tablet */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length}
                    className="h-32 text-center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length}
                    className="h-32 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            /**
             * Allow a completely custom card.
             */
            if (renderMobileCard) {
              return <div key={row.id}>{renderMobileCard(row, table)}</div>;
            }

            return (
              <div
                key={row.id}
                className="rounded-lg border bg-card p-4 shadow-sm"
              >
                <div className="space-y-3">
                  {mobileVisibleColumns.map((column) => {
                    const cell = row
                      .getVisibleCells()
                      .find((cell) => cell.column.id === column.id);

                    if (!cell) return null;

                    /**
                     * Get a readable column label.
                     */
                    const header = column.columnDef.header;

                    let label = column.id;

                    if (typeof header === "string") {
                      label = header;
                    }

                    /**
                     * Don't show labels for select/actions.
                     */
                    const hideLabel =
                      column.id === "select" || column.id === "actions";

                    return (
                      <div
                        key={cell.id}
                        className={
                          hideLabel
                            ? "flex items-center justify-between"
                            : "flex items-start justify-between gap-4"
                        }
                      >
                        {!hideLabel && (
                          <span className="min-w-24 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {label}
                          </span>
                        )}

                        <div
                          className={
                            hideLabel ? "w-full" : "min-w-0 flex-1 text-right"
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
            No results.
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
