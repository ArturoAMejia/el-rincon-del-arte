import { prisma } from "@/lib/prisma";
import { SaleEntity } from "../interfaces";
import { SaleMapper } from "../mappers";

export const getSales = async (): Promise<SaleEntity[]> => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        client: {
          select: {
            person: { select: { name: true, last_name_business_name: true } },
            person_id: true,
            client_type: true,
            id: true,
          },
        },
        form_of_payment: {
          select: { id: true, name: true, created_at: true },
        },
        currency: {
          select: { id: true, name: true, created_at: true },
        },
        sale_detail: {
          include: {
            artwork: {
              include: {
                artist: {
                  select: {
                    id: true,
                    person: {
                      select: { name: true, last_name_business_name: true },
                    },
                  },
                },
                collection: true,
                category: true,
                type_art: true,
                size: true,
              },
            },
          },
        },
        voucher: { select: { id: true, serie: true } },
      },
    });

    if (!sales) return [];
    return sales.map(SaleMapper.toDTO);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};
