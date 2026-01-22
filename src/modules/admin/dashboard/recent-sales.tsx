import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import type { RecentSalesData } from "./services";

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat("es-EC", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .trim();
}

export function RecentSales({ data }: { data: RecentSalesData }) {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Ventas recientes</CardTitle>
        <CardDescription>
          Has realizado {compactFormatter.format(data.monthSalesCount)} ventas
          en este mes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.sales.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No hay ventas recientes.
            </div>
          ) : (
            data.sales.map((sale) => {
              const initials = getInitials(sale.clientName) || "CL";

              return (
                <div
                  key={sale.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sale.clientEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    +{currencyFormatter.format(sale.total)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
