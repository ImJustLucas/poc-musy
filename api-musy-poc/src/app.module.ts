import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest'), RoomModule],
  imports: [RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
