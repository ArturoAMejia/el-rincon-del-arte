"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ArtworkEntity } from "@/modules/admin/artwork/interfaces";
import { UpdateArtworkForm } from "../form/update-artwork-form";
import { CategoryEntity } from "@/modules/admin/category";
import { CollectionEntity } from "@/modules/admin/collection";
import { SizeEntity } from "@/modules/admin/size";
import { TypeArtEntity } from "@/modules/admin/type-art";
import { ArtistEntity } from "@/modules/admin/artist";

type ArtworkColumnDeps = {
  artists: ArtistEntity[];
  categories: CategoryEntity[];
  collections: CollectionEntity[];
  sizes: SizeEntity[];
  typesArt: TypeArtEntity[];
};

export const getArtworkColumns = ({
  artists,
  categories,
  collections,
  sizes,
  typesArt,
}: ArtworkColumnDeps): ColumnDef<ArtworkEntity>[] => [
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
      <UpdateArtworkForm
        artwork={row.original}
        artists={artists}
        categories={categories}
        collections={collections}
        sizes={sizes}
        typesArt={typesArt}
      />
      // <DataTableRowActions
      //   row={row}
      //   updateAction={}
      //   onAction={(action, row) => {
      //     console.log(action, row);
      //   }}
      // />
    ),
  },
];
