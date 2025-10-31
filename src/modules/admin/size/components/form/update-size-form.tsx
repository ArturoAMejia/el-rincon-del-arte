"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateSizeDto,
  updateSizeDto,
} from "@/modules/admin/size/dto/size.dto";
import { Edit } from "lucide-react";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/components/dialog/dialog";
import { updateSizeAction } from "@/modules/admin/size/actions/size.actions";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { toast } from "sonner";

export const UpdateSizeForm = ({ size }: { size: SizeEntity }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // use a loose form generic to avoid strict resolver/generic incompatibilities
  const form = useForm<UpdateSizeDto>({
    resolver: zodResolver(updateSizeDto),
    defaultValues: { id: size.id, name: size.name },
  });

  const handleSubmit = async (formData: UpdateSizeDto) => {
    setIsLoading(true);
    try {
      const result = await updateSizeAction(formData.id, formData);
      if (result.success) {
        toast.success("Medida actualizada");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar la medida");
      }
    } catch (error) {
      console.error("Error updating size:", error);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar medida</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id={`form-${size.id}`}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form={`form-${size.id}`} disabled={isLoading}>
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
