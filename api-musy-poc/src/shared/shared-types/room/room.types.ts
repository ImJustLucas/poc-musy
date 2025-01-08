// TODO ajouter systeme de game
export interface Room {
  _id: string;
  name: string;
  options: RoomOptions;
  state: RoomState;
  roomSocketId: string;
}

export enum RoomState {
  OPENED = "opened",
  CLOSED = "closed",
}

export interface RoomOptions {
  maxPlaysers: number;
  maxQuestions: number;
  timeToAnswer: number;
}

type QuestionId = string;
type UserSocketId = string;
