"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { auth } from "@/core/services/api/auth/loginService";

interface User {
  name: string;
  last_name: string;
}

interface Credentials {
    username: string,
    password: string,
}

interface SessionContextType {
  user: User | null;
  login: (userData: Credentials) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (credentials: Credentials) => {
    const res = auth(credentials)
    if (res != null) {
        const token = document.cookie
          .split("; ")
          .find(row => row.startsWith("access-token="))
          ?.split("=")[1];

        if (token) {
          console.log("token", token);
        }
        
    }
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook para consumir el contexto
export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) throw new Error("useSession debe usarse dentro de un SessionProvider");
    return context;
  };
