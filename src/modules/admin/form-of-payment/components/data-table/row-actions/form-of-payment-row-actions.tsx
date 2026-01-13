"use client";

import { FormOfPaymentEntity } from "@/modules/admin/form-of-payment/interfaces";
import { UpdateFormOfPaymentForm } from "../../form";

interface Props {
  formOfPayment?: FormOfPaymentEntity;
}

export const FormOfPaymentRowActions = ({ formOfPayment }: Props) => {
  if (!formOfPayment) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <UpdateFormOfPaymentForm formOfPayment={formOfPayment} />
    </div>
  );
};
