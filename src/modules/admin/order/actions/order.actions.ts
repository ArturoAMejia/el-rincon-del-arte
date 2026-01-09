"use server";

import { cacheTag, updateTag } from "next/cache";
import { OrderEntity } from "../interfaces";
import { getOrders, createOrderService } from "../services";
import { CreateOrderDto } from "../dtos/order.dto";
import { ArtworkEntity } from "../../artwork";

export async function getOrdersAction(): Promise<{
  success: boolean;
  data: OrderEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("order");
  try {
    const orders = await getOrders();

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);

    if (error instanceof Error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }

    return {
      success: false,
      data: [],
      error: "An unexpected error occurred",
    };
  }
}

export async function createOrderAction(
  formData: CreateOrderDto,
  artwork: ArtworkEntity[]
): Promise<{
  success: boolean;
  error?: string;
  data?: OrderEntity;
}> {
  try {
    const order = await createOrderService(formData, artwork);
    updateTag("order");
    updateTag("artworks");
    return {
      success: true,

      data: order,
    };
  } catch (error) {
    console.error("Error creating order:", error);

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
}
