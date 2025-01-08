import { forwardRef, Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { RoomService } from '../room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => RoomService)) private roomService: RoomService,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log(`New user connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`User Disconnected: ${client.id}`);
  }

  @SubscribeMessage('room:subscribe')
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    return this.roomService.subscribeSocket(
      client,
      await this.roomService.validateRoom(roomId),
    );
  }
}
