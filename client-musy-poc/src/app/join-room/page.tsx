import RoomCard from "@/components/roomCard";
import { roomService } from "@/services/fetcher/room";
import { Suspense } from "react";

export default async function JoinRoom() {
  const response = await roomService.getRooms();

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <h1 className="text-white text-3xl font-semibold my-8">
          Liste des salles
        </h1>

        <Suspense>
          {response.data.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
