import Image from "next/image";

export const FeaturedArtwork = () => {
  return (
    <section
      id="exhibitions"
      className="timeline-view animate-fade-in-left animate-range-[entry_5%_contain_20%] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-5xl font-bold sm:text-6xl">
          Obras Destacadas
        </h2>

        <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-3">
          {/* Large Featured Exhibition */}
          <div className="group cursor-pointer overflow-hidden bg-[#e8e1d9] md:col-span-2 md:row-span-2">
            <div className="relative h-96 min-h-96 overflow-hidden bg-gradient-to-br from-[#c17855] to-[#a85d45] md:h-full">
              <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30">
                <Image
                  src={"/images/home/banner-image.jpg"}
                  alt="Featured Exhibition"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="mb-2 font-serif text-4xl font-bold">
                  Chromatic Visions
                </h3>
                <p className="text-sm opacity-90">
                  A groundbreaking collection exploring color and form
                </p>
              </div>
            </div>
          </div>

          {/* Top Right Small Card */}
          <div className="flex h-full flex-col justify-between border border-[#e0dada] bg-[#c17855] p-6 transition hover:shadow-lg">
            <div className="mb-4 h-40 bg-[#d4cec5]">
              <Image
                src={"/images/home/artwork-2.webp"}
                alt="Top Right Artwork"
                width={160}
                height={160}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div>
              <h4 className="text-foreground mb-2 font-serif text-xl font-bold">
                New Horizons
              </h4>
              <p className="text-sm text-[#5a5a5a]">
                Emerging artists showcase
              </p>
            </div>
          </div>

          {/* Bottom Right Card 1 */}
          <div className="flex flex-col justify-between bg-[#2d2d2d] p-6 text-white transition hover:shadow-lg">
            <div className="mb-4">
              <div className="mb-4 h-12 w-12 bg-[#c17855]"></div>
            </div>
            <div>
              <h4 className="mb-1 font-serif text-lg font-bold">
                Sculpture Space
              </h4>
              <p className="text-xs text-[#d4cec5]">3D installations & forms</p>
            </div>
          </div>

          {/* Bottom Right Card 2 */}
          <div className="flex flex-col justify-between border border-[#e0dada] bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 h-32 bg-[#e8e1d9]"></div>
            <div>
              <h4 className="mb-1 font-serif text-lg font-bold">
                Digital Dreams
              </h4>
              <p className="text-xs text-[#5a5a5a]">NFT & new media art</p>
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-between border border-[#e0dada] bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 h-32 bg-[#e8e1d9]"></div>
            <div>
              <h4 className="mb-1 font-serif text-lg font-bold">
                Digital Dreams
              </h4>
              <p className="text-xs text-[#5a5a5a]">NFT & new media art</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
