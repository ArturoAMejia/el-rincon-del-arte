"use server";

import { cacheTag } from "next/cache";
import { ClientEntity } from "../interfaces";
import { getClients } from "../services";

export const getClientsAction = async (): Promise<{
  success: boolean;
  data?: ClientEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("clients");
  try {
    // Get all clients
    const clients = await getClients();

    return {
      success: true,
      data: clients,
    };
  } catch (error) {
    console.error("Error al obtener los clientes:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};
