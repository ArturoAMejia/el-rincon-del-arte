import React from "react"
import Image from "next/image"

export const BannerPromotion = () => {
  return (
    <section className="flex items-center justify-center w-full p-4 my-8 gap-4 bg-primary/80 rounded-md">
      <div>
        <h2 className="text-3xl font-bold">Promoción del mes!</h2>
        <p className="text-lg">
          Por la compra de 1 obra de nuestros artistas, la entrega será gratis!!
        </p>
      </div>
      <div>
        <Image
          src={"/images/home/banner-image.jpg"}
          alt={"banner image"}
          width={500}
          height={300}
          className="rounded-md"
        />
      </div>
    </section>
  )
}
