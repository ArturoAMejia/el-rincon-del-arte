"use server";

import { cacheTag, updateTag } from "next/cache";
import { CreateSaleDto } from "../dtos";
import { SaleEntity } from "../interfaces";
import { createSaleService, getSales } from "../services";

export async function getSalesAction(): Promise<{
  success: boolean;
  data: SaleEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("sales");

  try {
    const sales = await getSales();

    return {
      success: true,
      data: sales,
    };
  } catch (error) {
    console.error("Error fetching sales:", error);

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
      error: "Ocurrió un error inesperado",
    };
  }
}

export async function createSaleAction(
  formData: CreateSaleDto
): Promise<{
  success: boolean;
  data?: SaleEntity;
  error?: string;
}> {
  try {
    const sale = await createSaleService(formData);
    updateTag("sales");
    updateTag("vouchers");
    updateTag("order");

    return {
      success: true,
      data: sale,
    };
  } catch (error) {
    console.error("Error creating sale:", error);

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
