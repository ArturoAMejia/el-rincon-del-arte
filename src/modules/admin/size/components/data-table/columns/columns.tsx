"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";

import { SizeEntity } from "@/modules/admin/size/interfaces";
import { SizeRowActions } from "../row-actions/size-row-actions";

export const sizesColumns: ColumnDef<SizeEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <SizeRowActions size={row.original} />,
  },
];
