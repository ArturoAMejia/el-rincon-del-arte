import { getFormOfPaymentsAction } from "@/modules/admin/form-of-payment";
import { CreateFormOfPaymentForm } from "@/modules/admin/form-of-payment/components";
import { formOfPaymentsColumns } from "@/modules/admin/form-of-payment/components/data-table";
import { DataTable } from "@/shared/components";

export default async function Page() {
  const allFormOfPayments = await getFormOfPaymentsAction();

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Formas de pago</h1>
          <p>Administra las formas de pago usadas en ventas.</p>
        </div>
        <CreateFormOfPaymentForm />
      </div>

      <DataTable
        columns={formOfPaymentsColumns}
        data={allFormOfPayments.data || []}
      />
    </section>
  );
}
