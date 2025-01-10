"use client";

import { socket as socketInstance } from "@/services/socket.io";
import { Room } from "@/shared/types/room";
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
  rooms: {
    get: Record<string, Room>;
    set: (room: Room) => void;
    getOneById: (id: string) => Room;
  };
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [pseudo, setPseudo] = useState<string>("");
  const [socketId, setSocketId] = useState<string>(socketInstance.id ?? "");
  const [rooms, setRooms] = useState<Record<string, Room>>({});

  useEffect(() => {
    if (socketId === "" && socketInstance.id) {
      setSocketId(socketInstance.id);
    }
  }, [socketInstance.id, socketId]);

  const value = {
    pseudo,
    socketId,
    setPseudo,
    setSocketId,
    rooms: {
      get: rooms,
      set: (room: Room) => {
        setRooms((prev) => ({
          ...prev,
          [room.roomSocketId]: room,
        }));
      },
      getOneById: (id: string) => rooms[id],
    },
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
