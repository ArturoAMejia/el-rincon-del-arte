"use client";

import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ColumnDef } from "@tanstack/react-table";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistRowActions } from "./row-actions/artist-row-actions";
import { getStatusColor } from "@/utils/get-status-color";
import { Badge } from "@/shared/components/badge/badge";
import { statusLabels } from "@/utils/status-app";

export const artistsColumns: ColumnDef<ArtistEntity>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "id_ruc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cédula / RUC" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "style",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estilo" />
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
  },
  {
    accessorKey: "state_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const state = row.original.state_id;

      return (
        <Badge className={getStatusColor(state)}>
          {statusLabels[state] ?? "Desconocido"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <ArtistRowActions artist={row.original} />,
  },
];
