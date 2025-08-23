import { FacebookIcon, InstagramIcon } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  const date = new Date()
  return (
    <footer className="h-auto bg-primary">
      <nav className="flex flex-wrap justify-center p-8">
        <div className="flex w-full flex-col items-center gap-4 p-12 md:w-1/2 lg:w-1/4">
          <div>
            <Link href="/" className="flex items-center">
              {/* <img className="w-32" src="/img/logo.png" alt="" /> */}
              logo
            </Link>
          </div>
          <div className="text-center text-sm font-light text-[#D3D3D3] md:text-sm">
            El Rincon del Arte es un marketplace de arte para artistas y
            coleccionistas.
          </div>
          <div className="flex gap-2">
            <FacebookIcon className="h-6 w-6 text-[#D3D3D3]" />

            <InstagramIcon className="h-6 w-6 text-[#D3D3D3]" />
          </div>
        </div>
      </nav>
      <nav className="bg-black p-3 text-center text-sm text-white">
        Copyright &#169; {date.getFullYear()} DevNica Solutions. Todos los
        derechos reservados.
      </nav>
    </footer>
  )
}
