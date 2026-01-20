"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserEntity } from "@/modules/admin/user/interfaces";
import { Badge } from "@/shared/components/badge/badge";
import { UserRowActions } from "../row-actions/user-row-actions";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { getStatusColor } from "@/utils";

export const usersColumns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "person_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Verificado" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.getValue("emailVerified") ? "secondary" : "destructive"}
        >
          {row.getValue("emailVerified") ? "Sí" : "No"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "admin" ? "default" : "secondary"}>
          {role || "N/A"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "stateId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const state = row.original.stateId;
      const labels: Record<number, string> = {
        1: "Activo",
        2: "Inactivo",
        3: "Pendiente",
        4: "Borrado",
      };
      return (
        <Badge className={getStatusColor(state as number)}>
          {labels[state as number] ?? "Desconocido"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions row={row.original} />,
  },
];
