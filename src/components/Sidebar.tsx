import Link from "next/link";

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Agentes", href: "/agents" },
  { name: "Clientes", href: "/customers" },
  { name: "Reportes", href: "/" },
  { name: "Configuración", href: "/" },
  { name: "Soporte", href: "/" }
];

/**
 * Sidebar component that renders a sidebar menu.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the sidebar is open or closed.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
export function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 h-screen flex-shrink-0 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="p-4 text-lg font-semibold border-b border-gray-600">Menú</div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="block px-4 py-2 hover:bg-gray-700">
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}