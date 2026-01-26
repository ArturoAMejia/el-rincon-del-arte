"use client";

import Link from "next/link";
import { useCommerceCartStore } from "@/modules/admin/order/store/commerce-cart.store";
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const CartDrawer = () => {
  const { items, removeArtwork } = useCommerceCartStore();

  const handleRemoveItem = (artworkId: number) => {
    removeArtwork(artworkId);
    toast.info("Artículo eliminado del carrito.");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold">
              {items.length}
            </span>
          )}
          <span className="sr-only">Carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:w-96">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="text-muted-foreground mb-4 h-12 w-12 opacity-50" />
              <p className="text-muted-foreground mb-4">
                Tu carrito está vacío
              </p>
              <Link href="/obras">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continuar comprando
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-border flex gap-4 rounded-lg border p-4"
                >
                  <div className="bg-secondary h-20 w-20 flex-shrink-0 rounded-lg"></div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <p className="text-muted-foreground text-xs">
                        {item.artist}
                      </p>
                    </div>
                    <p className="text-primary font-semibold">
                      C${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-border flex-col gap-4 border-t pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                {/* <span>${total.toLocaleString()}</span> */}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span>Calculado al finalizar la compra</span>
              </div>
              <div className="border-border flex justify-between border-t pt-2 text-lg font-semibold">
                <span>Total</span>
                {/* <span className="text-primary">${total.toLocaleString()}</span> */}
              </div>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg py-6">
                Proceder al pago
              </Button>
            </Link>
            <Link href="/obras" className="w-full">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary w-full rounded-lg bg-transparent py-6"
              >
                Continuar comprando
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
