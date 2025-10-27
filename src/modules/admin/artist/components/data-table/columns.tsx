import { DataTableColumnHeader } from "@/shared/components/data-table/column";
import { ColumnDef } from "@tanstack/react-table";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";

export const artistsColumns: ColumnDef<ArtistEntity>[] = [
  {
    accessorKey: "id_ruc",
    header: "Cédula - RUC",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "bio",
    header: "Biografía",
  },
  {
    accessorKey: "style",
    header: "Estilo",
  },
  {
    accessorKey: "phone_number",
    header: "Número de teléfono",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
  },
];
