import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GameType } from "@/../../shared-types";

export type GameDocument = HydratedDocument<GameType.Game>;

@Schema()
export class Game implements GameType.Game {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  state: GameType.GameState.NOT_STARTED;

  @Prop({ required: true })
  answers: Record<string, GameType.Anwser>;
}

export const GameSchema = SchemaFactory.createForClass(Game);
