"use client";

import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ColumnDef } from "@tanstack/react-table";
import { SaleEntity } from "../../interfaces";
import { ShowSalesDetails } from "./show-details";

export const salesColumns: ColumnDef<SaleEntity>[] = [
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
    accessorKey: "voucher",
    header: "Comprobante",
  },
  {
    accessorKey: "sale_type",
    header: "Tipo de venta",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <ShowSalesDetails sale={row.original} />,
  },
];
