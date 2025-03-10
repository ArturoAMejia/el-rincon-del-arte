import { Footer } from "@/componets/shared/footer";
import { Header } from "@/componets/shared/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl">{children}</main>
      <Footer />
    </>
  );
}
