"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { DataTable } from "@/shared/components";
import { CollectionEntity } from "@/modules/admin/collection/interfaces";
import { CollectionRowActions } from "./row-actions/collection-row-actions";

interface Props {
  data: CollectionEntity[];
}

export const CollectionDataTableClient = ({ data }: Props) => {
  const columns: ColumnDef<CollectionEntity>[] = [
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
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "state_id",
      header: "Estado",
      cell: ({ row }) => {
        const stateId = row.getValue("state_id") as number;
        const stateNames = {
          1: "Activo",
          2: "Inactivo", 
          3: "Pendiente",
          4: "Borrado",
          5: "Vendido",
          6: "Reservado"
        };
        return stateNames[stateId as keyof typeof stateNames] || "Desconocido";
      },
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <CollectionRowActions collection={row.original} />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};
