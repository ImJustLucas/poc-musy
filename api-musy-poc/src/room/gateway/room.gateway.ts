import { forwardRef, Inject, Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { RoomService } from "../room.service";

@WebSocketGateway()
export class RoomGateway
  implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => RoomService)) private roomService: RoomService,
  ) {}

  private logger: Logger = new Logger("RoomGateway");

  afterInit(server: Server) {
    this.logger.log("WebSocket Server Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`New user connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`User Disconnected: ${client.id}`);
    // this.roomService.unsubscribeSocket(socket);
  }

  @SubscribeMessage("room:test")
  async test(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    this.logger.log("Test réussi");
  }

  @SubscribeMessage("room:subscribe")
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
