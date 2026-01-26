import { getClientsAction } from "@/modules/admin/client/actions/client.actions";
import { Suspense } from "react";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { CreateClientForm } from "@/modules/admin/client/components/form";
import { clientsColumns } from "@/modules/admin/client/components/data-table/columns";

export default async function Page() {
  const allClients = await getClientsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p>Administra los clientes del sistema.</p>
        </div>
        <CreateClientForm />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        {allClients.success ? (
          <DataTable columns={clientsColumns} data={allClients.data} />
        ) : (
          <div className="py-4 font-semibold text-red-600">
            Ocurrió un error al cargar los clientes. Por favor, inténtalo de
            nuevo más tarde.
          </div>
        )}
      </Suspense>
    </section>
  );
}
