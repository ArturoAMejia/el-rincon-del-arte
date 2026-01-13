export interface PersonEntity {
  id: number;
  name: string;
  last_name_business_name: string;
  id_ruc: string;
  phone_number?: string | null;
  email: string;
  birthday?: string | null;
  address?: string | null;
  state_id: number;
}
