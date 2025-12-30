"use server";

import { cacheTag } from "next/cache";
import { FormOfPaymentEntity } from "../interfaces";
import { getFormOfPayments } from "../services";

export const getFormOfPaymentsAction = async (): Promise<{
  success: boolean;
  data?: FormOfPaymentEntity[];
  error?: string;
}> => {
  "use cache";
  cacheTag("form-of-payment");
  try {
    // Get all form of payments
    const form_of_payments = await getFormOfPayments();

    return {
      success: true,
      data: form_of_payments,
    };
  } catch (error) {
    console.error("Error al obtener las formas de pago:", error);

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
