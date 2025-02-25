"use client";

import { endpoints } from "@/lib/api-endpoints";
import AgentCard from "./AgentCard";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { Agent } from "@/types/agent";
import { useSearchParams, useRouter } from "next/navigation";
import useWebSocketData from "@/hooks/useWebSocketData";

export default function AgentsList() {
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
    <div>
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