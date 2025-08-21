import { ReactNode } from "react"
import { Footer, Header } from "@/shared/components"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl mt-28">{children}</main>
      <Footer />
    </>
  )
}
