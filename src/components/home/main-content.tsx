import Image from "next/image";
import React from "react";

export const MainContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4 mb-8 p-4 md:p-0">
      <div className="md:col-span-2 md:row-span-5">
        <Image
          alt="Bento 1"
          src={"/images/home/bento-2.jpg"}
          width={500}
          height={300}
          className="rounded-md w-full"
        />
      </div>
      <div className="md:col-span-3 md:row-span-3 md:col-start-3 bg-secondary rounded-md p-4 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-center">
          Bienvenidos al Rincón del Arte!
        </h1>
      </div>
      <div className="md:col-span-3 md:row-span-2 md:col-start-3 md:row-start-4 bg-secondary-accent rounded-md p-4 flex items-center justify-center">
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea facilis
          laborum autem esse officiis? Architecto porro doloremque quas
          distinctio.
        </p>
      </div>
    </div>
  );
};
