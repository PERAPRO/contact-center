interface Customer {
    id: number;
    name: string;
    logo: string;
    category: string;
    country: string;
    lastUpdate: number;
    status: CustomerStatus;
}

enum CustomerStatus {
    Waiting = "waiting",
    InProgress = "in-progress",
    Inactive = "inactive",
}

export { CustomerStatus };
export type { Customer };