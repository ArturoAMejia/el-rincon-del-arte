import { ArtworkEntity } from "../../artwork";

export interface SaleEntity {
  id: number;
  state_id: number;
  voucher: string;
  client: string | null;
  currency: string;
  form_of_payment: string;
  sale_type: string;
  subtotal: number;
  total: number;
  tax: number;
  sale_detail: SaleDetailEntity[];
  created_at: Date;
}

export interface SaleDetailEntity {
  id: number;
  sale_id: number;
  artwork_id: number;
  artwork: ArtworkEntity;
  quantity: number;
  price: number;
  amount: number;
}
