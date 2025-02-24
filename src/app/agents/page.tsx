"use client";

import { endpoints } from "@/lib/api-endpoints";
import AgentCard from "./components/AgentCard";
import Filters from "./components/Filters";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { Agent } from "@/types/agent";
import { useSearchParams, useRouter } from "next/navigation";
import useWebSocketData from "@/hooks/useWebSocketData";

/**
 * AgentsPage component fetches and displays a list of agents based on search filters.
 * 
 * @returns {JSX.Element} The rendered AgentsPage component.
 * 
 * @remarks
 * - Uses `useSearchParams` to get the current search parameters from the URL.
 * - Uses `useWebSocketData` to fetch and update agent data in real-time.
 * - Uses `useState` to manage the loading state.
 * - Uses `useEffect` to fetch agents data when search parameters change.
 * 
 * @component
 * @example
 * ```tsx
 * <AgentsPage />
 * ```
 */
export default function AgentsPage() {
  const matchFilters = (agent: Agent) => {
    const filters = Object.fromEntries(searchParams.entries());
    if (filters.status && agent.status !== filters.status) return false;
    return true;
  };
  const searchParams = useSearchParams(); 
  const {data : agents , setData: setAgents} = useWebSocketData<Agent>(matchFilters, "id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      const filters = Object.fromEntries(searchParams.entries());
      const data = await endpoints.getAgents(filters);
      setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, [searchParams]); 

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Agentes Disponibles</h1>
      <Filters entity="agents" />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents?.length > 0 ? (
            agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay agentes disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}