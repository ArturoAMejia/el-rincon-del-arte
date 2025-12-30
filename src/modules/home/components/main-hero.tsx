export const MainHero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-muted to-background overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-muted rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-4 sm:px-6">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-foreground mb-6">
          Discover Extraordinary Artwork
        </h2>
        <p className="text-lg text-foreground/60 mb-8 font-light">
          Curated collection of contemporary and traditional art from emerging
          and established artists worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Explore Collection
          </button>
          <button className="px-8 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
            View Artists
          </button>
        </div>
      </div>
    </section>
  );
};
