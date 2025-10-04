import { getArtistsAction } from "@/modules/admin/artist/actions";
import { getArtworksAction } from "@/modules/admin/artwork/actions";
import { artworkColumns } from "@/modules/admin/artwork/components";
import { getCategoriesAction } from "@/modules/admin/category/actions";
import { getCollectionsAction } from "@/modules/admin/collection/actions";
import { CreateArtworkForm } from "@/modules/admin/artwork/components";
import { getSizesAction } from "@/modules/admin/size/actions/size.actions";
import { getTypesArtAction } from "@/modules/admin/type-art/actions/type-art.actions";
import { DataTable } from "@/shared/components";
import React from "react";

export default async function ArtworkPage() {
  const artworks = await getArtworksAction();
  const artists = await getArtistsAction();
  const categories = await getCategoriesAction();
  const collections = await getCollectionsAction();
  const sizes = await getSizesAction();
  const typesArt = await getTypesArtAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Obras de Arte</h1>
          <p>Administra las obras de arte de la plataforma.</p>
        </div>
        <CreateArtworkForm
          artists={artists?.data}
          categories={categories?.data}
          collections={collections?.data}
          sizes={sizes?.data}
          typesArt={typesArt?.data}
        />
      </div>
      <DataTable columns={artworkColumns} data={artworks?.data || []} />
    </section>
  );
}
