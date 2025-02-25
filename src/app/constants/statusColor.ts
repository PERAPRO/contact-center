import { AgentStatus } from "@/types/agent"; // Asegúrate de importar tu enum si lo tienes

export const statusColors: Record<AgentStatus, string> = {
  [AgentStatus.Active]: "bg-green-500",
  [AgentStatus.Inactive]: "bg-red-500",
  [AgentStatus.InCall]: "bg-yellow-500",
  [AgentStatus.InBreak]: "bg-gray-500",
};

export const getStatusColor = (status: AgentStatus) => statusColors[status] || "bg-gray-300";
