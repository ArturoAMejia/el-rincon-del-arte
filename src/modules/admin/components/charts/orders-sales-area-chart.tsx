"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/chart";

export type OrdersSalesAreaChartPoint = {
  month: string;
  orders: number;
  sales: number;
};

const chartConfig = {
  orders: {
    label: "Órdenes",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Ventas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OrdersSalesAreaChart({
  data,
}: {
  data: OrdersSalesAreaChartPoint[];
}) {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Órdenes vs Ventas</CardTitle>
        <CardDescription>Últimos 3 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <AreaChart accessibilityLayer data={data} margin={{ left: 0, right: 8 }}>
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.05}
                />
              </linearGradient>

              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              width={32}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="var(--color-orders)"
              fill="url(#fillOrders)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="var(--color-sales)"
              fill="url(#fillSales)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
