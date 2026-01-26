"use client";

import { useCommerceCartStore } from "@/modules/admin/order/store/commerce-cart.store";
import { Button } from "@/shared/components/button/button";
import { Truck } from "lucide-react";
import Link from "next/link";

export const OrderReview = () => {
  const { items, subtotal } = useCommerceCartStore();
  const tax = subtotal * 0.15;
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 500;

  return (
    <div className="bg-card border-border sticky top-8 h-fit rounded-lg border p-8">
      <h3 className="mb-6 font-serif text-2xl font-bold">
        Resumen de la orden
      </h3>

      <div className="border-border mb-6 space-y-3 border-b pb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-medium">C${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>C${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Impuesto (15%)</span>
          <span>C${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Truck className="h-4 w-4" /> Envío
          </span>
          <span className="font-medium">
            {shipping === 0 ? "Gratis" : `C$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="border-border mb-6 border-t pt-6">
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold">Total</span>
          <span className="text-primary font-serif text-2xl font-bold">
            C${(subtotal + tax + shipping).toFixed(2)}
          </span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
          ✓ ¡Envío gratis en pedidos superiores a C$15000!
        </div>
      )}

      <Link href="/artworks">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary w-full rounded-lg bg-transparent"
        >
          Continuar Comprando
        </Button>
      </Link>
    </div>
  );
};
