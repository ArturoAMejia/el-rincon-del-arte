import { getArtworksAction } from "@/modules/admin";
import { getClientsAction } from "@/modules/admin/client";
import { getCurrenciesAction } from "@/modules/admin/currency";
import { getFormOfPaymentsAction } from "@/modules/admin/form-of-payment";
import { getOrdersAction } from "@/modules/admin/order/actions";
import { orderColumns } from "@/modules/admin/order/components/data-table/columns";
import { CreateOrderForm } from "@/modules/admin/order/components/form/create-order-form";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

const OrderPage = async () => {
  const orders = await getOrdersAction();
  const artworks = await getArtworksAction();
  const clients = await getClientsAction();
  const currencies = await getCurrenciesAction();
  const formOfPayments = await getFormOfPaymentsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Órdenes</h1>
          <p>Administra las órdenes de obras de arte de la plataforma.</p>
        </div>
        <CreateOrderForm
          artworks={artworks?.data || []}
          clients={clients?.data || []}
          currencies={currencies?.data || []}
          formOfPayments={formOfPayments?.data || []}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable columns={orderColumns} data={orders?.data} />
      </Suspense>
    </section>
  );
};

export default OrderPage;
