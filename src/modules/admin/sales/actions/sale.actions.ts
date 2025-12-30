"use server";

import { cacheTag, updateTag } from "next/cache";
import { SaleEntity } from "../interfaces";
import { getSales } from "../services";
import { createSaleService } from "../services/create-sale";
import { CreateSaleDto } from "../dtos/sales.dto";
import { ArtworkEntity } from "../../artwork";

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
      error: "An unexpected error occurred",
    };
  }
}

export async function createSaleAction(
  formData: CreateSaleDto,
  artwork: ArtworkEntity[]
): Promise<{
  success: boolean;
  error?: string;
  data?: SaleEntity;
}> {
  try {
    const sale = await createSaleService(formData, artwork);
    updateTag("sales");
    updateTag("artworks");
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
      error: "An unexpected error occurred",
    };
  }
}
