import { prisma } from "@/lib/prisma";
import { OrderEntity } from "../interfaces";
import { OrderMapper } from "../mappers";

export const getOrdersWithoutSale = async (): Promise<OrderEntity[]> => {
  try {
    const orders = await prisma.order.findMany({
      where: { sale: { none: {} } },
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
        order_detail: {
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
      },
    });

    if (!orders) return [];
    return orders.map(OrderMapper.toDTO);
  } catch (error) {
    console.error("Error fetching unsold orders:", error);
    return [];
  }
};
