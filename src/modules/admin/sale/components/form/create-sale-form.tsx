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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
import { useForm } from "react-hook-form";
import { CreateSaleDto } from "../../dtos";
import { createSaleAction } from "../../actions";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { OrderEntity } from "@/modules/admin/order";

interface Props {
  orders: OrderEntity[];
}

export const CreateSaleForm = ({ orders }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateSaleDto>({
    defaultValues: {
      order_id: undefined,
    },
  });

  const selectedOrder = useMemo(() => {
    const orderId = form.watch("order_id");
    return orders.find((order) => order.id === orderId);
  }, [form, orders]);

  const handleSubmit = async (formData: CreateSaleDto) => {
    if (!formData.order_id) {
      toast.error("Selecciona una orden para generar la venta");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createSaleAction({ order_id: formData.order_id });

      if (result.success) {
        toast.success("Venta creada con éxito");
        form.reset();
        setOpen(false);
      } else {
        toast.error(result.error || "Error al crear la venta");
      }
    } catch (error) {
      console.error("Error al crear la venta:", error);
      toast.error("No se pudo crear la venta");
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
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Registrar venta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Registrar venta desde orden</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
            id="sale-form"
          >
            <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orden</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                    disabled={orders.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            orders.length === 0
                              ? "No hay órdenes disponibles"
                              : "Selecciona una orden"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orders.length === 0 && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No hay órdenes disponibles
                        </div>
                      )}
                      {orders.map((order) => (
                        <SelectItem key={order.id} value={order.id.toString()}>
                          #{order.id} - {order.client || "Sin cliente"} - $
                          {order.total}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedOrder && (
              <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
                <div className="col-span-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-semibold">
                      {selectedOrder.client || "Sin cliente"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">
                      ${selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{selectedOrder.order_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moneda</p>
                  <p className="font-medium">{selectedOrder.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Forma de pago</p>
                  <p className="font-medium">{selectedOrder.form_of_payment}</p>
                </div>

                <div className="col-span-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Detalle de la orden
                  </p>
                  <div className="space-y-2">
                    {selectedOrder.order_detail.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {item.artwork.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right text-sm font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>

        <DialogFooter className="sm:justify-start">
          <Button type="submit" disabled={isLoading} form="sale-form">
            {isLoading ? "Generando venta..." : "Generar venta"}
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
