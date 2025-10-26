import {
  getArtistsAction,
  getCategoriesAction,
  getCollectionsAction,
  getSizesAction,
  getTypesArtAction,
} from "@/modules/admin";
import { getArtworksAction } from "@/modules/admin/artwork/actions";
import {
  CreateArtworkForm,
  ArtworkDataTableClient,
} from "@/modules/admin/artwork/components";
import { DataTableSkeleton } from "@/shared/components";
import { Suspense } from "react";

export default async function ArtworkPage() {
  const allArtworks = await getArtworksAction();
  const allArtists = await getArtistsAction();
  const allCategories = await getCategoriesAction();
  const allSizes = await getSizesAction();
  const allCollections = await getCollectionsAction();
  const allTypesArt = await getTypesArtAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Obras de Arte</h1>
          <p>Administra las obras de arte de la plataforma.</p>
        </div>

        <CreateArtworkForm
          artists={allArtists.data || []}
          categories={allCategories.data || []}
          sizes={allSizes.data || []}
          collections={allCollections.data || []}
          typesArt={allTypesArt.data || []}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <ArtworkDataTableClient
          data={allArtworks?.data}
          artists={allArtists?.data}
          categories={allCategories?.data}
          collections={allCollections?.data}
          sizes={allSizes?.data}
          typesArt={allTypesArt?.data}
        />
      </Suspense>
    </section>
  );
}
