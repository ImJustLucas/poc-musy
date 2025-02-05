"use client";

import { Room as RoomType } from "@/shared/types/room";
import React from "react";
import { roomService } from "@/services/fetcher/room";
import { authRoomEvents } from "@/services/socket.io/room/authentication.events";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.context";

type RoomCard = {
  room: RoomType;
};

const RoomCard: React.FC<RoomCard> = ({ room }) => {
  const router = useRouter();
  const { pseudo, socketId } = useUser();

  const handleOnClick = async (roomId: string) => {
    const { success, data } = await roomService.joinRoom(roomId, {
      pseudo,
      clientSocketId: socketId,
    });

    if (success) {
      authRoomEvents.join({
        roomId: data.roomSocketId,
        pseudo: pseudo,
      });
      router.push(`room/${room.roomSocketId}`);
    }
  };
  return (
    <div
      className="w-full flex justify-between gap-2 rounded-lg py-4 px-6 bg-blue500 duration-200 hover:bg-blue400 hover:cursor-pointer"
      onClick={() => handleOnClick(room.roomSocketId)}
    >
      <div className="flex gap-2 items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6667 7.33331C11.7734 7.33331 12.6601 6.43998 12.6601 5.33331C12.6601 4.22665 11.7734 3.33331 10.6667 3.33331C9.56008 3.33331 8.66675 4.22665 8.66675 5.33331C8.66675 6.43998 9.56008 7.33331 10.6667 7.33331ZM5.33342 7.33331C6.44008 7.33331 7.32675 6.43998 7.32675 5.33331C7.32675 4.22665 6.44008 3.33331 5.33342 3.33331C4.22675 3.33331 3.33341 4.22665 3.33341 5.33331C3.33341 6.43998 4.22675 7.33331 5.33342 7.33331ZM5.33342 8.66665C3.78008 8.66665 0.666748 9.44665 0.666748 11V12C0.666748 12.3666 0.966748 12.6666 1.33341 12.6666H9.33342C9.70008 12.6666 10.0001 12.3666 10.0001 12V11C10.0001 9.44665 6.88675 8.66665 5.33342 8.66665ZM10.6667 8.66665C10.4734 8.66665 10.2534 8.67998 10.0201 8.69998C10.0334 8.70665 10.0401 8.71998 10.0467 8.72665C10.8067 9.27998 11.3334 10.02 11.3334 11V12C11.3334 12.2333 11.2867 12.46 11.2134 12.6666H14.6667C15.0334 12.6666 15.3334 12.3666 15.3334 12V11C15.3334 9.44665 12.2201 8.66665 10.6667 8.66665Z"
            fill="white"
          />
        </svg>
        <div>
          {Object.values(room.members ?? {}).length}・{room.name}
        </div>
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12L5 12M19 12L13 18M19 12L13 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default RoomCard;
