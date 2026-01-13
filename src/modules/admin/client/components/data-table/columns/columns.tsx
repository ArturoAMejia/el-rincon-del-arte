"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { ClientRowActions } from "../row-actions/client-row-actions";
import { getStatusColor } from "@/utils/get-status-color";
import { Badge } from "@/shared/components/badge/badge";

export const clientsColumns: ColumnDef<ClientEntity>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "id_ruc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cédula / RUC" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
  },
  {
    accessorKey: "client_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Género" />
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
    cell: ({ row }) => <ClientRowActions client={row.original} />,
  },
];
