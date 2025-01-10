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
    this.roomService.unsubscribeSocket(client);
  }

  @SubscribeMessage("room:subscribe")
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
      pseudo: string;
    },
  ) {
    if (!data.roomId) return;

    return this.roomService.subscribeSocket(
      { client, pseudo: data.pseudo },
      await this.roomService.validateRoom(data.roomId),
    );
  }

  @SubscribeMessage("room:start-game")
  async startGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
    },
  ) {
    if (!data.roomId) return;
    console.log("ouais la game commence");
  }
}
