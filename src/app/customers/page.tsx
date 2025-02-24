"use client";

import { endpoints } from "@/lib/api-endpoints";
import CustomerCard from "./components/CustomerCard";
import Filters from "./components/Filters";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { Customer, CustomerStatus } from "@/types/customer";
import { useSearchParams } from "next/navigation";
import useWebSocketData from "@/hooks/useWebSocketData";

/**
 * CustomersPage component fetches and displays a list of customers based on search parameters.
 * It uses WebSocket to receive real-time updates and filters customers based on category and status.
 *
 * @returns {JSX.Element} The rendered CustomersPage component.
 *
 * @component
 * @example
 * return (
 *   <CustomersPage />
 * )
 */
export default function CustomersPage() {
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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes en Espera</h1>
      <Filters />
      {loading ? (
      <Loading />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers?.length > 0 && customers.some((customer) => customer.status !== CustomerStatus.Inactive) ? (
          customers.map((customer) => <CustomerCard key={customer.id} customer={customer} />)
        ) : (
          <p className="text-gray-500 text-center">No hay clientes disponibles.</p>
        )}
      </div>
        )}
    </div>
  );
}
