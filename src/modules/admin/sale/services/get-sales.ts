import { prisma } from "@/lib/prisma";
import { SaleEntity } from "../interfaces";
import { SaleMapper } from "../mappers";
import { saleInclude } from "./sale-includes";

export const getSales = async (): Promise<SaleEntity[]> => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { created_at: "desc" },
      include: saleInclude,
    });

    if (!sales) return [];

    return sales.map(SaleMapper.toDTO);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};
