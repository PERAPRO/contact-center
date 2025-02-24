import UsersClient from "./UsersClient";

export const metadata = {
  title: "Usuarios",
  description: "Consulta la lista de usuarios en tiempo real.",
};

export default function UsersPage() {
  return <UsersClient />;
}
