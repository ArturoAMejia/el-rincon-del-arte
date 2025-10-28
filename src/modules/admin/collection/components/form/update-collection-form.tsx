"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { updateCollectionAction } from "../../actions/collection.actions";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import {
  UpdateCollectionDto,
  updateCollectionDto,
} from "../../dto/collection.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form/form";
import { Textarea } from "@/shared/components/textarea/textarea";
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
import { CollectionEntity } from "../../interfaces";

interface UpdateCollectionFormProps {
  collection?: CollectionEntity;
}

export const UpdateCollectionForm = ({
  collection,
}: UpdateCollectionFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateCollectionDto>({
    resolver: zodResolver(updateCollectionDto),
    defaultValues: {
      id: collection?.id || 0,
      name: collection?.name || "",
      description: collection?.description || "",
    },
  });

  const handleSubmit = async (formData: UpdateCollectionDto) => {
    setIsLoading(true);

    try {
      const result = await updateCollectionAction(formData.id, formData);

      if (result.success) {
        toast.success("Colección actualizada con éxito");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar la colección");
      }
    } catch (error) {
      console.error("Error al actualizar la colección:", error);
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
          <DialogTitle>Editar colección</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
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
                      placeholder="Ingrese el nombre de la colección"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese una descripción para la colección"
                      className="resize-none w-full"
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
