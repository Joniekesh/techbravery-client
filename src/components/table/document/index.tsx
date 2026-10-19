import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

export interface DocumentProp {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url?: string;
  category: "Specification" | "Design" | "Deliverable";
}

export const documentColumns: ColumnDef<DocumentProp>[] = [
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
    id: "file",
    accessorFn: (row) => `${row.id ?? ""}`,
    header: "File",

    cell: ({ row }) => (
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{row.original.name}</span>
      </div>
    ),
  },

  {
    accessorKey: "type",
    accessorFn: (row) => row.type ?? "",
    header: "Type",
    cell: ({ row }) => <span>{row.original.type ?? ""}</span>,
  },

  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <span>{row.original.size}</span>,
  },

  {
    accessorKey: "uploadedAt",
    header: "Uploaded",
    size: 160,
    minSize: 160,
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {new Date(row.original.uploadedAt).toLocaleDateString()}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const doc = row.original;

      return (
        <div className="flex gap-2">
          {doc.url ? (
            <Button size="sm" variant="outline" asChild>
              <a href={doc.url} download={doc.name}>
                <Download className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
