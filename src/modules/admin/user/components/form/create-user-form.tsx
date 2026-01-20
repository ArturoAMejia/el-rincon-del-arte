"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserDto,
  CreateUserDto,
} from "@/modules/admin/user/dto/user.dto";
import { createUserAction } from "@/modules/admin/user/actions/user.actions";
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/shared/components/dialog/dialog";
import { toast } from "sonner";

export const CreateUserForm = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserDto),
    defaultValues: {
      name: "",
      email: "",
      person: {
        name: "",
        last_name_business_name: "",
        id_ruc: "",
        phone_number: "",
        email: "",
        birthday: "",
        address: "",
      },
    },
  });

  const handleSubmit = async (formData: CreateUserDto) => {
    setIsLoading(true);
    try {
      const result = await createUserAction(formData);
      if (result.success) {
        toast.success("Usuario creado");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al crear el usuario");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo usuario</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id="form-user"
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.setValue("person.email", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="person.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre (Persona)</FormLabel>
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
          </form>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} form="form-user">
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
