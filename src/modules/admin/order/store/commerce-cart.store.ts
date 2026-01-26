"use client";

import { create } from "zustand";
import { ArtworkEntity } from "@/modules/admin/artwork";
import { persist, createJSONStorage } from "zustand/middleware";

interface CommerceCartState {
  items: ArtworkEntity[];
  addArtwork: (artwork: ArtworkEntity) => void;
  removeArtwork: (artworkId: number) => void;
  clear: () => void;
  subtotal: number;
}

export const useCommerceCartStore = create<CommerceCartState>()(
  persist(
    (set) => ({
      items: [],
      addArtwork: (artwork) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === artwork.id);

          if (existing) {
            return state;
          }

          return {
            items: [...state.items, artwork],
            subtotal:
              state.items.reduce((acc, item) => acc + item.price, 0) +
              artwork.price,
          };
        }),
      removeArtwork: (artworkId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== artworkId),
          subtotal: state.items
            .filter((item) => item.id !== artworkId)
            .reduce((acc, item) => acc + item.price, 0),
        })),
      clear: () => set({ items: [], subtotal: 0 }),
      subtotal: 0,
    }),
    {
      name: "commerce-cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
