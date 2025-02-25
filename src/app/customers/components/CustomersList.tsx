"use client";

import { endpoints } from "@/lib/api-endpoints";
import CustomerCard from "./CustomerCard";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { Customer, CustomerStatus } from "@/types/customer";
import { useSearchParams } from "next/navigation";
import useWebSocketData from "@/hooks/useWebSocketData";

/**
 * Component that renders a list of customers based on search parameters and filters.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses WebSocket data to fetch and display a list of customers.
 * It filters customers based on category and status search parameters.
 * If no customers match the filters or if all customers are inactive, a message is displayed.
 *
 * @component
 *
 * @example
 * ```tsx
 * <CustomersList />
 * ```
 *
 * @function
 * @name CustomersList
 */
export default function CustomersList() {
  const matchFilters = (customer: Customer) => {
    const filters = Object.fromEntries(searchParams.entries());
    if (filters.category && customer.category !== filters.category) return false;
    if (filters.status && customer.status !== filters.status) return false;
    return true;
  };

  const searchParams = useSearchParams(); 
  const { data: customers, setData: setCustomers } = useWebSocketData<Customer>(matchFilters, "id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const filters = Object.fromEntries(searchParams.entries());
      console.log("Buscando clientes con parámetros:", filters);
      const data = await endpoints.getCustomers(filters);
      setCustomers(data);
      setLoading(false);
    };

    fetchCustomers();
  }, [searchParams]); 

  return (
    <div>
      {loading ? (
      <Loading />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers?.length > 0 && customers.some((customer) => customer.status !== CustomerStatus.Inactive) ? (
        customers
        .filter((customer) => customer.status !== CustomerStatus.Inactive)
        .map((customer) => <CustomerCard key={customer.id} customer={customer} />)
      ) : (
        <p className="text-gray-500 text-center">No hay clientes disponibles.</p>
      )}
      </div>
      )}
    </div>
  );
}
