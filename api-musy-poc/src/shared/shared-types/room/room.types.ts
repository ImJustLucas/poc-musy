// TODO ajouter systeme de game
export interface Room {
  _id: string;
  name: string;
  options: RoomOptions;
  state: RoomState;
  roomSocketId: string;
  members: Record<UserSocketId, string>;
}

export interface CreateRoom {
  name: string;
  options: RoomOptions;
  state: RoomState;
  roomSocketId: string;
  members: Record<UserSocketId, string>;
}

export enum RoomState {
  OPENED = "opened",
  WAITING_PLAYERS = "waiting-players",
  STARTING = "starting",
  IN_GAME = "in-game",
  RESULTS = "results",
  CLOSED = "closed",
}

export interface RoomOptions {
  maxPlayers: number;
  maxQuestions: number;
  timeToAnswer: number;
}

type QuestionId = string;
export type UserSocketId = string;
