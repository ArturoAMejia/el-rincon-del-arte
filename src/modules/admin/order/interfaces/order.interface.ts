import { ArtworkEntity } from "../../artwork";

export interface OrderEntity {
  id: number;
  state_id: number;
  client: string | null;
  currency: string;
  form_of_payment: string;
  order_type: string;
  subtotal: number;
  total: number;
  tax: number;
  order_detail: OrderDetailEntity[];
  created_at: Date;
}

export interface OrderDetailEntity {
  id: number;
  order_id: number;
  artwork_id: number;
  artwork: ArtworkEntity;
  quantity: number;
  price: number;
  amount: number;
}
