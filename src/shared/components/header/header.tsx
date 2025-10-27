"use client"
import { useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "../button"
import { ThemeToggle } from "../theme-toggle"
import Image from "next/image"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-primary backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 md:px-0">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              className="w-32"
              src="/img/logo.png"
              alt=""
              width={100}
              height={100}
            />
          </Link>

          <button
            className="text-[#D3D3D3 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } absolute left-0 top-20 w-full bg-primary lg:relative lg:top-0 lg:block lg:w-auto lg:bg-transparent`}
          >
            <ul className="flex flex-col items-center gap-6 p-4 lg:flex-row lg:p-0">
              <li>
                <Link
                  href="/"
                  className="text-[#D3D3D3] hover:underline hover:decoration-accent hover:decoration-4"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/artistas"
                  className="text-[#D3D3D3] hover:underline hover:decoration-accent hover:decoration-4"
                >
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/obras"
                  className="text-[#D3D3D3] hover:underline hover:decoration-accent hover:decoration-4"
                >
                  Obras
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-[#D3D3D3] hover:underline hover:decoration-accent hover:decoration-4"
                >
                  Contacto
                </Link>
              </li>

              <li>
                <Link href={"/obras"}>
                  <Button className="bg-secondary-accent font-bold text-black">
                    ¡Ver más!
                  </Button>
                </Link>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
