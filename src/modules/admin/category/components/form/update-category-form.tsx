"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { updateCategoryAction } from "../../actions/category.actions";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import { UpdateCategoryDto, updateCategoryDto } from "../../dto/category.dto";
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
import { CategoryEntity } from "../../interfaces";
import { toast } from "sonner";

interface UpdateCategoryFormProps {
  category?: CategoryEntity;
}

export const UpdateCategoryForm = ({ category }: UpdateCategoryFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateCategoryDto>({
    resolver: zodResolver(updateCategoryDto),
    defaultValues: {
      id: category?.id || 0,
      name: category?.name || "",
    },
  });

  const handleSubmit = async (formData: UpdateCategoryDto) => {
    setIsLoading(true);

    try {
      const result = await updateCategoryAction(formData.id, formData);

      if (result.success) {
        toast.success("Categoría actualizada con éxito");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar la categoría");
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
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
          <DialogTitle>Editar categoría</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 items-center justify-center gap-4"
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
