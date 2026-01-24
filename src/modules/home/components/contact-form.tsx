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
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-8">Visítanos</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#c17855] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Dirección de la Galería</p>
                  <p className="text-[#5a5a5a]">
                    Altamira, Managua
                    <br />
                    Managua, Nicaragua
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-[#c17855] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Horario de Atención</p>
                  <p className="text-[#5a5a5a]">
                    Martes - Domingo: 10 AM - 6 PM
                    <br />
                    Lunes: Cerrado
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-[#c17855] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Eventos Especiales</p>
                  <p className="text-[#5a5a5a]">
                    First Friday: Extended hours until 9 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-serif font-bold mb-8">Contáctanos</h3>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 border border-[#e0dada]  focus:outline-none focus:border-[#c17855] transition"
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
                      className="w-full px-4 py-3 border border-[#e0dada]  focus:outline-none focus:border-[#c17855] transition"
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
                      className="w-full px-4 py-3 border border-[#e0dada]  focus:outline-none focus:border-[#c17855] transition"
                      {...field}
                    />
                  )}
                />
                <Button className="w-full bg-[#c17855] hover:bg-[#a85d45] text-white rounded-none py-3">
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
