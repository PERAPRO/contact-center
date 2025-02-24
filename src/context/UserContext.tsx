"use client";
import { endpoints } from "@/lib/api-endpoints";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await endpoints.getUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
