import { BannerPromotion } from "@/modules/home/components/banner-promotion";
import { FeaturedCategories } from "@/modules/home/components/featured-categories";
import { MainContent } from "@/modules/home/components/main-content";
import { MainHero } from "@/modules/home/components/main-hero";
// import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full">
      <MainHero />
      <MainContent />
      <FeaturedCategories />
      <BannerPromotion />
    </section>
  );
}
