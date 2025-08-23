import { AdminBarChart } from "@/modules/admin/components/charts"

const AdminPage = () => {
  return (
    <section className="p-4 w-full">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-md bg-black/50">
            <AdminBarChart />
          </div>

          <div className="aspect-video rounded-md bg-black/50" />
          <div className="aspect-video rounded-md bg-black/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-md bg-black/50 md:min-h-min" />
      </div>
    </section>
  )
}

export default AdminPage
