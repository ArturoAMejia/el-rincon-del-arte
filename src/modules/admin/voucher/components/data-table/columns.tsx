"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { VoucherEntity } from "../../interfaces";
import { ShowVoucherDetails } from "./show-details";

export const voucherColumns: ColumnDef<VoucherEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
  },
  {
    accessorKey: "currency",
    header: "Moneda",
  },
  {
    accessorKey: "form_of_payment",
    header: "Forma de pago",
  },
  {
    accessorKey: "serie",
    header: "Serie",
  },
  {
    id: "sales_count",
    header: "Ventas",
    cell: ({ row }) => row.original.sales.length,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <ShowVoucherDetails voucher={row.original} />,
  },
];
