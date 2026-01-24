import { Button } from "@/shared/components";
import Image from "next/image";

export const FeaturedArtist = () => {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-20  border-y border-[#e0dada] timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]
"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-[url(/images/home/artist.jpg)] aspect-square mb-8 bg-contain bg-center bg-no-repeat"></div>
            <p className="text-sm  uppercase tracking-widest mb-2">
              Artista Destacada
            </p>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
              Marina Rothstein
            </h3>
            <p className=" mb-6 leading-relaxed">
              Marina Rothstein es una artista contemporánea reconocida por su
              enfoque innovador en la pintura y la escultura. Su obra explora
              temas de identidad, memoria y transformación cultural a través de
              vibrantes colores y formas dinámicas. Ha expuesto en galerías
              internacionales y ha recibido numerosos premios por su
              contribución al arte moderno.
            </p>
            <div className="flex gap-4 mb-8">
              <div>
                <div className="text-3xl font-serif font-bold text-[#c17855]">
                  12
                </div>
                <p className="text-xs  uppercase tracking-wide">Exhibitions</p>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#c17855]">
                  150+
                </div>
                <p className="text-xs  uppercase tracking-wide">Works Sold</p>
              </div>
            </div>
            <Button className="bg-[#c17855] hover:bg-[#a85d45] text-white rounded-none px-8 py-3">
              View Artist Profile
            </Button>
          </div>
          <div className="space-y-4">
            <Image
              width={600}
              height={600}
              alt="Featured Artist Works"
              src={"/images/home/banner-image.jpg"}
              className="w-full h-auto object-cover"
            />
            {/* <div className="bg-[#d4cec5] h-48 flex items-center justify-center font-serif "></div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f0ede8] h-32  font-serif text-sm ">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-2.jpg"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#f0ede8] h-32 flex items-center justify-center font-serif text-sm ">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-3.jpg"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#f0ede8] h-32 flex items-center justify-center font-serif text-sm ">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-4.webp"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#f0ede8] h-32 flex items-center justify-center font-serif text-sm ">
                <Image
                  width={600}
                  height={600}
                  alt="Featured Artist Works"
                  src={"/images/home/art-5.jpg"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
