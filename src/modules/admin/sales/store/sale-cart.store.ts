"use client";

import { create } from "zustand";
import { ArtworkEntity } from "@/modules/admin/artwork";

interface SaleCartState {
  items: ArtworkEntity[];
  addArtwork: (artwork: ArtworkEntity) => void;
  removeArtwork: (artworkId: number) => void;
  clear: () => void;
}

export const useSaleCartStore = create<SaleCartState>((set) => ({
  items: [],
  addArtwork: (artwork) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === artwork.id);

      if (existing) {
        // Quantity is fixed at 1; ignore duplicates.
        return state;
      }

      return {
        items: [...state.items, artwork],
      };
    }),
  removeArtwork: (artworkId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== artworkId),
    })),
  clear: () => set({ items: [] }),
}));
