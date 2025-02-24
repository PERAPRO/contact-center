"use client";
import { Customer, CustomerStatus } from "@/types/customer";
import { useState, useEffect } from "react";

/**
 * A React component that displays a customer's information in a card format.
 * The card includes the customer's logo, name, country, category, and the elapsed time since the last update.
 * The border color of the card changes based on the customer's status.
 *
 * @param {Object} props - The component props.
 * @param {Customer} props.customer - The customer object containing the details to be displayed.
 * @returns {JSX.Element} The rendered customer card component.
 */
export default function CustomerCard({ customer }: { customer: Customer }) {
  const [elapsedTime, setElapsedTime] = useState("--:.--:--");

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = Date.now();
      const timeDiff = Math.floor((now - customer.lastUpdate) / 1000);
      // Why this comes into negative values?
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
  }, [customer.lastUpdate]);

  const borderColor =   customer.status === CustomerStatus.Waiting ? "border-red-500" :
                        customer.status === CustomerStatus.InProgress ? "border-yellow-500" : "border-gray-300";

  return (
    <div className={`p-4 bg-white shadow-md rounded-lg flex flex-col items-center gap-2 border-2 ${borderColor}`}>
      <img src={customer.logo} alt={customer.name} className="w-16 h-16 rounded-full" />
      <h2 className="text-lg font-bold">{customer.name}</h2>
      <p className="text-sm text-gray-600">{customer.country}</p>
      <p className="text-sm text-gray-600">Categoría: {customer.category}</p>
      <p className="text-xs text-gray-500">Tiempo en espera: {elapsedTime}</p>
    </div>
  );
}