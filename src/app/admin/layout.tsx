import { AdminBreadcrumb, AdminSidebar } from "@/modules/admin"
import { SidebarProvider } from "@/shared/components/sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="p-4 w-full ">
        <AdminBreadcrumb />
        <section className="px-12 py-8">{children}</section>
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout
