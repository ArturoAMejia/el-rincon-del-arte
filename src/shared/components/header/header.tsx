"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-light tracking-widest text-foreground">
              El Rincón del Arte
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              INICIO
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              ARTISTAS
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              OBRAS
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5 text-center"
            >
              SOBRE NOSOTROS
            </Link>
            <Link
              href="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors hover:cursor-pointer hover:underline hover:underline-offset-5"
            >
              CONTACTO
            </Link>
          </nav>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart size={20} className="text-foreground" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            <Link
              href="#"
              className="block text-sm text-foreground/70 hover:text-foreground py-2 transition-colors"
            >
              INICIO
            </Link>
            <Link
              href="#"
              className="block text-sm text-foreground/70 hover:text-foreground py-2 transition-colors"
            >
              ARTISTAS
            </Link>
            <Link
              href="#"
              className="block text-sm text-foreground/70 hover:text-foreground py-2 transition-colors"
            >
              OBRAS
            </Link>
            <Link
              href="#"
              className="block text-sm text-foreground/70 hover:text-foreground py-2 transition-colors"
            >
              SOBRE NOSOTROS
            </Link>
            <Link
              href="#"
              className="block text-sm text-foreground/70 hover:text-foreground py-2 transition-colors"
            >
              CONTACTO
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
