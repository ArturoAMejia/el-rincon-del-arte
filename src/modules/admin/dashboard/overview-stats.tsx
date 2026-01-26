"use client";

import {
  DollarSign,
  ImageIcon,
  Palette,
  ReceiptText,
  ShoppingCart,
  Users,
} from "lucide-react";

import type { OverviewStatsData } from "./services";

interface StatCard {
  title: string;
  value: string;
  description: string;
  meta?: string;
  icon: React.ReactNode;
}

const compactNumber = new Intl.NumberFormat("es-EC", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const currencyCompact = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const OverviewStats = ({ data }: { data: OverviewStatsData | null }) => {
  const icons = {
    users: <Users className="h-4 w-4" />,
    artists: <Palette className="h-4 w-4" />,
    artworks: <ImageIcon className="h-4 w-4" />,
    orders: <ShoppingCart className="h-4 w-4" />,
    sales: <ReceiptText className="h-4 w-4" />,
    revenue: <DollarSign className="h-4 w-4" />,
  };

  if (data === null) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { title: "Usuarios", icon: icons.users },
          { title: "Artistas", icon: icons.artists },
          { title: "Obras de arte", icon: icons.artworks },
          { title: "Órdenes", icon: icons.orders },
          { title: "Ventas", icon: icons.sales },
          { title: "Ingresos", icon: icons.revenue },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border p-3 sm:rounded-xl sm:p-4"
          >
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="flex-shrink-0">{stat.icon}</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold sm:text-xl">—</div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-medium sm:text-sm">{stat.title}</h3>
                <p className="text-xs">No se pudo cargar</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats: StatCard[] = [
    {
      title: "Usuarios",
      value: compactNumber.format(data.usersTotal),
      meta: `Últ. 30 días: ${compactNumber.format(data.usersLast30)}`,
      icon: icons.users,
      description: "Cuentas activas (no baneadas)",
    },
    {
      title: "Artistas",
      value: compactNumber.format(data.artistsActive),
      meta: `Últ. 30 días: ${compactNumber.format(data.artistsLast30)}`,
      icon: icons.artists,
      description: "Artistas activos",
    },
    {
      title: "Obras de arte",
      value: compactNumber.format(data.artworksActive),
      meta: `Últ. 30 días: ${compactNumber.format(data.artworksLast30)}`,
      icon: icons.artworks,
      description: "Obras activas",
    },
    {
      title: "Órdenes",
      value: compactNumber.format(data.ordersActive),
      meta: `Últ. 30 días: ${compactNumber.format(data.ordersLast30)}`,
      icon: icons.orders,
      description: "Órdenes registradas",
    },
    {
      title: "Ventas",
      value: compactNumber.format(data.salesActive),
      meta: `Últ. 30 días: ${compactNumber.format(data.salesLast30)}`,
      icon: icons.sales,
      description: "Ventas completadas",
    },
    {
      title: "Ingresos",
      value: currencyCompact.format(data.revenueTotal),
      icon: icons.revenue,
      description: "Total vendido (USD)",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-lg border p-3 transition-shadow hover:shadow-md sm:rounded-xl sm:p-4"
        >
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex-shrink-0">{stat.icon}</div>
            {stat.meta ? (
              <div className="text-right text-[10px] sm:text-xs">
                {stat.meta}
              </div>
            ) : null}
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold sm:text-xl">{stat.value}</div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-medium sm:text-sm">{stat.title}</h3>
              <p className="text-xs">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
