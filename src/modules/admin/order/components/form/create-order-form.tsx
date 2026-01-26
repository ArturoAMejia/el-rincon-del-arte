"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
import { useForm } from "react-hook-form";
import { CreateOrderDto } from "../../dtos/order.dto";
import { useEffect, useMemo, useState } from "react";
import { createOrderAction } from "../../actions";
import { toast } from "sonner";
import { ArtworkEntity } from "@/modules/admin/artwork";
import { ClientEntity } from "@/modules/admin/client";
import { CurrencyEntity } from "@/modules/admin/currency";
import { FormOfPaymentEntity } from "@/modules/admin/form-of-payment";
import { useOrderCartStore } from "../../store/order-cart.store";

interface Props {
  artworks: ArtworkEntity[];
  clients: ClientEntity[];
  currencies: CurrencyEntity[];
  formOfPayments: FormOfPaymentEntity[];
}

export const CreateOrderForm = ({
  artworks,
  clients,
  currencies,
  formOfPayments,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [artworkToAdd, setArtworkToAdd] = useState<string>("");

  const form = useForm<CreateOrderDto>({
    defaultValues: {
      order_type: "",
      client_id: undefined,
      currency_id: undefined,
      form_of_payment_id: undefined,
      subtotal: 0,
      tax: 0,
      total: 0,
    },
  });

  const cartItems = useOrderCartStore((s) => s.items);
  const addArtwork = useOrderCartStore((s) => s.addArtwork);
  const removeArtwork = useOrderCartStore((s) => s.removeArtwork);
  const clearCart = useOrderCartStore((s) => s.clear);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }, [cartItems]);

  const taxRate = useMemo(() => {
    const raw = Number(process.env.NEXT_PUBLIC_TAX_RATE);

    if (!Number.isFinite(raw)) return 0.15;
    if (raw > 1) return raw / 100;
    return raw;
  }, []);

  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  useEffect(() => {
    form.setValue("subtotal", subtotal, { shouldValidate: true });
    form.setValue("tax", tax, { shouldValidate: true });
    form.setValue("total", total, { shouldValidate: true });
  }, [form, subtotal, tax, total]);

  const handleSubmit = async (formData: CreateOrderDto) => {
    if (cartItems.length === 0) {
      toast.error("Agrega al menos una obra a la orden");
      return;
    }

    setIsLoading(true);

    try {
      // Enforce computed fields server-side regardless of user input.
      const safeFormData: CreateOrderDto = {
        ...formData,
        subtotal,
        tax,
        total,
      };

      // Quantity is fixed at 1 for each artwork.
      const safeCartItems = cartItems.map((item) => ({ ...item, quantity: 1 }));

      const result = await createOrderAction(safeFormData, safeCartItems);

      if (result.success) {
        toast.success("Orden generada con éxito");
        setOpen(false);
        form.reset();
        clearCart();
      } else {
        toast.error(result.error || "Error al crear la orden");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          form.reset();
          clearCart();
          setArtworkToAdd("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Nueva orden</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Nueva orden</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-3 items-start justify-center gap-4"
            id="form"
          >
            <FormField
              control={form.control}
              name="order_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de orden</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un tipo de orden" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"En línea"}>En línea</SelectItem>
                      <SelectItem value={"En local"}>En local</SelectItem>
                      <SelectItem value={"Por encargo"}>Por encargo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un cliente para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients?.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client?.name}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moneda</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una moneda para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies?.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          value={currency.id.toString()}
                        >
                          {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="form_of_payment_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pago</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una forma de pago para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formOfPayments?.map((formOfPayment) => (
                        <SelectItem
                          key={formOfPayment.id}
                          value={formOfPayment.id.toString()}
                        >
                          {formOfPayment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impuesto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      className="w-full"
                      value={Number.isFinite(field.value) ? field.value : 0}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtotal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtotal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      className="w-full"
                      value={Number.isFinite(field.value) ? field.value : 0}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      className="w-full"
                      value={Number.isFinite(field.value) ? field.value : 0}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="col-span-3">
              <FormLabel>Obras</FormLabel>
              <Select
                value={artworkToAdd}
                onValueChange={(value) => {
                  setArtworkToAdd(value);
                  const selected = artworks.find((a) => a.id === Number(value));
                  if (selected) {
                    addArtwork(selected);
                    setArtworkToAdd("");
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una obra para agregar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {artworks?.map((artwork) => (
                    <SelectItem key={artwork.id} value={artwork.id.toString()}>
                      {artwork.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>

            <div className="col-span-3 space-y-2">
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No hay obras seleccionadas
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center gap-2 rounded-md border p-2"
                  >
                    <div className="col-span-6">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Precio: {item.price}
                      </p>
                    </div>
                    <div className="col-span-5 text-right text-sm">
                      {item.price}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeArtwork(item.id)}
                      >
                        Quitar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </form>
        </Form>

        <DialogFooter className="sm:justify-start">
          <Button type="submit" disabled={isLoading} form="form">
            {isLoading ? "Generando orden..." : "Generar orden"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
