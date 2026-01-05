import { getArtworksAction } from "@/modules/admin";
import { getClientsAction } from "@/modules/admin/client";
import { getCurrenciesAction } from "@/modules/admin/currency";
import { getFormOfPaymentsAction } from "@/modules/admin/form-of-payment";
import { getSalesAction } from "@/modules/admin/sales/actions";
import { salesColumns } from "@/modules/admin/sales/components/data-table/columns";
import { CreateSaleForm } from "@/modules/admin/sales/components/form/create-sale-form";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

const VentasPage = async () => {
  const sales = await getSalesAction();
  const artworks = await getArtworksAction();
  const clients = await getClientsAction();
  const currencies = await getCurrenciesAction();
  const formOfPayments = await getFormOfPaymentsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ventas</h1>
          <p>Administra las ventas de obras de arte de la plataforma.</p>
        </div>
        <CreateSaleForm
          artworks={artworks?.data || []}
          clients={clients?.data || []}
          currencies={currencies?.data || []}
          formOfPayments={formOfPayments?.data || []}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable columns={salesColumns} data={sales?.data} />
      </Suspense>
    </section>
  );
};

export default VentasPage;
