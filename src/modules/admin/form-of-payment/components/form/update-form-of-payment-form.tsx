"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import {
  UpdateFormOfPaymentDto,
  updateFormOfPaymentDto,
} from "../../dto/form-of-payment.dto";
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
import { FormOfPaymentEntity } from "../../interfaces";
import { toast } from "sonner";
import { updateFormOfPaymentAction } from "../../actions/form-of-payment.actions";

interface UpdateFormOfPaymentFormProps {
  formOfPayment?: FormOfPaymentEntity;
}

export const UpdateFormOfPaymentForm = ({
  formOfPayment,
}: UpdateFormOfPaymentFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateFormOfPaymentDto>({
    resolver: zodResolver(updateFormOfPaymentDto),
    defaultValues: {
      id: formOfPayment?.id || 0,
      name: formOfPayment?.name || "",
    },
  });

  const handleSubmit = async (formData: UpdateFormOfPaymentDto) => {
    setIsLoading(true);

    try {
      const result = await updateFormOfPaymentAction(formData.id, formData);

      if (result.success) {
        toast.success("Forma de pago actualizada con éxito");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar la forma de pago");
      }
    } catch (error) {
      console.error("Error al actualizar la forma de pago:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar forma de pago</DialogTitle>
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
                    <Input
                      placeholder="Ingrese el nombre"
                      className="w-full"
                      {...field}
                    />
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
