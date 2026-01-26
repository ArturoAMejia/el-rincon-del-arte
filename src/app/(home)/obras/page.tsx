import { ArtworkCard } from "@/modules";
import { getArtworksAction } from "@/modules/admin/artwork/actions/artwork.actions";
import { Button } from "@/shared/components";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const ArtworkPage = async () => {
  const artworks = await getArtworksAction();

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="border-r px-4 pt-12 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 font-serif text-6xl leading-tight font-bold tracking-tight sm:text-7xl">
            Explora Nuestras Obras
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
            Descubre una cuidada selección de obras de arte que abarcan diversos
            estilos y medios. Desde piezas contemporáneas hasta clásicos
            atemporales, nuestra colección ofrece algo para cada amante del
            arte.
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6">
              Todas las obras
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-secondary rounded-lg bg-transparent px-6"
            >
              Filtros y categorías
            </Button>
          </div>
        </div>
      </section>

      {/* Artworks Bento Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-4">
            {/* Featured Large Artwork */}

            <Link
              href={`/obras/${artworks.data[0].id}`}
              className="bg-secondary group block cursor-pointer overflow-hidden rounded-lg md:col-span-2 md:row-span-2"
            >
              <div className="from-primary/40 to-primary relative flex h-96 min-h-96 flex-col justify-between bg-gradient-to-br p-8 md:h-full">
                <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-white uppercase opacity-90">
                      Obra Destacada
                    </p>
                  </div>
                  <Heart className="h-6 w-6 text-white opacity-70 transition hover:opacity-100" />
                </div>
                <div className="relative z-10">
                  <h3 className="mb-2 font-serif text-4xl font-bold text-white">
                    {artworks.data[0].name}
                  </h3>
                  <p className="mb-2 text-sm text-white opacity-90">
                    {artworks.data[0].artist}
                  </p>
                  <p className="text-xs text-white opacity-80">
                    {artworks.data[0].category}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-white">
                      C${artworks.data[0].price.toFixed(2)}
                    </span>
                    <Button className="rounded-none bg-white px-4 py-2 text-sm text-[#c17855] hover:bg-[#f0ede8]">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al
                      carrito
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
            {/* Link wrapper applied above to preserve styles */}

            {/* Top Right - Medium Card */}
            <div className="group cursor-pointer overflow-hidden border border-[#e0dada] bg-white transition hover:shadow-lg md:col-span-1">
              <div className="flex h-40 items-center justify-center bg-[#d4cec5] font-serif text-sm text-[#5a5a5a]">
                Image
              </div>
              <div className="p-4">
                <h4 className="mb-1 font-serif text-sm font-bold">
                  {artworks.data[1].name}
                </h4>
                <p className="mb-2 text-xs text-[#c17855]">
                  {artworks.data[1].artist}
                </p>
                <p className="mb-3 text-xs text-[#5a5a5a]">
                  {artworks.data[1].category}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">
                    C${artworks.data[1].price.toFixed(2)}
                  </span>
                  <ShoppingCart className="h-4 w-4 text-[#c17855] opacity-50 transition hover:opacity-100" />
                </div>
              </div>
            </div>

            {/* Middle Right - Small Card */}
            <div className="group flex cursor-pointer flex-col justify-between bg-[#2d2d2d] p-4 text-white transition hover:shadow-lg md:col-span-1">
              <div className="mb-3 flex h-32 items-center justify-center bg-[#5a5a5a] font-serif text-xs text-[#d4cec5]">
                Image
              </div>
              <div>
                <h4 className="mb-1 font-serif text-sm font-bold">
                  {artworks.data[2].name}
                </h4>
                <p className="mb-2 text-xs text-[#d4cec5]">
                  {artworks.data[2].artist}
                </p>
                <p className="text-xs font-semibold text-[#c17855]">
                  C${artworks.data[2].price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Bottom Right - Small Card */}
            <div className="group flex cursor-pointer flex-col justify-between border border-[#e0dada] bg-white p-4 transition hover:shadow-lg md:col-span-1">
              <div className="mb-3 flex h-32 items-center justify-center bg-[#f0ede8] font-serif text-xs text-[#5a5a5a]">
                Image
              </div>
              <div>
                <h4 className="mb-1 font-serif text-sm font-bold">
                  {artworks.data[3].name}
                </h4>
                <p className="mb-2 text-xs text-[#c17855]">
                  {artworks.data[3].artist}
                </p>
                <p className="text-xs font-semibold text-[#5a5a5a]">
                  C${artworks.data[3].price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Remaining Artwork Cards */}
            {artworks.data.slice(4).map((artwork, idx) => (
              <ArtworkCard key={artwork.id} artwork={artwork} idx={idx} />
              // <div
              //   key={idx}
              //   className={`group cursor-pointer overflow-hidden border border-[#e0dada] transition hover:shadow-lg dark:border-[#5a5a5a] ${
              //     idx === 0 ? "md:col-span-2" : "md:col-span-1"
              //   }`}
              // >
              //   <div
              //     className={`${
              //       idx === 0 ? "h-48 md:h-64" : "h-40"
              //     } flex items-center justify-center bg-[#e8e1d9] font-serif text-sm text-[#5a5a5a] dark:bg-[#3a3a3a] dark:text-[#d4cec5]`}
              //   >
              //     Image
              //   </div>
              //   <div className="p-4">
              //     <h4 className="mb-1 font-serif text-sm font-bold">
              //       {artwork.name}
              //     </h4>
              //     <p className="mb-2 text-xs text-[#c17855]">
              //       {artwork.artist}
              //     </p>
              //     <p className="mb-4 text-xs text-[#5a5a5a]">
              //       {artwork.category}
              //     </p>
              //     <div className="flex items-center justify-between border-t border-[#e0dada] pt-3">
              //       <span className="text-sm font-bold">
              //         C${artwork.price.toFixed(2)}
              //       </span>
              //       <div className="flex gap-2">
              //         <button className="text-[#c17855] opacity-50 transition hover:opacity-100">
              //           <ShoppingCart className="h-4 w-4" />
              //         </button>
              //         <button className="text-[#c17855] opacity-50 transition hover:opacity-100">
              //           <Share2 className="h-4 w-4" />
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Button className="rounded-none bg-[#c17855] px-12 py-3 text-white hover:bg-[#a85d45]">
            Cargar más obras
          </Button>
          <p className="mt-4 text-sm text-[#5a5a5a]">
            Mostrando 8 de más de 1,200 obras
          </p>
        </div>
      </section>

      {/* Collection Stats */}
      {/* <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#2d2d2d] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-serif font-bold text-[#c17855] mb-2">
              1,200+
            </div>
            <p className="text-[#d4cec5]">Original Artworks</p>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-[#c17855] mb-2">
              45+
            </div>
            <p className="text-[#d4cec5]">Artists Featured</p>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-[#c17855] mb-2">
              $850K+
            </div>
            <p className="text-[#d4cec5]">Total Sales Value</p>
          </div>
          <div>
            <div className="text-5xl font-serif font-bold text-[#c17855] mb-2">
              28
            </div>
            <p className="text-[#d4cec5]">Countries Represented</p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="border-y border-[#e0dada] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold sm:text-6xl">
            ¿Interesado en una obra?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-[#5a5a5a]">
            Contáctanos para consultas personalizadas, comisiones o para obtener
            más información sobre una pieza específica.
          </p>
          <Link href="/contacto">
            <Button className="rounded-none bg-[#c17855] px-8 py-3 text-white hover:bg-[#a85d45]">
              Contacto <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ArtworkPage;
