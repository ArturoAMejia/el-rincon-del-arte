import * as z from "zod";

export const createOrderDto = z.object({
  client_id: z.number("El id del cliente es obligatorio"),
  currency_id: z.number("El id de la moneda es obligatorio"),
  form_of_payment_id: z.number("El id de la forma de pago es obligatorio"),
  order_type: z
    .string("El tipo de venta es obligatorio")
    .min(1, "El tipo de venta debe tener al menos 1 carácter")
    .max(100, "El tipo de venta debe tener como máximo 100 caracteres"),
  subtotal: z
    .number("El subtotal es obligatorio")
    .min(0, "El subtotal debe ser al menos 0"),
  tax: z
    .number("El impuesto es obligatorio")
    .min(0, "El impuesto debe ser al menos 0"),
  total: z
    .number("El total es obligatorio")
    .min(0, "El total debe ser al menos 0"),
});

export const createOrderDetailDto = z.object({
  order_id: z.number("El id de la venta es obligatorio"),
  artwork_id: z.number("El id de la obra es obligatorio"),
  quantity: z
    .number("La cantidad es obligatoria")
    .min(1, "La cantidad debe ser al menos 1"),
  price: z
    .number("El precio es obligatorio")
    .min(0, "El precio debe ser al menos 0"),
  amount: z
    .number("El monto es obligatorio")
    .min(0, "El monto debe ser al menos 0"),
});

export type CreateOrderDto = z.infer<typeof createOrderDto>;

export type CreateOrderDetailDto = z.infer<typeof createOrderDetailDto>;

export const updateOrderDto = z.object({
  id: z.number("El id es obligatorio"),
  client_id: z.number("El id del cliente es obligatorio"),
  currency_id: z.number("El id de la moneda es obligatorio"),
  form_of_payment_id: z.number("El id de la forma de pago es obligatorio"),
  order_type: z
    .string("El tipo de venta es obligatorio")
    .min(1, "El tipo de venta debe tener al menos 1 carácter")
    .max(100, "El tipo de venta debe tener como máximo 100 caracteres"),
  subtotal: z
    .number("El subtotal es obligatorio")
    .min(0, "El subtotal debe ser al menos 0"),
  tax: z
    .number("El impuesto es obligatorio")
    .min(0, "El impuesto debe ser al menos 0"),
  total: z
    .number("El total es obligatorio")
    .min(0, "El total debe ser al menos 0"),
});

export const updateOrderDetailDto = z.object({
  id: z.number("El id es obligatorio"),
  order_id: z.number("El id de la venta es obligatorio"),
  artwork_id: z.number("El id de la obra es obligatorio"),
  quantity: z
    .number("La cantidad es obligatoria")
    .min(1, "La cantidad debe ser al menos 1"),
  price: z
    .number("El precio es obligatorio")
    .min(0, "El precio debe ser al menos 0"),
  amount: z
    .number("El monto es obligatorio")
    .min(0, "El monto debe ser al menos 0"),
});

export type UpdateOrderDto = z.infer<typeof updateOrderDto>;

export type UpdateOrderDetailDto = z.infer<typeof updateOrderDetailDto>;
