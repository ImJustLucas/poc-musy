"use client";

import { socket as socketInstance } from "@/services/socket.io";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  pseudo: string;
  socketId: string;
  setPseudo: (pseudo: string) => void;
  setSocketId: (socketId: string) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [pseudo, setPseudo] = useState<string>("");
  const [socketId, setSocketId] = useState<string>(socketInstance.id ?? "");

  useEffect(() => {
    if (socketId === "" && socketInstance.id) {
      setSocketId(socketInstance.id);
    }
  }, []);

  const value = {
    pseudo,
    socketId,
    setPseudo,
    setSocketId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
