"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { FormOfPaymentEntity } from "../../../interfaces";
import { FormOfPaymentRowActions } from "../row-actions/form-of-payment-row-actions";

export const formOfPaymentsColumns: ColumnDef<FormOfPaymentEntity>[] = [
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
    cell: ({ row }) => <FormOfPaymentRowActions formOfPayment={row.original} />,
  },
];
