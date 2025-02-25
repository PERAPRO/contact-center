"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  label: string;
  value: string | number;
}

interface FilterSelectProps {
  label: string;
  paramKey: string;
  options: FilterOption[];
  basePath: string; // Se agrega el path base para saber si es "customers" o "agents"
}

/**
 * Generic filter select component.
 *
 * @param {string} label - Label for the select dropdown.
 * @param {string} paramKey - Query parameter key for filtering.
 * @param {FilterOption[]} options - Available filter options.
 * @param {string} basePath - Base path for routing (e.g., "/customers" or "/agents").
 *
 * @example
 * <FilterSelect label="Estado" paramKey="status" options={statusOptions} basePath="/customers" />
 */
export default function FilterSelect({ label, paramKey, options, basePath }: FilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(paramKey) || "";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    router.replace(`${basePath}?${params.toString()}`);
  };

  return (
    <select className="p-2 border rounded" value={selectedValue} onChange={(e) => handleFilterChange(e.target.value)}>
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
