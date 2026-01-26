"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
import { useCommerceCartStore } from "@/modules/admin/order/store/commerce-cart.store";
import { CardNumberField } from "./credit-card-input";
import { ExpiryDateField } from "./date-credit-card";
import { OrderReview } from "./order-review";
import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";
import { putOrderInCheckoutAction } from "../../actions/checkout/checkout.actions";
import { toast } from "sonner";

const { useSession } = createAuthClient();

const checkoutFormSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  firstName: z.string().min(1, "Nombre requerido"),
  lastName: z.string().min(1, "Apellido requerido"),
  address: z.string().min(1, "Dirección requerida"),
  city: z.string().min(1, "Ciudad requerida"),
  state: z.string().min(1, "Estado requerido"),
  zipCode: z.string().min(1, "Código postal requerido"),
  country: z.string().min(1, "País requerido"),
  cardNumber: z.string().min(1, "Número de tarjeta requerido"),
  cardExpiry: z.string().min(1, "Fecha de expiración requerida"),
  cardCvc: z.string().min(1, "CVC requerido"),
});
type CheckoutForm = z.infer<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, subtotal } = useCommerceCartStore();
  const [step, setStep] = useState(1);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),

    defaultValues: {
      email: session?.user?.email || "",
      firstName: session?.user?.name?.split(" ")[0] || "",
      lastName: session?.user?.name?.split(" ")[1] || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const values = form.getValues();
  const handleShippingNext = async () => {
    const valid = await form.trigger([
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ]);

    if (!valid) {
      console.log("Checkout errores:", form.formState.errors);
      return;
    }

    console.log("Checkout shipping step submitted", form.getValues());
    setStep(2);
  };
  const handlePaymentSubmit = form.handleSubmit((data) => {
    console.log("Checkout payment step submitted", data);
    setStep(3);
  });

  const handleSubmitOrder = async () => {
    try {
      const result = await putOrderInCheckoutAction(
        subtotal,
        subtotal * 1.15,
        subtotal * 0.15,
        session!.user!.id!,
        items
      );

      if (!result.success) {
        toast.error("Error al completar la orden");
        console.error("Error completing order:", result.error);
        return;
      }
      toast.success("Orden completada con éxito");
    } catch (error) {
      toast.error("Error al completar la orden");
      console.error("Error completing order:", error);
      return;
    }

    console.log("Order completed");
  };

  useEffect(() => {
    if (session?.session === null) return router.push("/login");
  }, [session, router]);

  return (
    <div>
      <Form {...form}>
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm font-medium">Envío</span>
                </div>
                <div
                  className={`mx-4 h-1 flex-1 ${step > 1 ? "bg-primary" : "bg-secondary"}`}
                ></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm font-medium">Pago</span>
                </div>
                <div
                  className={`mx-4 h-1 flex-1 ${step > 2 ? "bg-primary" : "bg-secondary"}`}
                ></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 3
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-sm font-medium">Revisión</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-8 lg:col-span-2">
                {/* Step 1: Envío */}
                {step === 1 && (
                  <div className="bg-card border-border rounded-lg border p-8">
                    <h2 className="mb-6 font-serif text-3xl font-bold">
                      Información de envío
                    </h2>
                    <form
                      className="space-y-6"
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleShippingNext();
                      }}
                    >
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Dirección de correo electrónico
                        </label>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <Input
                              type="email"
                              placeholder="tu@ejemplo.com"
                              className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                              {...field}
                            />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Nombre
                          </label>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="Tu nombre"
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Apellido
                          </label>
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="Tu apellido"
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Dirección
                        </label>
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <Input
                              type="text"
                              placeholder="123 Calle Principal"
                              className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                              {...field}
                            />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Ciudad
                          </label>
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="Tu ciudad"
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Departamento
                          </label>
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="Tu departamento"
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Código Postal
                          </label>
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="Tu código postal"
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium">
                                  País
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  {...field}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 transition focus:outline-none">
                                      <SelectValue placeholder="Seleccione País" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="NI">
                                      Nicaragua
                                    </SelectItem>
                                    <SelectItem value="US">
                                      Estados Unidos
                                    </SelectItem>
                                    <SelectItem value="CA">Canadá</SelectItem>
                                    <SelectItem value="UK">
                                      Reino Unido
                                    </SelectItem>
                                    <SelectItem value="AU">
                                      Australia
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Link href="/artworks">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-border text-foreground hover:bg-secondary rounded-lg bg-transparent"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Continuar
                            Comprando
                          </Button>
                        </Link>
                        <Button
                          type="submit"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground ml-auto rounded-lg"
                        >
                          Continuar al Pago{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="bg-card border-border rounded-lg border p-8">
                    <h2 className="mb-6 font-serif text-3xl font-bold">
                      Información de pago
                    </h2>
                    <form className="space-y-6" onSubmit={handlePaymentSubmit}>
                      <div>
                        <CardNumberField
                          control={form.control}
                          name="cardNumber"
                          label="Número de tarjeta"
                          containerClassName="space-y-2"
                          inputClassName="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 font-mono transition focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <ExpiryDateField
                          control={form.control}
                          name="cardExpiry"
                          inputClassName="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                        />
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            CVC
                          </label>
                          <FormField
                            control={form.control}
                            name="cardCvc"
                            render={({ field }) => (
                              <Input
                                type="text"
                                placeholder="123"
                                maxLength={4}
                                className="border-border bg-background focus:border-primary w-full rounded-lg border px-4 py-3 transition focus:outline-none"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="bg-secondary/50 border-border flex items-center gap-3 rounded-lg border p-4">
                        <Lock className="text-primary h-5 w-5 flex-shrink-0" />
                        <p className="text-muted-foreground text-sm">
                          Tus datos están seguros y cifrados. No los
                          compartiremos con nadie.
                        </p>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setStep(1)}
                          variant="outline"
                          className="border-border text-foreground hover:bg-secondary rounded-lg"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
                        </Button>
                        <Button
                          type="submit"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground ml-auto rounded-lg"
                        >
                          Revisar Orden <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="bg-card border-border rounded-lg border p-8">
                    <h2 className="mb-6 font-serif text-3xl font-bold">
                      Revisión de la orden
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-secondary/30 rounded-lg p-6">
                        <h3 className="mb-4 font-semibold">Envío a</h3>
                        <p className="text-muted-foreground">
                          {values.firstName} {values.lastName}
                          <br />
                          {values.address}
                          <br />
                          {values.city}, {values.state} {values.zipCode}
                          <br />
                          {values.country}
                        </p>
                      </div>

                      <div>
                        <h3 className="mb-4 font-semibold">Artículos</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="border-border flex items-center justify-between border-b pb-3"
                            >
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-muted-foreground text-sm">
                                  Cantidad: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                C${item.price.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          variant="outline"
                          className="border-border text-foreground hover:bg-secondary rounded-lg"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
                        </Button>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground ml-auto rounded-lg"
                          onClick={handleSubmitOrder}
                        >
                          <CreditCard className="mr-2 h-4 w-4" /> Completar
                          compra
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <OrderReview />
            </div>
          </div>
        </section>
      </Form>
    </div>
  );
};
