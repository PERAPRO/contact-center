import Filters from "./components/Filters";
import CustomersList from './components/CustomersList';

export const metadata = {
  title: "Clientes",
  description: "Página de clientes en espera del Contact Center.",
  icons: "/favicon-32x32.png",
}

/**
 * CustomersPage component renders the main page for displaying customers.
 * It includes a title, a Filters component, and a CustomersList component.
 *
 * @returns {JSX.Element} The rendered CustomersPage component.
 */
export default function CustomersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes en Espera</h1>
      <Filters />
      <CustomersList />
    </div>
  );
}
