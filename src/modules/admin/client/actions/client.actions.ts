"use server";

import { cacheTag, updateTag } from "next/cache";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import {
  getClients,
  getClientById,
  createClientService,
  updateClientService,
  deactivateClientService,
  reactivateClientService,
} from "@/modules/admin/client/services";
import {
  CreateClientDto,
  UpdateClientDto,
} from "@/modules/admin/client/dto/client.dto";

export async function createClientAction(
  formData: CreateClientDto
): Promise<{ success: boolean; data?: ClientEntity; error?: string }> {
  try {
    const newClient = await createClientService(formData);
    updateTag("clients");
    return { success: true, data: newClient };
  } catch (error) {
    console.error("Error creating client:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getClientsAction(): Promise<{
  success: boolean;
  data: ClientEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("clients");
  try {
    const clients = await getClients();
    return { success: true, data: clients };
  } catch (error) {
    console.error("Error fetching clients:", error);
    if (error instanceof Error)
      return { success: false, error: error.message, data: [] };
    return { success: false, error: "An unexpected error occurred", data: [] };
  }
}

export async function getClientByIdAction(id: number): Promise<{
  success: boolean;
  data?: ClientEntity | null;
  error?: string;
}> {
  try {
    const client = await getClientById(id);
    return { success: true, data: client };
  } catch (error) {
    console.error("Error fetching client:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateClientAction(
  id: number,
  formData: UpdateClientDto
): Promise<{ success: boolean; data?: ClientEntity; error?: string }> {
  try {
    const updated = await updateClientService({ ...formData, id });
    updateTag("clients");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating client:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deactivateClientAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deactivateClientService(id);
    updateTag("clients");
    return { success: true };
  } catch (error) {
    console.error("Error deactivating client:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function reactivateClientAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await reactivateClientService(id);
    updateTag("clients");
    return { success: true };
  } catch (error) {
    console.error("Error reactivating client:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}
