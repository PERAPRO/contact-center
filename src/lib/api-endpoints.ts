import { Customer } from "@/types/customer"
import { fetchAPI } from "./api"
import { Agent } from "@/types/agent"

const API_ENDPOINTS = {
    customers: "/customers",
    agents: "/agents",
    user : "/user"
}

export const endpoints = {
    getCustomers: (params?: Record<string, any>) => 
        fetchAPI<Customer[]>(API_ENDPOINTS.customers, params),

    getAgents: (params?: Record<string, any>) =>
        fetchAPI<Agent[]>(API_ENDPOINTS.agents, params),

    getUser: () =>
        fetchAPI<User>(API_ENDPOINTS.user)
}