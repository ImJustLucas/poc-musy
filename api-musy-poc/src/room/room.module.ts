import { Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomSchema } from "./schema/room.schema";
import { RoomGateway } from "./gateway/room.gateway";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Room", schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
