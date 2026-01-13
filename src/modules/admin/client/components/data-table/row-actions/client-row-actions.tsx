"use client";

import { ClientEntity } from "@/modules/admin/client/interfaces";
import {
  DeactivateClient,
  ReactivateClient,
  UpdateClientForm,
} from "../../form";

interface Props {
  client?: ClientEntity;
}

export const ClientRowActions = ({ client }: Props) => {
  if (!client) return null;
  return (
    <div className="flex items-center gap-2">
      <UpdateClientForm client={client} />
      {client.state_id === 1 && <DeactivateClient id={client.id} />}
      {client.state_id === 2 && <ReactivateClient id={client.id} />}
    </div>
  );
};
