import { getCollectionsAction } from "@/modules/admin";
import {
  CreateCollectionForm,
  CollectionDataTableClient,
} from "@/modules/admin/collection/components";
import { DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

export default async function CollectionsPage() {
  const allCollections = await getCollectionsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Colecciones</h1>
          <p>Administra las colecciones de obras de arte de la plataforma.</p>
        </div>

        <CreateCollectionForm />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <CollectionDataTableClient data={allCollections?.data || []} />
      </Suspense>
    </section>
  );
}
