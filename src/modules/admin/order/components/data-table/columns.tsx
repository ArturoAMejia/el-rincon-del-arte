"use client";

import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ColumnDef } from "@tanstack/react-table";
import { OrderEntity } from "../../interfaces";
import { ShowOrderDetails } from "./show-details";

export const orderColumns: ColumnDef<OrderEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "form_of_payment",
    header: "Forma de pago",
  },
  {
    accessorKey: "currency",
    header: "Moneda",
  },
  {
    accessorKey: "order_type",
    header: "Tipo de orden",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <ShowOrderDetails order={row.original} />,
  },
];
