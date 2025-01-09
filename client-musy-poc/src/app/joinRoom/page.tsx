// Join room
"use client";
import RoomCard from "@/components/roomCard";
import Link from "next/link";
import { useState } from "react";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <h1 className="text-white text-3xl font-semibold my-8">
          Liste des salles
        </h1>
        <Link href="/waitingRoom" className="w-full">
          <RoomCard />
        </Link>
      </div>
    </div>
  );
}
