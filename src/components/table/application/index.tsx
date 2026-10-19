import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Power, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ApplicationStatusBadge } from "@/components/admin/application/ApplicationStatusBadge";
import type { Application } from "@/types/application";

const formatMoney = (value: number | string | null | undefined) => {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return "$0";
  }

  return `$${amount.toLocaleString("en-US")}`;
};

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const formatStage = (stage: string | null | undefined) => {
  if (!stage) return "—";

  return stage
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const applicationColumns: ColumnDef<Application>[] = [
  //   {
  //     id: "select",

  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected()
  //             ? true
  //             : table.getIsSomePageRowsSelected()
  //               ? "indeterminate"
  //               : false
  //         }
  //         onCheckedChange={(value) =>
  //           table.toggleAllPageRowsSelected(value === true)
  //         }
  //         aria-label="Select all"
  //       />
  //     ),

  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(value === true)}
  //         aria-label="Select row"
  //       />
  //     ),

  //     enableSorting: false,
  //     enableHiding: false,
  //   },

  {
    id: "application",

    accessorFn: (row) => `${row.title ?? ""}`,

    header: "Application",

    cell: ({ row }) => {
      const application = row.original;

      return (
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
            {application.thumbNail ? (
              <img
                src={application.thumbNail.url}
                alt={application.title ?? "Application"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                {(application.title ?? "AP").slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold">
              {application.title ?? "Untitled application"}
            </p>

            <p className="max-w-[230px] truncate text-xs text-muted-foreground">
              {application.slug ?? "—"}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (
      <ApplicationStatusBadge
        status={row.original.status}
        isLive={row.original.isLive}
      />
    ),
  },

  {
    accessorKey: "investmentStage",

    header: "Stage",

    cell: ({ row }) => (
      <span className="text-sm">
        {formatStage(row.original.investmentStage)}
      </span>
    ),
  },

  {
    accessorKey: "activeUsers",

    header: "Users",

    cell: ({ row }) => (
      <span>
        {Number(row.original.activeUsers ?? 0).toLocaleString("en-US")}
      </span>
    ),
  },

  {
    accessorKey: "monthlyVolume",

    header: "Volume",

    cell: ({ row }) => <span>{formatMoney(row.original.monthlyVolume)}</span>,
  },

  {
    accessorKey: "updatedAt",

    header: "Updated",

    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDate(row.original.updatedAt)}
      </span>
    ),
  },

  {
    id: "actions",

    header: "Actions",

    enableHiding: false,
    enableSorting: false,

    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem asChild>
              <Link to={`/admin-dashboard/applications/${application.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={`/admin-dashboard/applications/${application.id}/edit`}>
                <Power className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Power className="mr-2 h-4 w-4" />
              {application.isLive ? "Unpublish" : "Publish"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
