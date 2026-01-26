"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { CartDrawer } from "@/modules/home/components/cart-drawer";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-foreground font-serif text-xl tracking-widest">
              El Rincón del Arte
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-8 font-serif md:flex">
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              INICIO
            </Link>
            <Link
              href="/artistas"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              ARTISTAS
            </Link>
            <Link
              href="/obras"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              OBRAS
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-foreground/70 hover:text-foreground text-center text-sm transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              SOBRE NOSOTROS
            </Link>
            <Link
              href="/contacto"
              className="text-foreground/70 hover:text-foreground text-sm transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              CONTACTO
            </Link>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4">
            <CartDrawer />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="mt-4 space-y-2 pb-4 md:hidden">
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground block py-2 text-sm transition-colors"
            >
              INICIO
            </Link>
            <Link
              href="/artistas"
              className="text-foreground/70 hover:text-foreground block py-2 text-sm transition-colors"
            >
              ARTISTAS
            </Link>
            <Link
              href="/obras"
              className="text-foreground/70 hover:text-foreground block py-2 text-sm transition-colors"
            >
              OBRAS
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-foreground/70 hover:text-foreground block py-2 text-sm transition-colors"
            >
              SOBRE NOSOTROS
            </Link>
            <Link
              href="/contacto"
              className="text-foreground/70 hover:text-foreground block py-2 text-sm transition-colors"
            >
              CONTACTO
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
