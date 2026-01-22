"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateArtistDto,
  UpdateArtistDto,
} from "@/modules/admin/artist/dto/artist.dto";
import { updateArtistAction } from "@/modules/admin/artist/actions/artist.actions";
import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/shared/components/textarea";
import { Pencil } from "lucide-react";

interface Props {
  artist: ArtistEntity;
}

export const UpdateArtistForm = ({ artist }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateArtistDto>({
    resolver: zodResolver(updateArtistDto),
    defaultValues: {
      id: artist.id,
      person_id: artist.person_id,
      person: {
        id: artist.person_id,
        name: artist.name?.split(" ")[0] || "",
        last_name_business_name:
          artist.name?.split(" ").slice(1).join(" ") || "",
        id_ruc: artist.id_ruc ?? "",
        phone_number: artist.phone_number ?? "",
        email: artist.email ?? "",
        birthday: artist.birthday ?? "",
        address: artist.address ?? "",
      },
      bio: artist.bio ?? "",
      style: artist.style ?? "",
    },
  });

  const handleSubmit = async (formData: UpdateArtistDto) => {
    setIsLoading(true);
    try {
      const result = await updateArtistAction(formData.id, formData);
      if (result.success) {
        toast.success("Artista actualizado");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar el artista");
      }
    } catch (error) {
      console.error("Error updating artist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar artista</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id={`form-artist-${artist.id}`}
            className="space-y-4"
          >
            {/* Person Fields */}
            <FormField
              control={form.control}
              name="person.name"
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

            <FormField
              control={form.control}
              name="person.last_name_business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido / Razón social</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="person.id_ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUC / Cédula</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="person.phone_number"
              render={({ field }) => {
                const raw: string = field.value ?? "";
                const formatDisplay = (v: string) => {
                  if (!v) return "";
                  const hasPlus = v.startsWith("+");
                  const digits = v.replace(/[^\d]/g, "");
                  const parts = digits.match(/.{1,3}/g) || [];
                  return (hasPlus ? "+" : "") + parts.join(" ");
                };

                return (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        value={formatDisplay(raw)}
                        onChange={(e) => {
                          const rawInput = e.target.value.replace(
                            /[^+\d]/g,
                            ""
                          );
                          const plus = rawInput.includes("+") ? "+" : "";
                          const digits = rawInput.replace(/[^\d]/g, "");
                          let value = plus + digits;
                          if (value.length > 20) value = value.slice(0, 20);
                          field.onChange(value);
                        }}
                        inputMode="tel"
                        placeholder="+51 912 345 678"
                        maxLength={20}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="person.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este correo será el usuario de acceso del artista.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="person.birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="person.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Artist Fields */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografía</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="submit"
            form={`form-artist-${artist.id}`}
            disabled={isLoading}
          >
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
