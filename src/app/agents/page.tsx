
import Filters from "./components/Filters";
import AgentsList from "./components/AgentsList";

export default function AgentsPage() {
    return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Agentes Disponibles</h1>
      <Filters />
        <AgentsList />
    </div>
  );
}