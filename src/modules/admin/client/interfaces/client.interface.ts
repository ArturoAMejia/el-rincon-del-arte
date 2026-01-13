export interface ClientEntity {
  id: number;
  person_id: number;
  client_type: string;
  gender: string;
  state_id: number;
  id_ruc?: string | null;
  name?: string | null;
  phone_number?: string | null;
  email?: string | null;
  address?: string | null;
  birthday?: string | null;
}
