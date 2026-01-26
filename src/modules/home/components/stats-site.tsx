import { Button, Card, CardContent, CardHeader } from "@/shared/components";

export const StatsSite = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-6 font-serif text-5xl font-bold sm:text-6xl">
          Explora Nuestra Colección de Arte
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg">
          Explora nuestro catálogo completo de obras de arte de artistas
          emergentes y establecidos. Descubre piezas que inspiran, desafían y
          transforman.
        </p>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="p-8 text-center">
            <CardHeader className="mb-2 font-serif text-4xl font-bold">
              500+
            </CardHeader>
            <CardContent>
              <p className="mb-4">Obras de Arte Disponibles</p>
              <Button className="w-full">Explorar Obras</Button>
            </CardContent>
          </Card>
          <Card className="p-8 text-center">
            <CardHeader className="mb-2 font-serif text-4xl font-bold">
              45+
            </CardHeader>
            <CardContent>
              <p className="mb-4">Artistas Destacados</p>
              <Button className="w-full">Descubrir Artistas</Button>
            </CardContent>
          </Card>
          <Card className="p-8 text-center">
            <CardHeader className="mb-2 font-serif text-4xl font-bold">
              12
            </CardHeader>
            <CardContent>
              <p className="mb-4">Colecciones</p>
              <Button className="w-full">Explorar Colecciones</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
