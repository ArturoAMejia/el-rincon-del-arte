"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateClientDto,
  updateClientDto,
} from "@/modules/admin/client/dto/client.dto";
import { Edit } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/components/dialog/dialog";
import { updateClientAction } from "@/modules/admin/client/actions/client.actions";
import { ClientEntity } from "@/modules/admin/client/interfaces";
import { toast } from "sonner";

export const UpdateClientForm = ({ client }: { client: ClientEntity }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateClientDto>({
    resolver: zodResolver(updateClientDto),
    defaultValues: {
      id: client.id,
      person_id: client.person_id,
      person: {
        id: client.person_id,
        name: client.name ?? "",
        last_name_business_name:
          client.name?.split(" ").slice(1).join(" ") ?? "",
        id_ruc: client.id_ruc ?? "",
        phone_number: client.phone_number ?? "",
        email: client.email ?? "",
        birthday: client.birthday ?? "",
        address: client.address ?? "",
      },
      client_type: client.client_type,
      gender: client.gender,
    },
  });

  const handleSubmit = async (formData: UpdateClientDto) => {
    setIsLoading(true);
    try {
      const result = await updateClientAction(formData.id, formData);
      if (result.success) {
        toast.success("Cliente actualizado");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar el cliente");
      }
    } catch (error) {
      console.error("Error updating client:", error);
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
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id={`form-client-${client.id}`}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="person.name"
              render={({ field }) => (
                <FormItem className="my-2">
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
                    Este correo será el usuario de acceso del cliente.
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

            <FormField
              control={form.control}
              name="client_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="persona_natural">
                          Persona natural
                        </SelectItem>
                        <SelectItem value="persona_juridica">
                          Persona jurídica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="prefiero_no_decirlo">
                          Prefiero no decirlo
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
            form={`form-client-${client.id}`}
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
