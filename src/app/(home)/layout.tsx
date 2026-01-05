import { ReactNode } from "react";
import { Footer, Header } from "@/shared/components";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
