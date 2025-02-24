export default function LandingPage() {
  return (
    <div className="h-full flex flex-col items-center p-4 bg-gray-100">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center">
        <img src="/assets/DanielPerez.jpeg" alt="Daniel Pérez" className="w-32 h-32 rounded-full mx-auto mb-4" />
        
        <h1 className="text-3xl font-bold mb-2">Hola, soy Daniel Pérez</h1>
        <p className="text-gray-700 text-lg mb-4">
          Estudio Ingeniería de Sistemas en la Universidad Nacional de Colombia. Me apasionan las competencias de programación
          y utilizar la tecnología para resolver problemas reales de manera eficiente.
        </p>
        
        <h2 className="text-2xl font-semibold mb-2">Sobre este proyecto</h2>
        <p className="text-gray-600 text-lg text-justify">
          En este desarrollo, implementé una aplicación en Next.js para un Contact Center, donde se listan
          agentes y clientes en espera. La aplicación utiliza WebSockets para actualizaciones en tiempo real y permite
          aplicar filtros dinámicos.
        </p>
        <p className="text-gray-600 text-lg text-justify mt-2">
          Se crearon componentes reutilizables como tarjetas de información para agentes y clientes, y un sistema
          de filtrado eficiente. Además, optimicé el manejo del estado y las peticiones con `useEffect`, evitando
          actualizaciones innecesarias o errores de memoria.
        </p>
        
        <p className="text-gray-800 font-semibold mt-4">¡Gracias por visitar mi trabajo! 🚀</p>
      </div>
    </div>

  );
}
