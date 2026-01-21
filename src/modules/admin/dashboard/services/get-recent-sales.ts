"use server";

import { prisma } from "@/lib/prisma";

export type RecentSalesItem = {
  id: number;
  total: number;
  clientName: string;
  clientEmail: string;
};

export type RecentSalesData = {
  monthSalesCount: number;
  sales: RecentSalesItem[];
};

export const getRecentSales = async (): Promise<RecentSalesData> => {
  "use cache";
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [sales, monthSalesCount] = await Promise.all([
    prisma.sale.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
      include: {
        order: {
          include: {
            client: {
              select: {
                person: {
                  select: {
                    name: true,
                    last_name_business_name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.sale.count({
      where: {
        created_at: { gte: monthStart },
      },
    }),
  ]);

  const mappedSales: RecentSalesItem[] = sales.map((sale) => {
    const person = sale.order.client?.person;
    const fullName = [person?.name, person?.last_name_business_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    return {
      id: sale.id,
      total: sale.total,
      clientName: fullName || "Cliente",
      clientEmail: person?.email || "Sin email",
    };
  });

  return { monthSalesCount, sales: mappedSales };
};
