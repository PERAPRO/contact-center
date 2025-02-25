
import Filters from "./components/Filters";
import AgentsList from "./components/AgentsList";

export const metadata = {
  title: "Agentes",
  description: "Página de agentes disponibles del Contact Center.",
  icons: "/favicon-32x32.png",
}


/**
 * AgentsPage component renders the main page for displaying agents.
 * It includes a title, a Filters component, and a AgentsList component.
 *
 * @returns {JSX.Element} The rendered AgentsPage component.
 */
export default function AgentsPage() {
    return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Agentes Disponibles</h1>
      <Filters />
        <AgentsList />
    </div>
  );
}