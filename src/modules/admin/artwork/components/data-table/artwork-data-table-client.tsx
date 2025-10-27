"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { DataTable } from "@/shared/components";
import { ArtworkEntity } from "@/modules/admin/artwork/interfaces";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { CategoryEntity } from "@/modules/admin/category/interfaces";
import { CollectionEntity } from "@/modules/admin/collection/interfaces";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { TypeArtEntity } from "@/modules/admin/type-art/interfaces";
import { ArtworkRowActions } from "./row-actions/artwork-row-actions";

interface Props {
  data: ArtworkEntity[];
  artists?: ArtistEntity[];
  categories?: CategoryEntity[];
  collections?: CollectionEntity[];
  sizes?: SizeEntity[];
  typesArt?: TypeArtEntity[];
}

export const ArtworkDataTableClient = ({
  data,
  artists,
  categories,
  collections,
  sizes,
  typesArt,
}: Props) => {
  const columns: ColumnDef<ArtworkEntity>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
    },
    {
      accessorKey: "artist",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Artista" />
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "category",
      header: "Categoría",
    },
    {
      accessorKey: "collection",
      header: "Colección",
    },
    {
      accessorKey: "size",
      header: "Tamaño",
    },
    {
      accessorKey: "price",
      header: "Precio",
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <ArtworkRowActions
          artwork={row.original}
          artists={artists}
          categories={categories}
          collections={collections}
          sizes={sizes}
          typesArt={typesArt}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};
