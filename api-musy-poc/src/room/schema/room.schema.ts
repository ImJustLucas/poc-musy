import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoomTypes } from "@/shared/shared-types";

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room implements RoomTypes.Room {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: Object,
    default: {
      maxPlayers: 10,
      maxQuestions: 5,
      timeToAnswer: 10000,
    },
  })
  options: RoomTypes.RoomOptions;

  @Prop({ required: true })
  state: RoomTypes.RoomState;

  @Prop({ required: true })
  roomSocketId: string;

  @Prop({ required: true, type: Object, default: {} })
  members: Record<RoomTypes.UserSocketId, string>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
