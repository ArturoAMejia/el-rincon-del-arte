"use server";

import { cacheTag } from "next/cache";
import { VoucherEntity } from "../interfaces";
import { getVoucherById, getVouchers } from "../services";
import { getVoucherByIdDto } from "../dtos";

export async function getVouchersAction(): Promise<{
  success: boolean;
  data: VoucherEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("vouchers");

  try {
    const vouchers = await getVouchers();

    return {
      success: true,
      data: vouchers,
    };
  } catch (error) {
    console.error("Error al obtener los comprobantes:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message, data: [] };
    }

    return { success: false, error: "An unexpected error occurred", data: [] };
  }
}

export async function getVoucherByIdAction(id: number): Promise<{
  success: boolean;
  data?: VoucherEntity | null;
  error?: string;
}> {
  try {
    const parsed = getVoucherByIdDto.safeParse({ id });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message };
    }

    const voucher = await getVoucherById(id);

    return {
      success: true,
      data: voucher,
    };
  } catch (error) {
    console.error("Error fetching voucher:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "An unexpected error occurred" };
  }
}
