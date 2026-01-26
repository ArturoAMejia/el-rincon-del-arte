import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-background mt-20 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-accent mb-4 text-lg font-light">
              El Rincón del Arte
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Descubre y adquiere obras de arte nicaragüense únicas. Apoya a
              nuestros talentosos artistas y lleva la cultura de Nicaragua a tu
              hogar.
            </p>
          </div>

          <div>
            <h4 className="text-foreground mb-4 text-sm font-medium">
              Explora
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/artists"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Obras
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Afiliate a Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground mb-4 text-sm font-medium">
              Soporte
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground mb-4 text-sm font-medium">
              Síguenos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent text-sm transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-muted border-t pt-8">
          <p className="text-muted-foreground text-center text-xs">
            Copyright &#169; 2025 DevNica Solutions. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
