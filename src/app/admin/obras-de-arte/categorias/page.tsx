import { getCategoriesAction } from "@/modules/admin";
import { CreateCategoryForm } from "@/modules/admin/category/components";
import { categoriesColumns } from "@/modules/admin/category/components/data-table/columns/columns";
import { DataTable } from "@/shared/components";

export default async function Page() {
  const allCategories = await getCategoriesAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías de Arte</h1>
          <p>Administra las categorías de las obras de arte.</p>
        </div>
        <CreateCategoryForm />
      </div>

      <DataTable columns={categoriesColumns} data={allCategories.data || []} />
    </section>
  );
}
