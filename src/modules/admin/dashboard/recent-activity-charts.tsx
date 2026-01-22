import {
  OrdersSalesAreaChart,
  type OrdersSalesAreaChartPoint,
  UserRegistrationsBarChart,
  type UserRegistrationsBarChartPoint,
} from "@/modules/admin/components/charts";

export function RecentActivityCharts({
  ordersSalesData,
  registrationsData,
}: {
  ordersSalesData: OrdersSalesAreaChartPoint[];
  registrationsData: UserRegistrationsBarChartPoint[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <OrdersSalesAreaChart data={ordersSalesData} />
      <UserRegistrationsBarChart data={registrationsData} />
    </div>
  );
}
