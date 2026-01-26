import { FeaturedArtwork } from "@/modules";
import { ContactForm } from "@/modules/home/components/contact-form";
import { FeaturedArtist } from "@/modules/home/components/featured-artist";
import { MainContent } from "@/modules/home/components/main-content";
import { MainHero } from "@/modules/home/components/main-hero";
import { Pricing } from "@/modules/home/components/pricing";
import { StatsSite } from "@/modules/home/components/stats-site";

export default function Home() {
  const images = [
    "/images/home/artwork-1.avif",
    "/images/home/artwork-2.webp",
    "/images/home/artwork-3.jpg",
    "/images/home/banner-image.jpg",
  ];

  return (
    <section className="w-full">
      <MainHero />
      <MainContent images={images} />
      <FeaturedArtist />
      <StatsSite />
      <FeaturedArtwork />
      <Pricing />
      <ContactForm />
    </section>
  );
}
