import { Room } from "@/shared/types/room";
import { BaseFetcher } from "./base";

interface CreateRoomResponse {
  roomId: string;
}

interface JoinRoomResponse {
  success: boolean;
  data: Room;
}

interface GetRoomResponse {
  success: boolean;
  data: Room;
}

export class RoomService extends BaseFetcher {
  async createRoom(pseudo: string): Promise<CreateRoomResponse> {
    return this.post<CreateRoomResponse>("/room", { pseudo });
  }

  async joinRoom(
    roomId: string,
    { pseudo, clientSocketId }: { pseudo: string; clientSocketId: string }
  ): Promise<JoinRoomResponse> {
    return this.post<JoinRoomResponse>(`/room/${roomId}/join`, {
      pseudo,
      clientSocketId,
    });
  }

  async getRoom(roomId: string): Promise<GetRoomResponse> {
    return this.get<GetRoomResponse>(`/room/${roomId}`);
  }
}

export const roomService = new RoomService();
