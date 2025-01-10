import RoomCard from "@/components/roomCard";
import { Room as RoomType } from "@/shared/types/room";

type APIResponse<K> = {
  success: boolean;
  data: K;
};

export default async function JoinRoom() {
  const baseURL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:1337";

  const data = await fetch(`${baseURL}/room`);
  const response = (await data.json()) as APIResponse<RoomType[]>;

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <h1 className="text-white text-3xl font-semibold my-8">
          Liste des salles
        </h1>

        {response.data.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>
    </div>
  );
}
