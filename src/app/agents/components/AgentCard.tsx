import { Agent, AgentStatus } from "@/types/agent";
import { useEffect, useState } from "react";

/**
 * A functional component that displays an agent's information card.
 * 
 * @param {Object} props - The component props.
 * @param {Agent} props.agent - The agent object containing information to be displayed.
 * 
 * @returns {JSX.Element} The rendered agent card component.
 * 
 * @component
 * 
 * @example
 * const agent = {
 *   name: "John Doe",
 *   country: "USA",
 *   position: "Support Agent",
 *   profilePicture: "path/to/picture.jpg",
 *   lastUpdate: 1633036800000,
 *   status: AgentStatus.Active
 * };
 * 
 * <AgentCard agent={agent} />
 */
export default function AgentCard({ agent }: { agent: Agent }) {
    const [elapsedTime, setElapsedTime] = useState("--:--:--");

    useEffect(() => {
    const updateElapsedTime = () => {
        const now = Date.now();
        const timeDiff = Math.floor((now - agent.lastUpdate) / 1000);
        if (timeDiff < 0) {
            setElapsedTime("0h 0m 0s");
            return;
        }
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
        setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
    }, [agent.lastUpdate]);

    const statusColor = agent.status === AgentStatus.Active ? "bg-green-500" : "bg-red-500";

    return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center gap-2 border-2 border-gray-300">
        <div className="relative">
        <img src={agent.profilePicture} alt={agent.name} className="w-16 h-16 rounded-full" />
        <span className={`absolute top-0 right-0 w-4 h-4 rounded-full ${statusColor}`} />
        </div>
        <h2 className="text-lg font-bold">{agent.name}</h2>
        <p className="text-sm text-gray-600">{agent.country}</p>
        <p className="text-sm text-gray-600">{agent.position}</p>
        <p className="text-xs text-gray-500">Tiempo en espera: {elapsedTime}</p>
    </div>
    );
}
  