export interface ArtistEntity {
  id: number;
  person_id: number;
  id_ruc: string | null;
  name: string | null;
  bio: string | null;
  style: string | null;
  phone_number: string | null;
  email: string | null;
  state_id: number;
}
