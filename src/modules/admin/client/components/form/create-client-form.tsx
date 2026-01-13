"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClientDto,
  CreateClientDto,
} from "@/modules/admin/client/dto/client.dto";
import { createClientAction } from "@/modules/admin/client/actions/client.actions";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
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

export const CreateClientForm = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateClientDto>({
    resolver: zodResolver(createClientDto),
    defaultValues: {
      person: {
        name: "",
        last_name_business_name: "",
        id_ruc: "",
        phone_number: "",
        email: "",
        birthday: "",
        address: "",
      },
      client_type: "",
      gender: "",
    },
  });

  const handleSubmit = async (formData: CreateClientDto) => {
    setIsLoading(true);
    try {
      const result = await createClientAction(formData);
      if (result.success) {
        toast.success("Cliente creado");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al crear el cliente");
      }
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo cliente</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id="form-client"
            className="space-y-4"
          >
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
                          // sanitize and limit to 20 chars
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
          <Button type="submit" form="form-client" disabled={isLoading}>
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
