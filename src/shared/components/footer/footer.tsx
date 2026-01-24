import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-light text-lg mb-4 text-accent">
              El Rincón del Arte
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Descubre y adquiere obras de arte nicaragüense únicas. Apoya a
              nuestros talentosos artistas y lleva la cultura de Nicaragua a tu
              hogar.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-foreground">
              Explora
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/artists"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Obras
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Afiliate a Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-foreground">
              Soporte
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-foreground">
              Síguenos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted pt-8">
          <p className="text-xs text-muted-foreground text-center">
            Copyright &#169; 2025 DevNica Solutions. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
