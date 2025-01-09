import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Room } from "./schema/room.schema";
import { Model } from "mongoose";
import { Server, Socket } from "socket.io";
import { WebSocketServer } from "@nestjs/websockets";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}
  @WebSocketServer() server: Server;

  private Members: Record<string, string>;

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async create(room: any) {
    const object = await this.roomModel.create(room);
    return object;
  }

  getRoom(roomId: string) {
    return this.roomModel.findById(roomId);
  }

  async getRoomBySocketId(roomSocketId: string) {
    return await this.roomModel.findOne({ roomSocketId });
  }

  async validateRoom(roomSocketId: string) {
    const room = await this.getRoomBySocketId(roomSocketId);

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    return room;
  }

  subscribeSocket(data: { client: Socket; pseudo: string }, room: Room) {
    console.log("Send truc to client");
    data.client.broadcast.emit("room:user-join", {
      newUser: data.pseudo,
    });
    return data.client.join(`room_${room._id}`);
  }

  async join(roomId: string, user: { pseudo: string; clientSocketId: string }) {
    const room = await this.validateRoom(roomId);

    if (
      !Object.entries(room.members).some(
        ([socketId]) => user.clientSocketId === socketId,
      )
    ) {
      try {
        const updatedRoom = await this.roomModel.findByIdAndUpdate(
          room._id,
          {
            $set: {
              [`members.${user.clientSocketId}`]: user.pseudo,
            },
          },
          { new: true },
        );

        if (!updatedRoom) {
          throw new Error("Failed to update room");
        }

        console.log(`Added ${user.pseudo} to room: ${room._id}`);
        return updatedRoom;
      } catch (error) {
        console.error("Error joining room:", error);
        throw error;
      }
    }

    return room;
  }

  async removeUserFromRooms(socketId: string) {
    try {
      const rooms = await this.roomModel.find({
        [`members.${socketId}`]: { $exists: true },
      });

      const updatePromises = rooms.map((room) =>
        this.roomModel.findByIdAndUpdate(
          room._id,
          {
            $unset: { [`members.${socketId}`]: 1 },
          },
          { new: true },
        ),
      );

      const updatedRooms = await Promise.all(updatePromises);

      return updatedRooms;
    } catch (error) {
      console.error("Error removing user from rooms:", error);
      throw error;
    }
  }

  async unsubscribeSocket(socket: Socket) {
    await this.removeUserFromRooms(socket.id);

    return;
  }
}
