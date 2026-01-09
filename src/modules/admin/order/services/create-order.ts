import { prisma } from "@/lib/prisma";
import { createOrderDto, CreateOrderDto } from "../dtos/order.dto";
// import { generateVoucher } from "@/utils/sales";
import { ArtworkEntity } from "../../artwork";
import { OrderMapper } from "../mappers";

export const createOrderService = async (
  createOrder: CreateOrderDto,
  artwork: ArtworkEntity[]
) => {
  try {
    const newOrder = createOrderDto.parse(createOrder);

    // todo será usado cuando se crea la venta
    // const voucher = await generateVoucher(
    //   newOrder.client_id,
    //   newOrder.currency_id,
    //   newOrder.form_of_payment_id
    // );

    const created = await prisma.order.create({
      data: {
        client_id: newOrder.client_id,
        currency_id: newOrder.currency_id,
        form_of_payment_id: newOrder.form_of_payment_id,
        order_type: newOrder.order_type,
        tax: newOrder.tax,
        total: newOrder.total,
        subtotal: newOrder.subtotal,
      },
      include: {
        client: {
          include: { person: true },
        },
        currency: true,
        form_of_payment: true,
        order_detail: {
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

    await prisma.order_detail.createMany({
      data: artwork.map((detail) => ({
        order_id: created.id,
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

    return OrderMapper.toDTO(created);
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(`Error creating order: ${error}`);
  }
};
