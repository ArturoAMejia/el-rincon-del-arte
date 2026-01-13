import { prisma } from "@/lib/prisma";
import { createSaleDto, CreateSaleDto } from "../dtos";
import { SaleMapper } from "../mappers";
import { saleInclude } from "./sale-includes";

export const createSaleService = async (payload: CreateSaleDto) => {
  try {
    const parsed = createSaleDto.parse(payload);

    const order = await prisma.order.findUnique({
      where: { id: parsed.order_id },
    });

    if (!order) {
      throw new Error("La orden no existe");
    }

    const existingSale = await prisma.sale.findFirst({
      where: { order_id: order.id },
    });

    if (existingSale) {
      throw new Error("La orden ya tiene una venta registrada");
    }

    const sale = await prisma.$transaction(async (tx) => {
      const voucher = await tx.voucher.create({
        data: {
          state_id: 1,
          client_id: order.client_id,
          currency_id: order.currency_id,
          form_of_payment_id: order.form_of_payment_id,
        },
      });

      const createdSale = await tx.sale.create({
        data: {
          state_id: 1,
          order_id: order.id,
          voucher_id: voucher.id,
          total: order.total,
        },
        include: saleInclude,
      });

      return createdSale;
    });

    return SaleMapper.toDTO(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error creando la venta");
  }
};
