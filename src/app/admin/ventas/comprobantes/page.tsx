import { getVouchersAction } from "@/modules/admin/voucher";
import { voucherColumns } from "@/modules/admin/voucher/components/data-table";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

export default async function VouchersPage() {
  const vouchers = await getVouchersAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comprobantes</h1>
          <p>Consulta los comprobantes generados por ventas. (Solo lectura)</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable columns={voucherColumns} data={vouchers.data || []} />
      </Suspense>
    </section>
  );
}
