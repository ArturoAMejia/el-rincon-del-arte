import { AdminBreadcrumb, AdminSidebar } from "@/modules/admin";
import { SidebarProvider } from "@/shared/components/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full p-4">
        <AdminBreadcrumb />
        <section className="px-12 py-8">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
