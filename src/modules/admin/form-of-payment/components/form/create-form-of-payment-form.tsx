"use client";

import { useState } from "react";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog/dialog";
import { toast } from "sonner";
import { createFormOfPaymentDto, CreateFormOfPaymentDto } from "../../dto";
import { createFormOfPaymentAction } from "../../actions";

export const CreateFormOfPaymentForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateFormOfPaymentDto>({
    resolver: zodResolver(createFormOfPaymentDto),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (formData: CreateFormOfPaymentDto) => {
    setIsLoading(true);

    try {
      const result = await createFormOfPaymentAction(formData);

      if (result.success) {
        toast.success("Forma de pago creada con éxito");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al crear la forma de pago");
      }
    } catch (error) {
      console.error("Error al crear la forma de pago:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar forma de pago</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nueva forma de pago</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 items-center gap-4 justify-center"
            id="form"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="sm:justify-start">
          <Button type="submit" disabled={isLoading} form="form">
            {isLoading ? "Guardando..." : "Guardar"}
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
