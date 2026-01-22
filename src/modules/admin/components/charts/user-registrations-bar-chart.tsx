"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export type UserRegistrationsBarChartPoint = {
  month: string;
  users: number;
};

const chartConfig = {
  users: {
    label: "Registros",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function UserRegistrationsBarChart({
  data,
}: {
  data: UserRegistrationsBarChartPoint[];
}) {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Registros en la app</CardTitle>
        <CardDescription>Últimos 3 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
