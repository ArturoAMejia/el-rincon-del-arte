export interface VoucherSaleSummary {
  id: number;
  total: number;
  created_at: Date;
}

export interface VoucherEntity {
  id: number;
  state_id: number;
  numeration: string | null;
  serie: string | null;
  created_at: Date;

  client: string | null;
  currency: string | null;
  form_of_payment: string | null;

  sales: VoucherSaleSummary[];
}
