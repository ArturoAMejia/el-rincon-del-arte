import { getOrdersWithoutSaleAction } from "@/modules/admin/order/actions";
import { getSalesAction } from "@/modules/admin/sale/actions";
import { saleColumns } from "@/modules/admin/sale/components/data-table/columns";
import { CreateSaleForm } from "@/modules/admin/sale/components/form/create-sale-form";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

const VentasPage = async () => {
  const [orders, sales] = await Promise.all([
    getOrdersWithoutSaleAction(),
    getSalesAction(),
  ]);

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ventas</h1>
          <p>Administra las ventas de obras de arte de la plataforma.</p>
        </div>
        <CreateSaleForm orders={orders?.data || []} />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable columns={saleColumns} data={sales?.data || []} />
      </Suspense>
    </section>
  );
};

export default VentasPage;
