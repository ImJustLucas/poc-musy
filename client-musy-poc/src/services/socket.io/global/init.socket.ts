import { socket } from "..";

const connectEvent = () =>
  socket.on("connection", () => console.log("Connected"));

const disconnectEvent = () =>
  socket.on("disconnect", () => console.log("Disconnected"));

const connectErrorEvent = () =>
  socket.on("connect_error", (err) =>
    console.error(`connect_error due to ${err}`)
  );

export const authEvents = {
  connect: connectEvent,
  disconnect: disconnectEvent,
  connectError: connectErrorEvent,
};
