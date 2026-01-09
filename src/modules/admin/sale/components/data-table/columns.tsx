"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { SaleEntity } from "../../interfaces";
import { ShowSaleDetails } from "./show-details";

export const saleColumns: ColumnDef<SaleEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orden" />
    ),
    cell: ({ row }) => `#${row.original.order.id}`,
  },
  {
    id: "client",
    header: "Cliente",
    cell: ({ row }) => row.original.order.client || "Sin cliente",
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    id: "voucher",
    header: "Comprobante",
    cell: ({ row }) => row.original.voucher.numeration || "Pendiente",
  },
  {
    id: "created_at",
    header: "Fecha",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("es-ES"),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ShowSaleDetails sale={row.original} />,
  },
];
