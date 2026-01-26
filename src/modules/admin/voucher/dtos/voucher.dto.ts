import { z } from "zod";

export const getVoucherByIdDto = z.object({
  id: z
    .number({ message: "El id del comprobante es obligatorio" })
    .int()
    .positive(),
});

export type GetVoucherByIdDto = z.infer<typeof getVoucherByIdDto>;
