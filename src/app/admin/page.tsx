import { OverviewStats } from "@/modules/admin/dashboard/overview-stats";
import { RecentActivityCharts } from "@/modules/admin/dashboard/recent-activity-charts";
import { RecentSales } from "@/modules/admin/dashboard/recent-sales";
import {
  getOverviewStats,
  getRecentActivity,
} from "@/modules/admin/dashboard/services";
import { getRecentSales } from "@/modules/admin/dashboard/services/get-recent-sales";

const AdminPage = async () => {
  const [overviewStats, recentActivity, recentSales] = await Promise.all([
    getOverviewStats(),
    getRecentActivity(),
    getRecentSales(),
  ]);

  return (
    <section className="p-4 w-full">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold ">
          El Rincón del Arte Panel Administrativo
        </h1>
        <p className="text-sm  mt-1">
          Resumen de estadísticas y actividades recientes del sitio.
        </p>
      </div>
      <OverviewStats data={overviewStats} />
      <div className="mt-6">
        <RecentActivityCharts
          ordersSalesData={recentActivity.ordersSalesData}
          registrationsData={recentActivity.registrationsData}
        />
      </div>
      <div className="mt-6">
        <RecentSales data={recentSales} />
      </div>
    </section>
  );
};

export default AdminPage;
