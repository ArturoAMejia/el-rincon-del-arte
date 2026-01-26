"use client";

import { Button, Form, FormField, Input } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(1, "El mensaje es obligatorio"),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-8 font-serif text-3xl font-bold">Visítanos</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-[#c17855]" />
                <div>
                  <p className="mb-1 font-semibold">Dirección de la Galería</p>
                  <p className="text-[#5a5a5a]">
                    Altamira, Managua
                    <br />
                    Managua, Nicaragua
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-6 w-6 flex-shrink-0 text-[#c17855]" />
                <div>
                  <p className="mb-1 font-semibold">Horario de Atención</p>
                  <p className="text-[#5a5a5a]">
                    Martes - Domingo: 10 AM - 6 PM
                    <br />
                    Lunes: Cerrado
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="mt-1 h-6 w-6 flex-shrink-0 text-[#c17855]" />
                <div>
                  <p className="mb-1 font-semibold">Eventos Especiales</p>
                  <p className="text-[#5a5a5a]">
                    First Friday: Extended hours until 9 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-8 font-serif text-3xl font-bold">Contáctanos</h3>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full border border-[#e0dada] px-4 py-3 transition focus:border-[#c17855] focus:outline-none"
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="w-full border border-[#e0dada] px-4 py-3 transition focus:border-[#c17855] focus:outline-none"
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <textarea
                      placeholder="Tu mensaje"
                      rows={4}
                      className="w-full border border-[#e0dada] px-4 py-3 transition focus:border-[#c17855] focus:outline-none"
                      {...field}
                    />
                  )}
                />
                <Button className="w-full rounded-none bg-[#c17855] py-3 text-white hover:bg-[#a85d45]">
                  Enviar Mensaje
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
