import { Button } from "@/shared/components";

export const Pricing = () => {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold sm:text-6xl">
            Planes de Afiliación para Artistas
          </h2>
          <p className="text-accent mx-auto max-w-2xl text-lg">
            Forma parte de la comunidad de El Rincón del Arte. Apoyamos a los
            artistas en cada etapa de su carrera.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Emerging Artist Plan */}
          <div className="border border-[#5a5a5a] p-8 transition hover:border-[#c17855]">
            <h3 className="mb-2 font-serif text-2xl font-bold">Suscripción</h3>
            <p className="text-accent mb-6 text-sm">Para artistas emergentes</p>
            <div className="mb-8">
              <span className="font-serif text-4xl font-bold">C$370.00</span>
              <span className="text-accent text-sm">/mes</span>
            </div>
            <ul className="mb-8 space-y-4">
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Hasta 5 obras de arte listadas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Página de perfil del artista</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Promoción en redes sociales</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">0% comisión de galería</span>
              </li>
            </ul>
            <Button className="w-full rounded-none bg-[#c17855] py-3 text-white hover:cursor-pointer hover:bg-[#a85d45]">
              Afiliarse Ahora
            </Button>
          </div>

          {/* Elite Artist Plan */}
          <div className="border border-[#5a5a5a] p-8 transition hover:border-[#c17855]">
            <h3 className="mb-2 font-serif text-2xl font-bold">
              Comisión sobre venta
            </h3>
            <p className="text-accent mb-6 text-sm">Para maestros del arte</p>
            <div className="mb-8">
              <span className="font-serif text-4xl font-bold">10%</span>
              <span className="text-accent text-sm">/obra vendida</span>
            </div>
            <ul className="mb-8 space-y-4">
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Obras de arte ilimitadas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Gerente dedicado</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Exposiciones trimestrales</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#c17855]">✓</span>
                <span className="text-sm">Ubicación premium</span>
              </li>
            </ul>
            <Button className="w-full rounded-none bg-[#c17855] py-3 text-white hover:cursor-pointer hover:bg-[#a85d45]">
              Afiliarse Ahora
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-[#5a5a5a] pt-8 text-center">
          <p className="text-accent mb-4">
            ¿Necesitas un plan personalizado?{" "}
            <span className="font-semibold text-[#c17855]">Contáctanos</span>
          </p>
          <Button
            variant="outline"
            className="rounded-none border-[#c17855] bg-transparent text-[#c17855] hover:bg-[#1a1a1a]"
          >
            Programar una consulta
          </Button>
        </div>
      </div>
    </section>
  );
};
