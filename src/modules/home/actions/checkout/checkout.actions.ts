"use server";

import { createOrderDto, createOrderService } from "@/modules/admin/order";
import { getClientByUserId } from "../../services/checkout/get-client-by-user-id";
import { ArtworkEntity } from "@/modules/admin";

export async function putOrderInCheckoutAction(
  subtotal: number,
  total: number,
  tax: number,
  userId: string,
  items: ArtworkEntity[]
): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
}> {
  try {
    const client = await getClientByUserId(userId);

    console.log(client);

    if (!client) throw new Error("Cliente no encontrado");
    // Placeholder for actual implementation

    const data = createOrderDto.parse({
      client_id: client?.id || null,
      currency_id: 2,
      form_of_payment_id: 1,
      order_type: "En línea",
      subtotal,
      total,
      tax,
    });
    const order = await createOrderService(data, items);

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    console.error("Error putting order in checkout:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Ocurrió un error inesperado",
    };
  }
}
