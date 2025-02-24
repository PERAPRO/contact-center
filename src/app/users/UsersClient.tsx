"use client"; 
import { useUsers } from "@/hooks/useUsers";

export const generateMetadata = () => ({
  title: "Lista de Usuarios - Mi App",
  description: "Consulta la lista de usuarios en tiempo real.",
});

export default function UsersPage() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold">Lista de Usuarios</h1>
      <ul className="mt-4">
        {users?.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
