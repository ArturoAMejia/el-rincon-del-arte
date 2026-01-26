"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ArtworkEntity } from "@/modules/admin/artwork/interfaces";

export const artworkColumns: ColumnDef<ArtworkEntity>[] = [
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
];
