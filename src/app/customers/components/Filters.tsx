"use client";
import { useRouter, useSearchParams } from "next/navigation";

const timeOptions = [
  { label: "5 min", value: 5 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1 hora", value: 60 },
  { label: "1 hora y media", value: 90 },
  { label: "2 horas", value: 120 },
  { label: "Más de 2 horas", value: 121 }
];

/**
 * Filters component for customer filtering options.
 *
 * This component provides three dropdown filters for selecting customer category, 
 * wait time, and status. The selected filter values are used to update the URL 
 * search parameters and navigate to the filtered customer list.
 *
 * @returns {JSX.Element} The Filters component.
 *
 * @example
 * <Filters />
 *
 * @component
 */
export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedTime = searchParams.get("time") || "";
  const selectedStatus = searchParams.get("status") || "";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/customers?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex gap-4">
      <select className="p-2 border rounded" value={selectedCategory}  onChange={(e) => handleFilterChange("category", e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="Básico">Básico</option>
        <option value="Pro">Pro</option>
        <option value="Premium">Premium</option>
      </select>
      <select className="p-2 border rounded" value={selectedTime} onChange={(e) => handleFilterChange("time", e.target.value)}>
        <option value="">Tiempo de espera</option>
        {timeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select className="p-2 border rounded" value={selectedStatus} onChange={(e) => handleFilterChange("status", e.target.value)}>
        <option value="">Todos los estados</option>
        <option value="waiting">Esperando</option>
        <option value="in-progress">En progreso</option>
      </select>
    </div>
  );
}
