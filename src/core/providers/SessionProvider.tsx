"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from "@/core/services/api/auth/loginService";
import { getSession } from "@/core/services/api/user/userService";
import { set } from "zod";
import Cookies from "js-cookie";

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

  useEffect(() => {
    const fetchSession = async () => {
      const res =  await getSession();
    };
    fetchSession();
  }, []);

  const login = (credentials: Credentials) => {
    auth(credentials).then(res => {
      setUser(res.user);
    });
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
