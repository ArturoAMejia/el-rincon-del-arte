"use client";

import React from "react";
import { UpdateArtworkForm } from "@/modules/admin/artwork/components/form/update-artwork-form";
import { DataTableRowActions } from "@/shared/components/data-table/row-actions";
import { ArtworkEntity } from "@/modules/admin/artwork/interfaces";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { CategoryEntity } from "@/modules/admin/category/interfaces";
import { CollectionEntity } from "@/modules/admin/collection/interfaces";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { TypeArtEntity } from "@/modules/admin/type-art/interfaces";

interface Props {
  artwork: ArtworkEntity;
  artists?: ArtistEntity[];
  categories?: CategoryEntity[];
  collections?: CollectionEntity[];
  sizes?: SizeEntity[];
  typesArt?: TypeArtEntity[];
}

export const ArtworkRowActions = ({
  artwork,
  artists,
  categories,
  collections,
  sizes,
  typesArt,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <UpdateArtworkForm
        artwork={artwork}
        artists={Promise.resolve({ success: true, data: artists })}
        categories={Promise.resolve({ success: true, data: categories })}
        collections={Promise.resolve({ success: true, data: collections })}
        sizes={Promise.resolve({ success: true, data: sizes })}
        typesArt={Promise.resolve({ success: true, data: typesArt })}
      />

      <DataTableRowActions
        row={artwork}
        onAction={(action, row) => console.log(action, row)}
      />
    </div>
  );
};
