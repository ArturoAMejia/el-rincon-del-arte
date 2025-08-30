// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { AdminBreadcrumb, AdminSidebar } from "@/modules/admin"

import { SidebarProvider } from "@/shared/components/sidebar"
// import { usePathname } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="p-4 w-full ">
        <AdminBreadcrumb />
        <section className="p-12">{children}</section>
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout
