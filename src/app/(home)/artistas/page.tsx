import { getArtistsAction, getArtworksAction } from "@/modules/admin";
import { Button } from "@/shared/components";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

const ArtistPage = async () => {
  const artists = await getArtistsAction();

  const total = await getArtworksAction();

  return (
    <main className="bg-background text-foreground">
      <section className="px-4 pt-12 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 font-serif text-6xl leading-tight font-bold tracking-tight sm:text-7xl">
            Nuestros Artistas
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
            Conoce a los talentosos artistas que forman parte de nuestra
            comunidad. Desde creadores emergentes hasta nombres consagrados,
            cada uno aporta una perspectiva única al mundo del arte
            contemporáneo.
          </p>
        </div>
      </section>

      {/* Artists Bento Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-3">
            {/* Featured Artist - Large Card */}
            <div className="bg-card border-border overflow-hidden rounded-lg border transition hover:shadow-xl md:col-span-2">
              <div className="grid grid-cols-2">
                <div className="bg-secondary text-muted-foreground flex aspect-square items-center justify-center rounded-lg font-serif">
                  Artist Image
                </div>
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <p className="text-primary mb-2 text-xs font-semibold tracking-widest uppercase">
                      Artista Destacado
                    </p>
                    <h3 className="mb-2 font-serif text-3xl font-bold">
                      {artists.data[0].name}
                    </h3>
                    <p className="mb-4 text-sm text-[#5a5a5a]">
                      {artists.data[0].style}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-[#5a5a5a]">
                      {artists.data[0].bio}
                    </p>
                  </div>
                  <div className="mb-6 flex gap-8">
                    <div>
                      <div className="font-serif text-2xl font-bold text-[#c17855]">
                        {total.data.length}+
                      </div>
                      <p className="text-xs tracking-wide text-[#5a5a5a] uppercase">
                        Obras
                      </p>
                    </div>
                  </div>
                  <Link href={`/artistas/${artists.data[0].id}`}>
                    <Button className="w-full cursor-pointer rounded-none">
                      Ver artista <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Side Featured Stats */}
            <div className="flex flex-col justify-between bg-[#2d2d2d] p-8 text-white">
              <div>
                <h4 className="mb-6 font-serif text-xl font-bold"></h4>
                <div className="space-y-6">
                  <div>
                    <div className="mb-1 font-serif text-4xl font-bold text-[#c17855]">
                      {artists.data.length}+
                    </div>
                    <p className="text-sm text-[#d4cec5]">
                      Artistas destacados
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 font-serif text-4xl font-bold text-[#c17855]">
                      {total.data.length}+
                    </div>
                    <p className="text-sm text-[#d4cec5]">Total de obras</p>
                  </div>
                  <div>
                    <div className="mb-1 font-serif text-4xl font-bold text-[#c17855]">
                      28
                    </div>
                    <p className="text-sm text-[#d4cec5]">
                      Countries Represented
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="mt-8 w-full rounded-none">
                Formar parte de la comunidad
              </Button>
            </div>

            {/* Artist Cards Grid */}
            {artists.data.slice(1).map((artist, idx) => (
              <div
                key={idx}
                className="group flex cursor-pointer flex-col justify-between border p-6 transition hover:shadow-lg"
              >
                <div className="mb-4 flex h-40 items-center justify-center bg-[#f0ede8] font-serif text-sm text-[#5a5a5a] transition group-hover:bg-[#e8e1d9]">
                  Artist Image
                </div>
                <div className="flex-grow">
                  <h4 className="mb-1 font-serif text-lg font-bold">
                    {artist.name}
                  </h4>
                  <p className="mb-3 text-xs tracking-wide text-[#c17855] uppercase">
                    {artist.style}
                  </p>
                  <p className="mb-4 text-xs leading-relaxed text-[#5a5a5a]">
                    {artist.bio}
                  </p>
                </div>
                <div className="mb-4 flex justify-between border-t border-[#e0dada] py-3">
                  <div>
                    <div className="font-serif font-bold text-[#c17855]">
                      {total.data.length}+
                    </div>
                    <p className="text-xs text-[#5a5a5a]">Obras</p>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-[#c17855]">
                      {total.data.length}+
                    </div>
                    <p className="text-xs text-[#5a5a5a]">Exposiciones</p>
                  </div>
                </div>
                <Link href={`/artistas/${artist.id}`}>
                  <Button
                    variant={"secondary"}
                    className="w-full cursor-pointer rounded-none text-sm"
                  >
                    Ver artista
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2d2d2d] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold sm:text-6xl">
            ¿Eres un artista? Únete a nosotros hoy mismo.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-[#d4cec5]">
            Comparte tu visión única con una audiencia global y forma parte de
            una comunidad vibrante de creadores. ¡Regístrate ahora y lleva tu
            carrera artística al siguiente nivel!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="rounded-none bg-[#c17855] px-8 py-3 text-white hover:bg-[#a85d45]">
              Envíanos tu portafolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-none border-[#c17855] bg-transparent px-8 py-3 text-[#c17855] hover:bg-[#1a1a1a]"
            >
              <Mail className="mr-2 h-4 w-4" /> contacto@elrincondelarte.art
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArtistPage;
