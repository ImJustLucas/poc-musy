import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller("room")
export class RoomController {
  constructor(private _roomService: RoomService) {}

  @Get()
  async getAllRoom() {
    const rooms = await this._roomService.findAll();

    return {
      success: true,
      data: rooms,
    };
  }

  @Get("/:roomSocketId")
  async getRoomBySocketName(@Param("roomSocketId") roomSocketId: string) {
    const room = await this._roomService.getRoomBySocketId(roomSocketId);

    return {
      success: true,
      data: room,
    };
  }

  @Post()
  async createRoom(@Body() data: any) {
    return await this._roomService.create(data);
  }

  @Post("/:roomSocketId/join")
  async join(
    @Param("roomSocketId") roomSocketId: string,
    @Body() user: { pseudo: string; clientSocketId: string },
  ) {
    const room = await this._roomService.getRoomBySocketId(roomSocketId);

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    this._roomService.join(room._id, user);

    return {
      success: true,
      data: room,
    };
  }

  // @Delete("leave/:id")
  // async leave(@Param("id") id: string) {
  //   return this._roomService.leave(

  //     await this._roomService.validateRoom(id),
  //   );
  // }
}
