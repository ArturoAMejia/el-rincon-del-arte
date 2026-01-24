import Image from "next/image";

export const FeaturedArtwork = () => {
  return (
    <section id="exhibitions" className="px-4 sm:px-6 lg:px-8 py-20 timeline-view animate-fade-in-left animate-range-[entry_5%_contain_20%]
">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-16">
          Obras Destacadas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {/* Large Featured Exhibition */}
          <div className="md:col-span-2 md:row-span-2 bg-[#e8e1d9] overflow-hidden group cursor-pointer">
            <div className="h-96 md:h-full min-h-96 bg-gradient-to-br from-[#c17855] to-[#a85d45] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300">
                <Image
                  src={"/images/home/banner-image.jpg"}
                  alt="Featured Exhibition"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-4xl font-serif font-bold mb-2">
                  Chromatic Visions
                </h3>
                <p className="text-sm opacity-90">
                  A groundbreaking collection exploring color and form
                </p>
              </div>
            </div>
          </div>

          {/* Top Right Small Card */}
          <div className="bg-[#c17855] border border-[#e0dada] p-6 flex flex-col justify-between h-full hover:shadow-lg transition">
            <div className="h-40 bg-[#d4cec5] mb-4">
              <Image
                src={"/images/home/artwork-2.webp"}
                alt="Top Right Artwork"
                width={160}
                height={160}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold mb-2 text-foreground">
                New Horizons
              </h4>
              <p className="text-sm text-[#5a5a5a]">
                Emerging artists showcase
              </p>
            </div>
          </div>

          {/* Bottom Right Card 1 */}
          <div className="bg-[#2d2d2d] text-white p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#c17855] mb-4"></div>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-1">
                Sculpture Space
              </h4>
              <p className="text-xs text-[#d4cec5]">3D installations & forms</p>
            </div>
          </div>

          {/* Bottom Right Card 2 */}
          <div className="bg-white border border-[#e0dada] p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="h-32 bg-[#e8e1d9] mb-4"></div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-1">
                Digital Dreams
              </h4>
              <p className="text-xs text-[#5a5a5a]">NFT & new media art</p>
            </div>
          </div>
          <div className="bg-white border border-[#e0dada] p-6 flex flex-col justify-between hover:shadow-lg transition col-span-2">
            <div className="h-32 bg-[#e8e1d9] mb-4"></div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-1">
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
