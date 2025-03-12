import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl mt-28">{children}</main>
      <Footer />
    </>
  );
}
