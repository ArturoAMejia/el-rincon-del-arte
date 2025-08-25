import {
  columns,
  payments,
} from "@/modules/admin/components/data-table/columns"
import { DataTable } from "@/shared/components"
import React from "react"

export default function ArtworkPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Obras de Arte</h1>
      golaa
      <p>aas</p>
      <DataTable columns={columns} data={payments} />
    </section>
  )
}
