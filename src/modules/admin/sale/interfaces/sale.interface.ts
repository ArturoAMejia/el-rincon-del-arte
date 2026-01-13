import { OrderDetailEntity } from "../../order";

export interface SaleVoucherEntity {
  id: number;
  numeration: string | null;
  serie: string | null;
}

export interface SaleOrderEntity {
  id: number;
  client: string | null;
  currency: string | null;
  form_of_payment: string | null;
  order_type: string;
  subtotal: number;
  tax: number;
  total: number;
  created_at: Date;
  order_detail: OrderDetailEntity[];
}

export interface SaleEntity {
  id: number;
  state_id: number;
  total: number;
  created_at: Date;
  voucher: SaleVoucherEntity;
  order: SaleOrderEntity;
}
