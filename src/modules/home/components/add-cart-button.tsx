"use client";

import { ArtworkEntity } from "@/modules/admin";
import { useCommerceCartStore } from "@/modules/admin/order/store/commerce-cart.store";
import { Button } from "@/shared/components/button/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type Props = {
  artwork: ArtworkEntity;
};
export const AddCartButton = ({ artwork }: Props) => {
  const { addArtwork } = useCommerceCartStore();

  const handleAddToCart = () => {
    addArtwork(artwork);
    toast.success(`${artwork.name} agregado al carrito.`);
  };
  return (
    <Button
      className="opacity-50 transition hover:opacity-100"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
};
