interface Agent {
    id: number;
    name: string;
    profilePicture: string;
    status: AgentStatus
    position: string;
    country: string;
    lastUpdate: number;
}

enum AgentStatus {
    Active = "active",
    Inactive = "inactive",
    InCall = "in-call",
    InBreak = "in-break",
}

export { AgentStatus };
export type { Agent };