import { io } from "socket.io-client";
import "./global/init.socket";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:1337";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  timeout: 10000,
});
