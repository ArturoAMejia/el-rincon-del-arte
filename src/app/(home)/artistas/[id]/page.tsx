import { getArtistByIdAction, getArtworkByArtist } from "@/modules/admin";
import { Button } from "@/shared/components";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const artist = await getArtistByIdAction(Number(id));
  const artworks = await getArtworkByArtist(Number(id));
  return (
    <main className="bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/artistas"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Regresar a Artistas
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="bg-secondary top-24 mb-8 aspect-square rounded-lg"></div>

              {/* Contact Section */}
              <div className="bg-card border-border rounded-lg border p-8">
                <h3 className="mb-6 font-serif text-lg font-bold">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full justify-start gap-2 rounded-lg">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-border flex-1 rounded-lg bg-transparent"
                      asChild
                    >
                      todo
                      {/* <a
                        href={artist.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-4 w-4" />
                      </a> */}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border flex-1 rounded-lg bg-transparent"
                      asChild
                    >
                      todo
                      {/* <a
                        href={artist.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                      </a> */}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 space-y-4">
                <div className="bg-card border-border rounded-lg border p-6 text-center">
                  <div className="text-primary mb-1 font-serif text-3xl font-bold">
                    {artworks.data.length}+
                  </div>
                  <p className="text-muted-foreground text-xs tracking-widest uppercase">
                    Exhibitions
                  </p>
                </div>
                <div className="bg-card border-border rounded-lg border p-6 text-center">
                  <div className="text-primary mb-1 font-serif text-3xl font-bold">
                    {
                      artworks.data.filter((artowork) => artowork.size_id !== 1)
                        .length
                    }
                    +
                  </div>
                  <p className="text-muted-foreground text-xs tracking-widest uppercase">
                    Works Sold
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <p className="text-primary mb-2 text-sm font-semibold tracking-widest uppercase">
                  Perfil del Artista
                </p>
                <h1 className="mb-4 font-serif text-5xl font-bold sm:text-6xl">
                  {artist.data?.name}
                </h1>
                <p className="text-muted-foreground mb-2 text-lg">
                  {artist.data?.birthday}
                </p>
                <p className="text-muted-foreground text-sm">
                  {/* Joined Veritas Gallery in {artist.data?.} */}
                </p>
              </div>

              {/* Bio */}
              <div className="mb-12">
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {artist.data?.bio}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {/* {artist.data?.longBio} */}
                </p>
              </div>

              {/* Awards */}
              <div className="mb-12">
                <h3 className="mb-6 font-serif text-2xl font-bold">
                  Recognition & Awards
                </h3>
                <ul className="space-y-3">
                  {/* {artist.data?.awards.map((award, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                      <span className="font-semibold">{award}</span>
                    </li>
                  ))} */}
                  asda
                </ul>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="mb-6 font-serif text-2xl font-bold">
                  Specialties
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="bg-secondary rounded-lg p-6">
                    <p className="text-center font-semibold">Mixed Media</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-6">
                    <p className="text-center font-semibold">
                      Contemporary Painting
                    </p>
                  </div>
                  <div className="bg-secondary rounded-lg p-6">
                    <p className="text-center font-semibold">
                      Sculpture & Installation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artworks Section */}
          <div>
            <h2 className="mb-12 font-serif text-4xl font-bold">
              Featured Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {artworks.data.map((work) => (
                <Link
                  key={work.id}
                  href={`/artworks/${work.id}`}
                  className="group"
                >
                  <div className="bg-secondary mb-4 aspect-square rounded-lg transition group-hover:shadow-lg"></div>
                  <h4 className="group-hover:text-primary mb-2 font-serif text-lg font-bold transition">
                    {work.name}
                  </h4>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {work.size}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {work.collection}
                      </p>
                    </div>
                    <p className="text-primary text-lg font-semibold">
                      {work.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All CTA */}
            <div className="mt-16 flex justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg px-8 py-3">
                View All Artworks <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="bg-accent text-accent-foreground px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Interested in Collaboration?
          </h2>
          <p className="text-accent-foreground/75 mb-8 text-lg">
            Marina Rothstein is available for commissions, exhibitions, and
            special projects. Contact the gallery to discuss opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3">
              Get in Touch
            </Button>
            <Button
              variant="outline"
              className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 rounded-lg bg-transparent px-8 py-3"
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
