import type { ColumnDef } from "@tanstack/react-table";
import { IQuote, QuoteBudgetRange } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/utils/formatCurrency";

const getBudgetRange = (budGetRange: string) => {
  switch (budGetRange) {
    case QuoteBudgetRange.FIVE_TO_15K:
      return <span>$5k-15k</span>;
    case QuoteBudgetRange.FITEEN_TO_30K:
      return <span>$15k-30k</span>;
    case QuoteBudgetRange.THIRTY_TO_50K:
      return <span>$30k-50k</span>;
    case QuoteBudgetRange.FIFTYK_PLUS:
      return <span>$50k+</span>;
    default:
      return <span>$5-15k</span>;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "PENDING":
    case "SUBMITTED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "ACCEPTED":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
    case "ON_HOLD":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    case "PAID":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "EXPIRED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "DECLINED":
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export interface InvoiceProp {
  id: number;
  invoiceId: string;
  amount: number;
  project: string;
  status: string;
  date: string;
  dueDate: string;
}

export const invoiceColumns: ColumnDef<InvoiceProp>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomePageRowsSelected()
  //             ? "indeterminate"
  //             : false
  //       }
  //       onCheckedChange={(value) =>
  //         table.toggleAllPageRowsSelected(value === true)
  //       }
  //       aria-label="Select all"
  //     />
  //   ),

  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),

  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "invoiceId",
    accessorFn: (row) => `${row.invoiceId ?? ""}`,
    header: "Invoice Id",

    cell: ({ row }) => (
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{row.original.invoiceId}</span>
      </div>
    ),
  },

  {
    accessorKey: "amount",
    accessorFn: (row) => row.amount ?? "0",
    header: "Amount ($) ",
    cell: ({ row }) => (
      <span>{formatCurrency(row.original.amount) ?? "0.00"}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },

  {
    accessorKey: "date",
    header: "Issue Date",
    size: 160,
    minSize: 160,
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {new Date(row.original.date).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "dueDate",

    header: "Due Date",

    size: 160,
    minSize: 160,

    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {new Date(row.original.dueDate).toLocaleDateString()}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const quote = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4" />
          </Button>
          {row.original.status === "pending" && (
            <Button size="sm" asChild>
              <Link to={`/client-dashboard/invoices/${row.original.id}/pay`}>
                Pay Now
              </Link>
            </Button>
          )}
        </div>
      );
    },
  },
];

export const clientQuoteColumns: ColumnDef<IQuote>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(value === true)
        }
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "client",
    accessorFn: (row) => `${row.fullName ?? ""} ${row.company ?? ""}`,
    header: "Client",
    cell: ({ row }) => (
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{row.original.fullName}</span>

        <span className="truncate text-sm text-muted-foreground">
          {row.original.company}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "projectType",
    accessorFn: (row) => row.projectType?.label ?? "",
    header: "Project Type",
    cell: ({ row }) => <span>{row.original.projectType?.label ?? "—"}</span>,
  },

  {
    accessorKey: "budgetRange",
    header: "Budget",
    cell: ({ row }) => getBudgetRange(String(row.original.budgetRange)),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    size: 160,
    minSize: 160,
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const quote = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild title="View Details">
            <Link to={`/client-dashboard/quotes/${quote.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-green-600 hover:bg-green-50"
            title="Approve Quote"
          >
            <CheckCircle className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            title="Delete Quote"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
