import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Room } from "./schema/room.schema";
import { Model } from "mongoose";
import { Socket } from "socket.io";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  // async findAll(): Promise<Room[]> {
  //   return this.roomModel.find().exec();
  // }

  async create(room: any) {
    const object = await this.roomModel.create(room);
    return object;
  }

  getRoom(roomId: string) {
    return this.roomModel.findById(roomId);
  }

  async validateRoom(roomId: string) {
    const room = await this.getRoom(roomId);

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    return room;
  }

  subscribeSocket(socket: Socket, room: Room) {
    return socket.join(`room_${room._id}`);
  }

  // async unsubscribeSocket(socket: Socket, user: User) {
  //   await this.socketConnectionService.delete(socket);

  //   return socket.leave(`user_${user._id}`);
  // }
}
