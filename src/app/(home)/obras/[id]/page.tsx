import { getArtworkByArtist, getArtworkByIdAction } from "@/modules/admin";
import { Badge, Button } from "@/shared/components";
import { statusLabels } from "@/utils/status-app";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function ArtworkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  // const artist = await getArtistByIdAction(Number(id));
  const artwork = await getArtworkByIdAction(Number(id));

  const artistId = artwork.data?.artist_id || 0;
  const artworks = await getArtworkByArtist(Number(artistId));
  return (
    <main className="bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/obras"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Regresar a Obras
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="bg-secondary mb-8 aspect-square overflow-hidden rounded-lg lg:aspect-auto lg:h-[600px]">
                {/* Artwork image placeholder */}
              </div>

              {/* Action Buttons */}
              <div className="mb-12 flex gap-4">
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary flex-1 gap-2 rounded-lg"
                >
                  <Heart
                  // className={`h-5 w-5 ${liked ? "fill-primary text-primary" : ""}`}
                  />
                  {/* {liked ? "Liked" : "Like"} */}
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary flex-1 gap-2 rounded-lg bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                  Compartir
                </Button>
              </div>

              {/* Long Description */}
              <div className="mb-12">
                <h3 className="mb-4 font-serif text-xl font-bold">
                  Descripción
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {artwork.data?.description}
                </p>
              </div>

              {/* Related Works */}
              <div>
                <h3 className="mb-6 font-serif text-2xl font-bold">
                  Más obras de {artwork.data?.artist}
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {artworks.data.slice(0, 3).map((work) => (
                    <Link
                      key={work.id}
                      href={`/obras/${work.id}`}
                      className="group"
                    >
                      <div className="bg-secondary mb-4 h-48 rounded-lg transition group-hover:shadow-lg"></div>
                      <h4 className="group-hover:text-primary font-serif font-bold transition">
                        {work.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {work.category}
                      </p>
                      <p className="text-primary text-sm font-semibold">
                        C${work.price.toFixed(2)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border-border sticky top-24 rounded-lg border p-8">
                {/* Price and Status */}
                <div className="mb-8">
                  <p className="text-muted-foreground mb-2 text-xs tracking-widest uppercase">
                    Precio
                  </p>
                  <h2 className="text-primary mb-4 font-serif text-4xl font-bold">
                    C${artwork.data?.price.toFixed(2)}
                  </h2>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold">
                      {statusLabels[artwork.data?.state_id || 1]}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="border-border mb-8 space-y-4 border-b pb-8">
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Artista
                    </p>
                    <Link
                      href={`/artists/${artwork.data?.artist_id}`}
                      className="hover:text-primary font-serif text-lg font-bold transition"
                    >
                      {artwork.data?.artist}
                    </Link>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Nombre
                    </p>
                    <p className="font-semibold">{artwork.data?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Dimensiones
                    </p>
                    <p className="font-semibold">{artwork.data?.dimension}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Tamaño
                    </p>
                    <p className="font-semibold">{artwork.data?.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Colección
                    </p>
                    <p className="font-semibold">{artwork.data?.collection}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs tracking-widest uppercase">
                      Categoría
                    </p>
                    <Badge variant={"secondary"} className="font-semibold">
                      {artwork.data?.category}
                    </Badge>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full gap-2 rounded-lg py-3">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar al Carrito
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="border-border mt-8 border-t pt-8">
                  <p className="text-muted-foreground mb-4 text-xs tracking-widest uppercase">
                    ¿Preguntas?
                  </p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Contacta la galería para más información sobre esta obra.
                  </p>
                  <Link href="/contacto">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary w-full justify-start p-0 hover:bg-transparent"
                    >
                      Contactar →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
