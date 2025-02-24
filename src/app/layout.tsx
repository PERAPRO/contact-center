"use client";
import "@/styles/index.css";
import { UserProvider, useUser } from "@/context/UserContext";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <html lang="es">
        <body className="flex h-screen bg-gray-100">
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </UserProvider>
  );
}

/**
 * MainLayout component that provides the main structure for the application layout.
 * It includes a sidebar, a navigation bar, and a main content area.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed within the main layout.
 *
 * @returns {JSX.Element} The rendered MainLayout component.
 */
function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex flex-col flex-grow min-h-screen transition-all duration-300">

        <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 p-2 focus:outline-none"
          >
            ☰
          </button>
          <h1 className="text-2xl font-semibold">📞 Contact Center</h1>
          <UserProfile />
        </nav>

        <main className="flex-grow mt-16 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

function UserProfile() {
  const { user } = useUser();
  if (!user) return <div>Cargando...</div>;

  return (
    <div className="flex items-center gap-2">
      <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full" />
      <span className="text-gray-700">{user.name}</span>
    </div>
  );
}
