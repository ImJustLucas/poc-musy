import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GameType } from "@/shared/shared-types";

export type GameDocument = HydratedDocument<GameType.Game>;

@Schema()
export class Game implements GameType.Game {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({
    required: true,
    type: String,
    default: GameType.GameState.NOT_STARTED,
  })
  state: GameType.GameState.NOT_STARTED;

  @Prop({ required: true, type: Object })
  answers: Record<string, GameType.Anwser>;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
