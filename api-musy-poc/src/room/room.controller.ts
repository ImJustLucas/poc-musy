import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller("room")
export class RoomController {
  constructor(private _roomService: RoomService) {}

  @Post()
  async createRoom(@Body() data: any) {
    return await this._roomService.create(data);
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
