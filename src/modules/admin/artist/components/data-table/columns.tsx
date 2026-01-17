'use client'
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ColumnDef } from "@tanstack/react-table";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { ArtistRowActions } from "./row-actions/artist-row-actions";
import { getStatusColor } from "@/utils/get-status-color";
import { Badge } from "@/shared/components/badge/badge";

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
      const labels: Record<number, string> = {
        1: "Activo",
        2: "Inactivo",
        3: "Pendiente",
        4: "Borrado",
        5: "Vendido",
        6: "Reservado",
      };
      return (
        <Badge className={getStatusColor(state)}>
          {labels[state] ?? "Desconocido"}
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
