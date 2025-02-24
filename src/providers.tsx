"use client"; // 👈 Obligatorio para poder usar React Query en el cliente

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // ⚡ Evita recrearlo en cada render

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
