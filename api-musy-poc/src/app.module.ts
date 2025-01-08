import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomModule } from './room/room.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/nest"), RoomModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
