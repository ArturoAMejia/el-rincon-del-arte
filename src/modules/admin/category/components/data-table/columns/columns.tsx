"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { CategoryEntity } from "../../../interfaces";
import { CategoryRowActions } from "../row-actions/category-row-actions";

export const categoriesColumns: ColumnDef<CategoryEntity>[] = [
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
    cell: ({ row }) => <CategoryRowActions category={row.original} />,
  },
];
