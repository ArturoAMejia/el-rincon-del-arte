"use server";

import { cacheTag } from "next/cache";
import { CurrencyEntity } from "../interfaces";
import { getCurrencies } from "../services";

export const getCurrenciesAction = async (): Promise<{
  success: boolean;
  data?: CurrencyEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("currencies");
  try {
    // Get all clients
    const currencies = await getCurrencies();

    return {
      success: true,
      data: currencies,
    };
  } catch (error) {
    console.error("Error al obtener las monedas:", error);

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
