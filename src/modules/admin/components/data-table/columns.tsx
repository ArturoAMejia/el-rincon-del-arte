"use client"

import { DataTableColumnHeader } from "@/shared/components/data-table/column"
import { DataTableRowActions } from "@/shared/components/data-table/row-actions"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onAction={(action, row) => {
          console.log(action, row)
        }}
      />
    ),
  },
]

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]
