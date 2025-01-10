import { roomService } from "@/services/fetcher/room";
import { Suspense } from "react";
import { HandleRoomState } from "@/components/room/HandleRoomState";

export default async function Room({
  params,
}: {
  params: Promise<{ roomSocketId: string }>;
}) {
  const roomSocketId = (await params).roomSocketId;
  const { data, success } = await roomService.getRoom(roomSocketId);

  if (!success) return null;

  return (
    <Suspense>
      <HandleRoomState room={data} />;
    </Suspense>
  );
}
