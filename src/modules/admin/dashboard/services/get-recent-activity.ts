"use server";

import { prisma } from "@/lib/prisma";

import type {
  OrdersSalesAreaChartPoint,
  UserRegistrationsBarChartPoint,
} from "@/modules/admin/components/charts";

type RecentActivityData = {
  ordersSalesData: OrdersSalesAreaChartPoint[];
  registrationsData: UserRegistrationsBarChartPoint[];
};

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function monthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function monthLabel(date: Date) {
  const formatter = new Intl.DateTimeFormat("es-EC", {
    month: "short",
    year: "2-digit",
  });

  return formatter.format(date).replace(".", "");
}

export const getRecentActivity = async (): Promise<RecentActivityData> => {
  "use cache";
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const rangeStart = addMonths(currentMonthStart, -2);
  const rangeEndExclusive = addMonths(currentMonthStart, 1);

  const months = [
    rangeStart,
    addMonths(rangeStart, 1),
    addMonths(rangeStart, 2),
  ];

  const buckets = new Map<
    string,
    {
      label: string;
      orders: number;
      sales: number;
      users: number;
    }
  >();

  for (const date of months) {
    buckets.set(monthKey(date), {
      label: monthLabel(date),
      orders: 0,
      sales: 0,
      users: 0,
    });
  }

  const [orders, sales, users] = await Promise.all([
    prisma.order.findMany({
      where: { created_at: { gte: rangeStart, lt: rangeEndExclusive } },
      select: { created_at: true },
    }),
    prisma.sale.findMany({
      where: { created_at: { gte: rangeStart, lt: rangeEndExclusive } },
      select: { created_at: true },
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: rangeStart, lt: rangeEndExclusive } },
      select: { createdAt: true },
    }),
  ]);

  for (const order of orders) {
    const key = monthKey(order.created_at);
    const bucket = buckets.get(key);
    if (bucket) bucket.orders += 1;
  }

  for (const sale of sales) {
    const key = monthKey(sale.created_at);
    const bucket = buckets.get(key);
    if (bucket) bucket.sales += 1;
  }

  for (const user of users) {
    const key = monthKey(user.createdAt);
    const bucket = buckets.get(key);
    if (bucket) bucket.users += 1;
  }

  const ordersSalesData: OrdersSalesAreaChartPoint[] = months.map((date) => {
    const key = monthKey(date);
    const bucket = buckets.get(key);

    return {
      month: bucket?.label ?? monthLabel(date),
      orders: bucket?.orders ?? 0,
      sales: bucket?.sales ?? 0,
    };
  });

  const registrationsData: UserRegistrationsBarChartPoint[] = months.map(
    (date) => {
      const key = monthKey(date);
      const bucket = buckets.get(key);

      return {
        month: bucket?.label ?? monthLabel(date),
        users: bucket?.users ?? 0,
      };
    }
  );

  return { ordersSalesData, registrationsData };
};
