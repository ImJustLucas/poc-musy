import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Room } from "./schema/room.schema";
import { Model } from "mongoose";
import { Socket } from "socket.io";
import { RoomTypes } from "@/shared/shared-types";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  private Members: Record<string, string>;

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async create(room: RoomTypes.CreateRoom) {
    const newRoom = new this.roomModel(room);

    return await newRoom.save();
  }

  getRoom(roomId: string) {
    return this.roomModel.findById(roomId);
  }

  getRoomBySocketId(roomSocketId: string) {
    return this.roomModel.findOne({ roomSocketId });
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

  async join(roomId: string, user: { pseudo: string; clientSocketId: string }) {
    const room = await this.validateRoom(roomId);

    if (
      !Object.entries(room.members).some(
        ([socketId, pseudo]) => user.clientSocketId === socketId,
      )
    ) {
      room.members[user.clientSocketId] = user.pseudo;
      console.log(`Add ${user.pseudo} to room : ${room._id}`);
      return room.save();
    }

    return room;
  }

  // async unsubscribeSocket(socket: Socket, user: User) {
  //   await this.socketConnectionService.delete(socket);

  //   return socket.leave(`user_${user._id}`);
  // }
}
