"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserDto,
  UpdateUserDto,
} from "@/modules/admin/user/dto/user.dto";
import { updateUserAction } from "@/modules/admin/user/actions/user.actions";
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
import { UserEntity } from "@/modules/admin/user/interfaces";
import { Edit } from "lucide-react";

export const UpdateUserForm = ({ user }: { user: UserEntity }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserDto),
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      person_id: user.personId ?? undefined,
      person: {
        id: user.personId ?? 0,
        name: user.name ?? "",
        last_name_business_name: user.last_name_business_name ?? "",
        id_ruc: user.id_ruc ?? "",
        phone_number: user.phone_number ?? "",
        email: user.email ?? "",
        birthday: user.birthday ?? "",
        address: user.address ?? "",
      },
    },
  });

  const handleSubmit = async (formData: UpdateUserDto) => {
    setIsLoading(true);
    try {
      const result = await updateUserAction(user.id, formData);
      if (result.success) {
        toast.success("Usuario actualizado");
        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar usuario"
      );
      console.error(error);
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
          <DialogTitle>Editar usuario</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id="form-update-user"
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
                        value={formatDisplay(field.value ?? "")}
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
            <Button type="submit" disabled={isLoading} form="form-update-user">
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
