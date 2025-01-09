import { socket } from "..";

const createRoom = (partyName: string) => socket.emit("room:create", partyName);

const subscribeRoom = (payload: { roomId: string; pseudo: string }) =>
  socket.emit("room:subscribe", payload);

const leaveRoom = (partyId: string) => socket.emit("room:leave", partyId);

const deleteRoom = () => socket.emit("room:delete");

export const authRoomEvents = {
  create: createRoom,
  join: subscribeRoom,
  leave: leaveRoom,
  delete: deleteRoom,
};
