export interface Game {
  roomId: string;
  answers: Record<UserSocketId, Anwser>;
  state: GameState.NOT_STARTED;
}

export enum GameState {
  NOT_STARTED = "not_started",
  STARTING = "starting",
  ONGOING = "on_going",
  FINISHED = "finished",
}

export interface Anwser {
  questionId: QuestionId;
  socketId: string;
  timestamps: {
    start: Date;
    end: Date;
  };
  anwser: string | number;
  isValid: true;
}

type UserSocketId = string;
type QuestionId = string;
