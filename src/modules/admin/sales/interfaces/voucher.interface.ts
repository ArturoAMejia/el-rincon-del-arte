export interface VoucherEntity {
  id: number;
  state_id: number;
  client_id: number | null;
  currency_id: number | null;
  form_of_payment_id: number | null;
  numeration: string | null;
  serie: string | null;
  created_at: Date;
}
