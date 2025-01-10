"use client";

import { Room, RoomState } from "@/shared/types/room";
import { WaitingRoomScreen } from "./WaitingScreen";
import { socket } from "@/services/socket.io";
import { useEffect, useState } from "react";
import { roomService } from "@/services/fetcher/room";
import { QuestionScreen } from "./QuestionScreen";

type HandleRoomStateProps = {
  room: Room;
};

export const HandleRoomState: React.FC<HandleRoomStateProps> = ({ room }) => {
  const [roomData, setRoomData] = useState(room);

  const handleStartGame = async () => {
    const response = await roomService.startGame(room.roomSocketId);

    if (response.success) {
      setRoomData(response.data);
    }
  };

  useEffect(() => {
    socket.on("room:start-game", (payload) => {
      console.log("room:start-game", payload);
    });
  });

  if (roomData.state === RoomState.WAITING_PLAYERS)
    return <WaitingRoomScreen room={roomData} startGame={handleStartGame} />;

  return <QuestionScreen />;
};
