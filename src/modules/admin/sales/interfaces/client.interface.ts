import { person } from "@/generated/prisma";

export interface ClientEntity {
  id: number;
  state_id: number;
  person_id: number | null;
  person?: person;
  client_type: string;
  gender: string;
  created_at: Date;
}
