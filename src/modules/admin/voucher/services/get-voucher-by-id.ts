import { prisma } from "@/lib/prisma";
import { VoucherEntity } from "../interfaces";
import { VoucherMapper } from "../mappers";

export const getVoucherById = async (id: number): Promise<VoucherEntity | null> => {
  try {
    const voucher = await prisma.voucher.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            person: { select: { name: true, last_name_business_name: true } },
          },
        },
        currency: { select: { id: true, name: true } },
        form_of_payment: { select: { id: true, name: true } },
        sale: { select: { id: true, total: true, created_at: true } },
      },
    });

    if (!voucher) return null;
    return VoucherMapper.toDTO(voucher);
  } catch (error) {
    console.error("Error fetching voucher by id:", error);
    return null;
  }
};
