import { Button } from "@/shared/components";

export const Pricing = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            Planes de Afiliación para Artistas
          </h2>
          <p className="text-lg text-[#d4cec5] max-w-2xl mx-auto">
            Forma parte de la comunidad de El Rincón del Arte. Apoyamos a los
            artistas en cada etapa de su carrera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Emerging Artist Plan */}
          <div className="border border-[#5a5a5a] p-8 hover:border-[#c17855] transition">
            <h3 className="text-2xl font-serif font-bold mb-2">Suscripción</h3>
            <p className="text-[#d4cec5] text-sm mb-6">
              Para artistas emergentes
            </p>
            <div className="mb-8">
              <span className="text-4xl font-serif font-bold">C$370.00</span>
              <span className="text-[#d4cec5] text-sm">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
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
            <Button className="w-full bg-[#c17855] hover:bg-[#a85d45] text-white rounded-none py-3 hover:cursor-pointer">
              Afiliarse Ahora
            </Button>
          </div>

          {/* Elite Artist Plan */}
          <div className="border border-[#5a5a5a] p-8 hover:border-[#c17855] transition">
            <h3 className="text-2xl font-serif font-bold mb-2">
              Comisión sobre venta
            </h3>
            <p className="text-[#d4cec5] text-sm mb-6">
              Para maestros del arte
            </p>
            <div className="mb-8">
              <span className="text-4xl font-serif font-bold">10%</span>
              <span className="text-[#d4cec5] text-sm">/obra vendida</span>
            </div>
            <ul className="space-y-4 mb-8">
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
            <Button className="w-full bg-[#c17855] hover:bg-[#a85d45] text-white rounded-none py-3 hover:cursor-pointer">
              Afiliarse Ahora
            </Button>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-[#5a5a5a]">
          <p className="text-[#d4cec5] mb-4">
            ¿Necesitas un plan personalizado?{" "}
            <span className="text-[#c17855] font-semibold">Contáctanos</span>
          </p>
          <Button
            variant="outline"
            className="border-[#c17855] text-[#c17855] hover:bg-[#1a1a1a] rounded-none bg-transparent"
          >
            Programar una consulta
          </Button>
        </div>
      </div>
    </section>
  );
};
