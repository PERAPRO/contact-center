"use client";

import FilterSelect from "@/components/FilterSelect";
import { AgentStatus } from "@/types/agent";

const agentStatusOptions = [
  { label: "Activo", value: AgentStatus.Active },
  { label: "Inactivo", value: AgentStatus.Inactive }
];

export default function Filters() {
  return (
    <div className="mb-4 flex gap-4">
      <FilterSelect label="Estado del agente" paramKey="status" options={agentStatusOptions} basePath="/agents" />
    </div>
  );
}
