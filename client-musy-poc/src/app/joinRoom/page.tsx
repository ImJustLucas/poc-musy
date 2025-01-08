// Join room
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MainButton from "@/components/mainButton";
import RoomCard from "@/components/roomCard";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <h1 className="text-white text-3xl font-semibold my-8">
          Liste des salles
        </h1>
        <RoomCard />
      </div>
    </div>
  );
}
