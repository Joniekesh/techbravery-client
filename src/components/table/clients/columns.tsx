import type { ColumnDef } from "@tanstack/react-table";
import { IQuote, QuoteBudgetRange } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { IStaff, IUserProfile } from "@/types/profile";

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

export const clientColumns: ColumnDef<IUserProfile>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => {
  //     const isAllSelected = table.getIsAllPageRowsSelected();
  //     const isSomeSelected = table.getIsSomePageRowsSelected();

  //     const checked: boolean | "indeterminate" = isAllSelected
  //       ? true
  //       : isSomeSelected
  //         ? "indeterminate"
  //         : false;

  //     return (
  //       <Checkbox
  //         checked={checked}
  //         onCheckedChange={(value) =>
  //           table.toggleAllPageRowsSelected(value === true)
  //         }
  //         aria-label="Select all"
  //       />
  //     );
  //   },

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
    accessorKey: "fullName",
    header: "Client",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="font-medium">
          {row?.original?.firstName + " " + row?.original?.lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {row?.original?.company?.companyName}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="text-muted-foreground">Projects</p>
        <p className="font-medium">{row.original.projects?.length}</p>
      </div>
    ),
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => (
      <div>
        <p className="text-muted-foreground">Value</p>
        <p className="font-medium">
          {row.original?.projects?.reduce(
            (acc, project) => acc + (project?.amountSpent ?? 0),
            0,
          )}
        </p>
      </div>
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
    accessorKey: "createdAt",
    size: 160,
    minSize: 160,
    header: "Date",
    cell: ({ row }) => (
      <span className="">
        {new Date(row.original.createdAt).toDateString()!}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild title="View Details">
            <Link to={`/admin-dashboard/clients/${client.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-green-600 hover:bg-green-50"
            // onClick={() => handleQuoteAction(quote, "ACCEPT")}
            title="Approve Quote"
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            // onClick={() => handleDeleteQuote(quote)}
            title="Delete Client"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => (
  //       <Button size="sm" variant="outline" asChild>
  //         <Link to={`/admin-dashboard/quote/${row.original.id}`}>
  //           <Eye className="w-4 h-4" />
  //         </Link>
  //       </Button>
  //     ),
  //   },
];

export const staffColumns = (
  onDelete: (id: string) => void,
): ColumnDef<IUserProfile>[] => [
  {
    id: "select",
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected();
      const isSomeSelected = table.getIsSomePageRowsSelected();

      const checked: boolean | "indeterminate" = isAllSelected
        ? true
        : isSomeSelected
          ? "indeterminate"
          : false;

      return (
        <Checkbox
          checked={checked}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(value === true)
          }
          aria-label="Select all"
        />
      );
    },

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
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="font-medium">
          {row?.original?.firstName + " " + row?.original?.lastName}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="font-medium">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <span>{row.original.subDepartment?.employeeDepartment?.name}</span>
    ),
  },
  {
    accessorKey: "subDepartment",
    header: "Sub Department",
    cell: ({ row }) => <span>{row.original.subDepartment?.name}</span>,
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
    size: 160,
    minSize: 160,
    header: "Date",
    cell: ({ row }) => (
      <span className="">
        {new Date(row.original.createdAt).toDateString()!}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild title="View Details">
            <Link to={`/admin-dashboard/clients/${client.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            onClick={() => onDelete(client.id)}
            title="Delete Staff"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => (
  //       <Button size="sm" variant="outline" asChild>
  //         <Link to={`/admin-dashboard/quote/${row.original.id}`}>
  //           <Eye className="w-4 h-4" />
  //         </Link>
  //       </Button>
  //     ),
  //   },
];
