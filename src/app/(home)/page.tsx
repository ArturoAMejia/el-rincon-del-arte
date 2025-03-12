import { FeaturedArt } from "@/components/home/featured-art";
import { MainContent } from "@/components/home/main-content";
// import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full">
      <MainContent />
      <FeaturedArt />
    </section>
  );
}
