import FilterSelect from "@/components/FilterSelect";

const timeOptions = [
  { label: "< 5 min", value: 5 },
  { label: "< 15 min", value: 15 },
  { label: "< 30 min", value: 30 },
  { label: "< 45 min", value: 45 },
  { label: "< 1 hora", value: 60 },
  { label: "< 1 hora y media", value: 90 },
  { label: "< 2 horas", value: 120 },
  { label: "Más de 2 horas", value: 121 }
];

const statusOptions = [
  { label: "Esperando", value: "waiting" },
  { label: "En progreso", value: "in-progress" }
];

const categoryOptions = [
  { label: "Básico", value: "Básico" },
  { label: "Pro", value: "Pro" },
  { label: "Premium", value: "Premium" }
];

export default function Filters() {
  return (
    <div className="mb-4 flex gap-4">
      <FilterSelect label="Todas las categorías" paramKey="category" options={categoryOptions} basePath="/customers" />
      <FilterSelect label="Tiempo de espera" paramKey="time" options={timeOptions} basePath="/customers" />
      <FilterSelect label="Estado" paramKey="status" options={statusOptions} basePath="/customers" />
    </div>
  );
}
