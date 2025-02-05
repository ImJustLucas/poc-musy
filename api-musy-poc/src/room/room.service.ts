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
import { RoomTypes } from "@/shared/shared-types";
import { RoomGateway } from "./gateway/room.gateway";

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private roomGateway: RoomGateway,
  ) {
    this.Members = {};
  }
  @WebSocketServer() server: Server;

  private Members: Record<string, string>;

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async create(room: RoomTypes.CreateRoom) {
    const newRoom = new this.roomModel({
      name: room.name,
      options: room.options,
      state: room.state || "waiting-players",
      members: this.Members,
    });

    return await newRoom.save();
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
    const roomId = `room_${room._id}`;
    data.client.join(roomId);
    this.sendMessage(room, "room:user-join", {
      newUser: data.pseudo,
      timestamp: new Date(),
      roomId: room._id,
    });
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

  sendMessage<T>(room: Room, event: string, message?: T) {
    return this.roomGateway.server.to(`room_${room._id}`).emit(event, message);
  }

  async startGame(roomSocketId: string) {
    return await this.roomModel.findOneAndUpdate(
      { roomSocketId },
      { state: RoomTypes.RoomState.IN_GAME },
    );
  }
}
