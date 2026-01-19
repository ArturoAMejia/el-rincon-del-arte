export interface UserEntity {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  personId?: number | null;
  roleId?: number | null;
  // TODO: Verify if roleId is used or if we should switch to role string.
  // The schema has `role` as String.
  role?: string | null;
  stateId?: number | null;
  state?: {
    id: number;
    name: string;
  } | null;
  phone_number?: string | null;
  last_name_business_name?: string | null;
  id_ruc?: string | null;
  address?: string | null;
  birthday?: string | null;
}
