import { getSizesAction } from "@/modules/admin/size/actions/size.actions";
import { Suspense } from "react";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { CreateSizeForm } from "@/modules/admin/size/components/form";
import { sizesColumns } from "@/modules/admin/size/components";

export default async function Page() {
  const allSizes = await getSizesAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Medidas</h1>
          <p>Administra las medidas de obras de arte.</p>
        </div>
        <CreateSizeForm />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        {allSizes.success ? (
          <DataTable columns={sizesColumns} data={allSizes.data} />
        ) : (
          <div className="py-4 font-semibold text-red-600">
            Ocurrió un error al cargar las medidas. Por favor, inténtalo de
            nuevo más tarde.
          </div>
        )}
      </Suspense>
    </section>
  );
}
