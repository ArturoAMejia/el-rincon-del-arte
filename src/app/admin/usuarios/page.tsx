import { getUsersAction } from "@/modules/admin/user/actions/user.actions";
import { Suspense } from "react";
import { DataTable, DataTableSkeleton } from "@/shared/components";
import { CreateUserForm } from "@/modules/admin/user/components/form";
import { usersColumns } from "@/modules/admin/user/components/data-table/columns";

export default async function Page() {
  const allUsers = await getUsersAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p>Administra los usuarios del sistema.</p>
        </div>
        <CreateUserForm />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        {allUsers.success ? (
          <DataTable columns={usersColumns} data={allUsers.data} />
        ) : (
          <div className="text-red-600 font-semibold py-4">
            Ocurrió un error al cargar los usuarios. Por favor, inténtalo de
            nuevo más tarde.
          </div>
        )}
      </Suspense>
    </section>
  );
}
