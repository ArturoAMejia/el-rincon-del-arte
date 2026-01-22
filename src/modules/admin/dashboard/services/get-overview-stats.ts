"use server";

import { prisma } from "@/lib/prisma";

export type OverviewStatsData = {
  usersTotal: number;
  usersLast30: number;
  artistsActive: number;
  artistsLast30: number;
  artworksActive: number;
  artworksLast30: number;
  ordersActive: number;
  ordersLast30: number;
  salesActive: number;
  salesLast30: number;
  revenueTotal: number;
};

export const getOverviewStats = async (): Promise<OverviewStatsData | null> => {
  "use cache";
  const now = new Date();
  const last30Days = new Date(now);
  last30Days.setDate(now.getDate() - 30);

  try {
    const [
      usersTotal,
      usersLast30,
      artistsActive,
      artistsLast30,
      artworksActive,
      artworksLast30,
      ordersActive,
      ordersLast30,
      salesActive,
      salesLast30,
      salesAgg,
    ] = await Promise.all([
      prisma.user.count({
        where: { OR: [{ banned: false }, { banned: null }] },
      }),
      prisma.user.count({
        where: {
          OR: [{ banned: false }, { banned: null }],
          createdAt: { gte: last30Days },
        },
      }),
      prisma.artist.count({ where: { state_id: 1 } }),
      prisma.artist.count({
        where: { state_id: 1, created_at: { gte: last30Days } },
      }),
      prisma.artwork.count({ where: { state_id: 1 } }),
      prisma.artwork.count({
        where: { state_id: 1, created_at: { gte: last30Days } },
      }),
      prisma.order.count({ where: { state_id: 1 } }),
      prisma.order.count({
        where: { state_id: 1, created_at: { gte: last30Days } },
      }),
      prisma.sale.count({ where: { state_id: 1 } }),
      prisma.sale.count({
        where: { state_id: 1, created_at: { gte: last30Days } },
      }),
      prisma.sale.aggregate({
        where: { state_id: 1 },
        _sum: { total: true },
      }),
    ]);

    return {
      usersTotal,
      usersLast30,
      artistsActive,
      artistsLast30,
      artworksActive,
      artworksLast30,
      ordersActive,
      ordersLast30,
      salesActive,
      salesLast30,
      revenueTotal: salesAgg._sum.total ?? 0,
    };
  } catch {
    return null;
  }
};
