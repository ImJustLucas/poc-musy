import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomModule } from "./room/room.module";
import { GameModule } from "./game/game.module";
import { MongoDBConfigService } from "./config/database/mongodb.config";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDBConfigService,
      inject: [ConfigService],
    }),
    RoomModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
