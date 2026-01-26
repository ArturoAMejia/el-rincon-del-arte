import { getArtistsAction } from "@/modules/admin/artist/actions/artist.actions";
import { Suspense } from "react";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { CreateArtistForm } from "@/modules/admin/artist/components/form";
import { artistsColumns } from "@/modules/admin/artist/components/data-table/columns";

export default async function Page() {
  const allArtists = await getArtistsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Artistas</h1>
          <p>Administra los artistas del sistema.</p>
        </div>
        <CreateArtistForm />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        {allArtists.success ? (
          <DataTable columns={artistsColumns} data={allArtists.data || []} />
        ) : (
          <div className="py-4 font-semibold text-red-600">
            Ocurrió un error al cargar los artistas. Por favor, inténtalo de
            nuevo más tarde.
          </div>
        )}
      </Suspense>
    </section>
  );
}
