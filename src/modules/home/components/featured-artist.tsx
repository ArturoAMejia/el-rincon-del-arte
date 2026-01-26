import { Button } from "@/shared/components";
import Image from "next/image";

export const FeaturedArtist = () => {
  return (
    <section className="timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%] border-y border-[#e0dada] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-8 aspect-square bg-[url(/images/home/artist.jpg)] bg-contain bg-center bg-no-repeat"></div>
            <p className="mb-2 text-sm tracking-widest uppercase">
              Artista Destacada
            </p>
            <h3 className="mb-4 font-serif text-4xl font-bold sm:text-5xl">
              Marina Rothstein
            </h3>
            <p className="mb-6 leading-relaxed">
              Marina Rothstein es una artista contemporánea reconocida por su
              enfoque innovador en la pintura y la escultura. Su obra explora
              temas de identidad, memoria y transformación cultural a través de
              vibrantes colores y formas dinámicas. Ha expuesto en galerías
              internacionales y ha recibido numerosos premios por su
              contribución al arte moderno.
            </p>
            <div className="mb-8 flex gap-4">
              <div>
                <div className="font-serif text-3xl font-bold text-[#c17855]">
                  12
                </div>
                <p className="text-xs tracking-wide uppercase">Exhibitions</p>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-[#c17855]">
                  150+
                </div>
                <p className="text-xs tracking-wide uppercase">Works Sold</p>
              </div>
            </div>
            <Button className="rounded-none bg-[#c17855] px-8 py-3 text-white hover:bg-[#a85d45]">
              View Artist Profile
            </Button>
          </div>
          <div className="space-y-4">
            <Image
              width={600}
              height={600}
              alt="Featured Artist Works"
              src={"/images/home/banner-image.jpg"}
              className="h-auto w-full object-cover"
            />
            {/* <div className="bg-[#d4cec5] h-48 flex items-center justify-center font-serif "></div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-[#f0ede8] font-serif text-sm">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-2.jpg"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-32 items-center justify-center bg-[#f0ede8] font-serif text-sm">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-3.jpg"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-32 items-center justify-center bg-[#f0ede8] font-serif text-sm">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-4.webp"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-32 items-center justify-center bg-[#f0ede8] font-serif text-sm">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-5.jpg"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
