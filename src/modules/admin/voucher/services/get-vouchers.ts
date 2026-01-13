import { prisma } from "@/lib/prisma";
import { VoucherEntity } from "../interfaces";
import { VoucherMapper } from "../mappers";

export const getVouchers = async (): Promise<VoucherEntity[]> => {
  try {
    const vouchers = await prisma.voucher.findMany({
      orderBy: { created_at: "desc" },
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

    return vouchers.map(VoucherMapper.toDTO);
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return [];
  }
};
