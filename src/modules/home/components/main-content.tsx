import { Badge, Separator } from "@/shared/components";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
export const MainContent = ({ images }: { images: string[] }) => {
  return (
    <section className="py-8 timeline-view animate-zoom-in animate-range-[entry_5%_contain_20%]">
      <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Section Header */}
        <div className="space-y-4">
          <Badge variant="outline" className="text-sm font-normal">
            Nuestra cultura
          </Badge>

          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl font-serif">
            Nuestro Portafolio de obras de arte más destacado
          </h2>

          <p className="text-muted-foreground text-xl">
            Descubre una selección curada de nuestras obras de arte más
            destacadas, que reflejan la diversidad y riqueza cultural de
            Nicaragua. Cada pieza cuenta una historia única y captura la esencia
            de nuestra herencia artística.
          </p>
        </div>

        {/* Portfolio Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Section */}
          <div className="columns-1 gap-6 sm:col-span-2 sm:columns-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="mb-6 break-inside-avoid-column overflow-hidden"
              >
                <Image
                  width={200}
                  height={200}
                  src={image}
                  alt={`Portfolio Image ${index + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="space-y-6 px-6">
            <h3 className="text-3xl font-medium font-serif">
              Arte Nicaragüense
            </h3>

            <p className="text-muted-foreground">
              Nuestro portafolio destaca lo mejor del arte nicaragüense, desde
              piezas tradicionales hasta obras contemporáneas que reflejan la
              vibrante cultura del país.
              <br />
              Cada obra ha sido seleccionada cuidadosamente para ofrecer una
              experiencia visual única que celebra la creatividad y el talento
              de los artistas nicaragüenses.
            </p>

            <Separator />

            <ul className="space-y-4">
              <li className="flex items-center gap-8">
                <span className="w-21 text-lg font-medium">Artista:</span>
                <span className="text-muted-foreground">Leonardo Da Vinci</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-21 text-lg font-medium">Estilo:</span>
                <span className="text-muted-foreground">Realismo</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-21 text-lg font-medium">Año:</span>
                <span className="text-muted-foreground">2024</span>
              </li>
            </ul>

            <Separator />

            <div className="flex items-center gap-8">
              <span className="w-21 text-lg font-medium">Compartir:</span>
              <div className="flex gap-2">
                <a href="#">
                  <FacebookIcon className="size-5.5 text-sky-600" />
                </a>
                <a href="#">
                  <InstagramIcon className="text-destructive size-5.5" />
                </a>
                <a href="#">
                  <TwitterIcon className="size-5.5 text-sky-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
