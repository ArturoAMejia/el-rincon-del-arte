export const MainHero = () => {
  return (
    <section className="animate-fade-in animate-delay-200 relative flex h-[600px] items-center justify-center overflow-hidden md:h-[700px]">
      <div className="absolute inset-0 opacity-20">
        <div className="bg-accent absolute top-20 left-20 h-72 w-72 rounded-full mix-blend-multiply blur-3xl filter"></div>
        <div className="bg-muted absolute right-20 bottom-20 h-72 w-72 rounded-full mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="relative z-10 max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-foreground mb-6 text-5xl font-light tracking-tighter sm:text-6xl lg:text-7xl">
          Descubre Obras de Arte Extraordinarias de artistas nicaragüenses
        </h2>
        <p className="text-foreground/60 mb-8 text-lg font-light">
          Explora nuestra colección curada de arte nicaragüense, desde piezas
          clásicas hasta contemporáneas, y encuentra la obra perfecta para ti.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-medium transition-colors">
            Explorar Obras
          </button>
          <button className="border-border text-foreground hover:bg-muted rounded-lg border px-8 py-3 font-medium transition-colors">
            Ver Artistas
          </button>
        </div>
      </div>
    </section>
  );
};
