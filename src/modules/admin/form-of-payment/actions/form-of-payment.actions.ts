"use server";

import { cacheTag, updateTag } from "next/cache";
import { FormOfPaymentEntity } from "../interfaces";
import {
  createFormOfPaymentService,
  deleteFormOfPaymentService,
  getFormOfPayments,
  updateFormOfPaymentService,
} from "../services";
import {
  CreateFormOfPaymentDto,
  UpdateFormOfPaymentDto,
} from "../dto/form-of-payment.dto";

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

export async function createFormOfPaymentAction(
  formData: CreateFormOfPaymentDto
): Promise<{ success: boolean; data?: FormOfPaymentEntity; error?: string }> {
  try {
    const created = await createFormOfPaymentService(formData);

    updateTag("form-of-payment");

    return { success: true, data: created };
  } catch (error) {
    console.error("Error creando forma de pago:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateFormOfPaymentAction(
  id: number,
  formData: UpdateFormOfPaymentDto
): Promise<{ success: boolean; data?: FormOfPaymentEntity; error?: string }> {
  try {
    const updated = await updateFormOfPaymentService(id, formData);

    updateTag("form-of-payment");

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error actualizando forma de pago:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteFormOfPaymentAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteFormOfPaymentService(id);

    updateTag("form-of-payment");

    return { success: true };
  } catch (error) {
    console.error("Error eliminando forma de pago:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
