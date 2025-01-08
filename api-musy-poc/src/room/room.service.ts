import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Room } from "./schema/room.schema";
import { Model } from "mongoose";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }
}
