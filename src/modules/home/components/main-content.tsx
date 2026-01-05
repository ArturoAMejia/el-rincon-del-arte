import Image from "next/image";

export const MainContent = () => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4 mb-8 p-4 md:p-0">
    //   <div className="md:col-span-2 md:row-span-5">
    //     <Image
    //       alt="Bento 1"
    //       src={"/images/home/bento-2.jpg"}
    //       width={500}
    //       height={300}
    //       className="rounded-md w-full"
    //     />
    //   </div>
    //   <div className="md:col-span-3 md:row-span-3 md:col-start-3 bg-secondary rounded-md p-4 flex items-center justify-center">
    //     <h1 className="text-5xl font-bold text-center">
    //       Bienvenidos al Rincón del Arte!
    //     </h1>
    //   </div>
    //   <div className="md:col-span-3 md:row-span-2 md:col-start-3 md:row-start-4 bg-secondary-accent rounded-md p-4 flex items-center justify-center">
    //     <p className="text-center">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea facilis
    //       laborum autem esse officiis? Architecto porro doloremque quas
    //       distinctio.
    //     </p>
    //   </div>
    // </div>
    <section className="py-32 w-full flex flex-col items-center justify-center space-y-20">
      <section className="lg:py-15 container relative max-w-5xl py-10 md:py-12">
        <div className="">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Una nueva forma
            <br />
            de vender arte.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-2xl md:text-3xl">
            El Rincón del Arte es la plataforma líder para que los artistas
            exhiban y vendan sus obras de arte en línea.
          </p>
        </div>
        <div className="absolute inset-0 z-[-1] -translate-y-1/2 blur-[100px] will-change-transform">
          <div className="bg-gradient-1/25 -translate-x-1/5 absolute right-0 top-0 h-[400px] w-[800px] rounded-full"></div>
          <div className="bg-gradient-2/10 absolute right-0 top-0 size-[400px] rounded-full"></div>
        </div>
        <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_80%)]">
          <svg
            width="32"
            height="32"
            className="text-foreground/[0.05] h-full w-full"
          >
            <defs>
              <pattern
                id="plus-pattern-:S1:"
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="8"
                  y1="5"
                  x2="8"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
                <line
                  x1="5"
                  y1="8"
                  x2="11"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1"
                ></line>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#plus-pattern-:S1:)"
            ></rect>
          </svg>
        </div>
      </section>

      {/* todo carrousel */}
      {/* 
      <section className="lg:pb-15 my-5 pb-10 md:my-8 md:pb-12 lg:my-12">
        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          data-slot="carousel"
        >
          <div className="overflow-hidden" data-slot="carousel-content">
            <div
              className="flex -ml-4"
              style={{ transform: "translate3d(0px, 0px, 0px)" }}
            >
              <div
                role="group"
                aria-roledescription="slide"
                data-slot="carousel-item"
                className="min-w-0 shrink-0 grow-0 pl-4 basis-[80%] lg:basis-1/3 xl:basis-[40%]"
              >
                <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                  <Image
                    src="/images/home/bento-2.jpg"
                    alt="Charter team member working"
                    className="object-cover"
                    fill={true}
                  />
                </div>
              </div>
              <div
                role="group"
                aria-roledescription="slide"
                data-slot="carousel-item"
                className="min-w-0 shrink-0 grow-0 pl-4 basis-[80%] lg:basis-1/3 xl:basis-[40%]"
              >
                <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                  <Image
                    src="/images/home/bento-2.jpg"
                    alt="Modern workspace setup"
                    className="object-cover"
                    fill={true}
                  />
                </div>
              </div>
              <div
                role="group"
                aria-roledescription="slide"
                data-slot="carousel-item"
                className="min-w-0 shrink-0 grow-0 pl-4 basis-[80%] lg:basis-1/3 xl:basis-[40%]"
              >
                <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                  <Image
                    src="/images/home/bento-2.jpg"
                    alt="Team collaboration"
                    className="object-cover"
                    fill={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="container">
        <div className="ml-auto mr-0 max-w-2xl space-y-5 md:space-y-8 lg:space-y-10">
          <p className="text-lg">
            Empezamos el desarrollo de El Rincón del Arte en 2019 y lo lanzamos
            en 2022. Cada funcionalidad ha sido diseñada desde cero, sin deuda
            técnica ni sistemas heredados. Estamos construidos para impulsar la
            innovación artística durante los próximos cien años.
          </p>
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            Somos una empresa un poco única — no somos una empresa tecnológica o
            fintech estándar. company.
          </h2>
          <p className="text-lg">
            Somos 100% fundadores y propiedad del equipo, rentables y mantenemos
            nuestro equipo reducido. Con el tiempo, esta página se volverá más
            pulida, pero por ahora, nos enfocamos en cumplir con los artistas.
            Si estás interesado en construir el futuro del arte, consulta
            nuestras vacantes abiertas a continuación.
          </p>
        </div>
      </section>
      <section className="lg:py-15 container py-10 md:py-12">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-semibold tracking-tight md:text-4xl">
              El equipo fundador
            </h2>
            <p className="mt-5 text-lg md:mt-6">
              Somos un equipo pequeño y dedicado de ingenieros y diseñadores
              apasionados por el arte y la tecnología. Creemos en el poder del
              arte para transformar vidas y estamos comprometidos a crear una
              plataforma que empodere a los artistas y conecte con los amantes
              del arte en todo el mundo.
            </p>
          </div>
          <Image
            src="/images/home/bento-2.jpg"
            alt="Founding team collaboration"
            width="480"
            height="400"
            className="order-1 object-cover md:order-2"
          />
        </div>
      </section>
    </section>
  );
};
