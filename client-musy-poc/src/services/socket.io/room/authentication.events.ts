import { socket } from "..";

const createRoom = (partyName: string) =>
  socket.emit("party-create", partyName);

const joinRoom = (payload: { partyId: string; pseudo: string }) =>
  socket.emit("party-join", payload);

const leaveRoom = (partyId: string) => socket.emit("party-leave", partyId);

const deleteRoom = () => socket.emit("party-delete");

export const authRoomEvents = {
  create: createRoom,
  join: joinRoom,
  leave: leaveRoom,
  delete: deleteRoom,
};
