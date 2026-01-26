"use client";

import { Button, Form, FormField, Input } from "@/shared/components";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formData = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formData>>();
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="px-4 pt-12 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 font-serif text-6xl leading-tight font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Estemos en Contacto
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            ¿Tienes preguntas sobre obras de arte, exposiciones o colaboraciones
            con artistas? Nos encantaría saber de ti. Comunícate a través de
            cualquiera de los canales a continuación.
          </p>
        </div>
      </section>

      {/* Contact Bento Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-3">
            {/* Large Contact Form */}
            <div className="bg-card border-border rounded-lg border p-8 transition hover:shadow-lg md:col-span-2">
              <h2 className="mb-6 font-serif text-3xl font-bold">
                Mándanos un Mensaje
              </h2>
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      name="subject"
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Asunto"
                          className="col-span-2 w-full border border-[#e0dada] px-4 py-3 transition focus:border-[#c17855] focus:outline-none"
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
                          rows={11}
                          className="col-span-2 w-full border border-[#e0dada] px-4 py-3 transition focus:border-[#c17855] focus:outline-none"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg py-3 font-semibold"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-card border-border rounded-lg border p-6 transition hover:shadow-lg">
                <div className="bg-primary/10 mb-4 flex h-8 w-12 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold">Correo</h3>
                <p className="text-muted-foreground mb-4">
                  Para consultas y preguntas generales
                </p>
                <a
                  href="mailto:hello@veritas.com"
                  className="text-primary font-semibold hover:underline"
                >
                  contacto@elrincondelarte.art
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-card border-border rounded-lg border p-6 transition hover:shadow-lg">
                <div className="bg-primary/10 mb-4 flex h-8 w-12 items-center justify-center rounded-lg">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold">Teléfono</h3>
                <p className="text-muted-foreground mb-4">
                  Llámanos durante el horario de atención
                </p>
                <a
                  href="tel:+50558102409"
                  className="text-primary font-semibold hover:underline"
                >
                  +505 5810 2409
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-card border-border rounded-lg border p-6 transition hover:shadow-lg">
                <div className="bg-primary/10 mb-4 flex h-8 w-12 items-center justify-center rounded-lg">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold">Ubicación</h3>
                <p className="text-muted-foreground">
                  Altamira, Managua
                  <br />
                  Managua, Nicaragua
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-12 font-serif text-4xl font-bold">
            Connéctate con Nosotros
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
            Síguenos en las redes sociales para conocer las últimas
            exposiciones, características de artistas y actualizaciones de la
            galería.
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="#"
              className="bg-card border-border hover:border-primary flex items-center gap-2 rounded-lg border p-4 transition hover:shadow-lg"
            >
              <Instagram className="text-primary h-6 w-6" />
              <span className="font-semibold">Instagram</span>
            </a>
            <a
              href="#"
              className="bg-card border-border hover:border-primary flex items-center gap-2 rounded-lg border p-4 transition hover:shadow-lg"
            >
              <Twitter className="text-primary h-6 w-6" />
              <span className="font-semibold">Twitter</span>
            </a>
            <a
              href="#"
              className="bg-card border-border hover:border-primary flex items-center gap-2 rounded-lg border p-4 transition hover:shadow-lg"
            >
              <Linkedin className="text-primary h-6 w-6" />
              <span className="font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <details className="bg-card border-border cursor-pointer rounded-lg border p-6 transition hover:shadow-lg">
              <summary className="flex items-center justify-between text-lg font-semibold">
                ¿Cómo puedo ponerme en contacto con la galería?
                <span className="text-primary">+</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Puedes llenar nuestro formulario de contacto arriba, llamarnos
                directamente, o visitar la galería en persona. Normalmente
                respondemos a las consultas dentro de las 24 horas.
              </p>
            </details>
            <details className="bg-card border-border cursor-pointer rounded-lg border p-6 transition hover:shadow-lg">
              <summary className="flex items-center justify-between text-lg font-semibold">
                ¿Puedo encargar una obra o colaborar con un artista?
                <span className="text-primary">+</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                ¡Sí! Facilitamos colaboraciones entre coleccionistas y artistas.
                Por favor, contáctanos a través de nuestro formulario de
                contacto y menciona tu interés en encargos.
              </p>
            </details>
            <details className="bg-card border-border cursor-pointer rounded-lg border p-6 transition hover:shadow-lg">
              <summary className="flex items-center justify-between text-lg font-semibold">
                ¿Cuál es el proceso para aplicar como artista?
                <span className="text-primary">+</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Los artistas pueden aplicar a través de nuestro sitio web o
                enviando su portafolio directamente. Revisamos las solicitudes
                trimestralmente y notificamos a los solicitantes dentro de los
                30 días.
              </p>
            </details>
            <details className="bg-card border-border cursor-pointer rounded-lg border p-6 transition hover:shadow-lg">
              <summary className="flex items-center justify-between text-lg font-semibold">
                ¿Ofrecen envío?
                <span className="text-primary">+</span>
              </summary>
              <p className="text-muted-foreground mt-4">
                Sí, ofrecemos servicios de envío seguro. Contáctanos para
                cotizaciones y detalles de envío.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="my-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            ¿Listo para descubrir tu próxima obra maestra?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Explora nuestra colección, conecta con artistas, o comparte tu
            visión con nosotros hoy.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/obras">
              <Button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary w-full rounded-lg px-8 py-3 font-semibold sm:w-auto">
                Explora Obras
              </Button>
            </Link>
            <Link href="/artistas">
              <Button
                variant="outline"
                className="border-primary-foreground w-full rounded-lg bg-transparent px-8 py-3 font-semibold sm:w-auto"
              >
                Conoce a los Artistas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
