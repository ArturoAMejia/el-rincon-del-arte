import { Button, Card, CardContent, CardHeader } from "@/shared/components";

export const StatsSite = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
          Explora Nuestra Colección de Arte
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-12">
          Explora nuestro catálogo completo de obras de arte de artistas
          emergentes y establecidos. Descubre piezas que inspiran, desafían y
          transforman.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 text-center">
            <CardHeader className="text-4xl font-serif font-bold mb-2">
              500+
            </CardHeader>
            <CardContent>
              <p className="mb-4">Obras de Arte Disponibles</p>
              <Button className="w-full">Explorar Obras</Button>
            </CardContent>
          </Card>
          <Card className="p-8 text-center ">
            <CardHeader className="text-4xl font-serif font-bold mb-2">
              45+
            </CardHeader>
            <CardContent>
              <p className="mb-4">Artistas Destacados</p>
              <Button className="w-full">Descubrir Artistas</Button>
            </CardContent>
          </Card>
          <Card className="p-8 text-center ">
            <CardHeader className="text-4xl font-serif font-bold mb-2">
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
