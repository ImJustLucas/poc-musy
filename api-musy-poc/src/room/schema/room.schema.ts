import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoomTypes } from "@/shared/shared-types";

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room implements RoomTypes.Room {
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

  @Prop()
  roomSocketId: string;

  @Prop({ required: true, type: Object, default: {} })
  members: Record<RoomTypes.UserSocketId, string>;

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

export const RoomSchema = SchemaFactory.createForClass(Room);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
RoomSchema.pre("save", async function (next: any) {
  this.createdAt = new Date();
  this.roomSocketId = `room_${this._id}`;

  next();
});
