"use client";

import Input from "@/components/input";
import MainButton from "@/components/mainButton";
import Image from "next/image";
import { socket } from "@/services/socket.io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user.context";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { pseudo, setPseudo } = useUser();

  socket.emit("room:test");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateRoom = async () => {
    if (pseudo) {
      const res = await fetch("http:localhost:1337/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo }),
      });
      const { roomId } = await res.json();
      if (roomId) {
        window.location.href = `/room/${roomId}`;
      }
    }
  };

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <Image
          className={`mb-8 transition-all duration-1000 ${
            loaded ? "w-2/4" : "w-full"
          }`}
          src="/white_logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div
          className={`flex flex-col gap-2 min-w-60 transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Input
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <Link href="/join-room" className="w-full flex flex-col">
            <MainButton text="Rejoindre une salle" disabled={!pseudo} />
          </Link>
          <MainButton
            text="Créer une salle"
            disabled={!pseudo}
            onClick={() => handleCreateRoom()}
          />
        </div>
      </div>
    </div>
  );
}
