"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AgentStatus } from "@/types/agent";

/**
 * Filters component for filtering agents based on their status.
 *
 * @param {Object} props - The component props.
 * @param {string} props.entity - The entity to filter.
 *
 * @returns {JSX.Element} The rendered Filters component.
 *
 * This component uses the `useRouter` and `useSearchParams` hooks to manage
 * the URL parameters for filtering agents. It provides a dropdown to select
 * the agent status (Active or Inactive) and updates the URL accordingly.
 *
 * @example
 * <Filters entity="agents" />
 */
export default function Filters({ entity }: { entity: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedStatus = searchParams.get("status") || "";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/${entity}?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex gap-4">
      <select className="p-2 border rounded" value={selectedStatus} onChange={(e) => handleFilterChange("status", e.target.value)}>
        <option value="">Todos los estados</option>
        <option value={AgentStatus.Active}>Activo</option>
        <option value={AgentStatus.Inactive}>Inactivo</option>
      </select>
    </div>
  );
}