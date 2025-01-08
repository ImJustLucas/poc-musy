import { socket } from "..";

const createRoom = (partyName: string) => socket.emit("room:create", partyName);

const joinRoom = (payload: { partyId: string; pseudo: string }) =>
  socket.emit("room:join", payload);

const leaveRoom = (partyId: string) => socket.emit("room:leave", partyId);

const deleteRoom = () => socket.emit("room:delete");

export const authRoomEvents = {
  create: createRoom,
  join: joinRoom,
  leave: leaveRoom,
  delete: deleteRoom,
};
