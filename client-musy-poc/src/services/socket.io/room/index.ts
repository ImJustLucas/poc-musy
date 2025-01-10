import { socket } from "..";
import { authRoomEvents } from "./authentication.events";

const getAllRooms = () => socket.emit("room:get-all");

export const partyEvent = {
  getRooms: getAllRooms,
  ...authRoomEvents,
};
