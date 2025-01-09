export interface Room {
  _id: string;
  name: string;
  options: RoomOptions;
  state: RoomState;
  roomSocketId: string;
  members: Record<UserSocketId, string>;
}

export enum RoomState {
  OPENED = "opened",
  CLOSED = "closed",
}

export interface RoomOptions {
  maxPlayers: number;
  maxQuestions: number;
  timeToAnswer: number;
}

type UserSocketId = string;
