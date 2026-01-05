import { prisma } from "@/lib/prisma";
import { createSaleDto, CreateSaleDto } from "../dtos/sales.dto";
import { generateVoucher } from "@/utils/sales";
import { ArtworkEntity } from "../../artwork";
import { SaleMapper } from "../mappers";

export const createSaleService = async (
  createSale: CreateSaleDto,
  artwork: ArtworkEntity[]
) => {
  try {
    const newSale = createSaleDto.parse(createSale);

    const voucher = await generateVoucher(
      newSale.client_id,
      newSale.currency_id,
      newSale.form_of_payment_id
    );

    const created = await prisma.sale.create({
      data: {
        client_id: newSale.client_id,
        currency_id: newSale.currency_id,
        form_of_payment_id: newSale.form_of_payment_id,
        sale_type: newSale.sale_type,
        tax: newSale.tax,
        total: newSale.total,
        subtotal: newSale.subtotal,
        voucher_id: voucher.id,
      },
      include: {
        voucher: true,
        client: {
          include: { person: true },
        },
        currency: true,
        form_of_payment: true,
        sale_detail: {
          include: {
            artwork: {
              include: {
                artist: { include: { person: true } },
                collection: true,
                category: true,
                type_art: true,
                size: true,
              },
            },
          },
        },
      },
    });

    await prisma.sale_detail.createMany({
      data: artwork.map((detail) => ({
        sale_id: created.id,
        artwork_id: detail.id,
        quantity: detail.quantity !== undefined ? detail.quantity : 1,
        price: detail.price,
        amount:
          detail.quantity !== undefined ? detail.quantity * detail.price : 1,
      })),
    });

    // Once sold, mark artworks as state_id = 5
    if (artwork.length > 0) {
      await prisma.artwork.updateMany({
        where: { id: { in: artwork.map((a) => a.id) } },
        data: { state_id: 5 },
      });
    }

    return SaleMapper.toDTO(created);
  } catch (error) {
    console.error("Error creating sale:", error);
    throw new Error(`Error creating sale: ${error}`);
  }
};
