import { BannerPromotion } from "@/components/home/banner-promotion";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { MainContent } from "@/components/home/main-content";
// import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full">
      <MainContent />
      <FeaturedCategories />
      <BannerPromotion />
    </section>
  );
}
