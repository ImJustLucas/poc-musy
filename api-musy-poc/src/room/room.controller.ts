import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomTypes } from "@/shared/shared-types";

@Controller("room")
export class RoomController {
  constructor(private _roomService: RoomService) {}

  @Post("create")
  async createRoom(@Body() data: RoomTypes.CreateRoom) {
    const res = await this._roomService.create(data);

    return {
      sucess: true,
      data: res,
    };
  }

  @Post("join")
  async join(@Body("roomId") id: string) {
    // creer une room en bdd
    // res success -> room ID
  }

  // @Delete("leave/:id")
  // async leave(@Param("id") id: string) {
  //   return this._roomService.leave(

  //     await this._roomService.validateRoom(id),
  //   );
  // }
}
