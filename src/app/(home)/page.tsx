import { BannerPromotion } from "@/modules/home/components/banner-promotion"
import { FeaturedCategories } from "@/modules/home/components/featured-categories"
import { MainContent } from "@/modules/home/components/main-content"
// import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full">
      <MainContent />
      <FeaturedCategories />
      <BannerPromotion />
    </section>
  )
}
