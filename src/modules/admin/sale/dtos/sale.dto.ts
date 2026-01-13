import { z } from "zod";

export const createSaleDto = z.object({
  order_id: z
    .number({ message: "El id de la orden es obligatorio" })
    .int({ message: "El id de la orden debe ser un número entero" })
    .positive({ message: "El id de la orden debe ser positivo" }),
});

export type CreateSaleDto = z.infer<typeof createSaleDto>;
