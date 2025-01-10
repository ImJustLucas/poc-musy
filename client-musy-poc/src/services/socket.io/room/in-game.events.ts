import { socket } from "..";

const startGame = (roomId: string) => socket.emit("room:start-game", roomId);

export const inGameRoomEvents = {
  start: startGame,
};
