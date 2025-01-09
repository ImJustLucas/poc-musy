import MainButton from "@/components/mainButton";
import { roomService } from "@/services/fetcher/room";
import { socket } from "@/services/socket.io";
import Link from "next/link";
import { Suspense } from "react";

export default async function Room({
  params,
}: {
  params: Promise<{ roomSocketId: string }>;
}) {
  const roomSocketId = (await params).roomSocketId;
  const { data, success } = await roomService.getRoom(roomSocketId);
  console.log("Data", { data, success });

  socket.on("room:user-join", (payload) => {
    console.log("truc reçu");
    data.members[payload.newUser] = payload.newUser;
  });

  if (!success) return null;

  return (
    <Suspense
      fallback={
        <div className="bg-blue700 w-full h-full flex justify-center px-4">
          <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
            <div className="text-white text-6xl mt-20">{data.name}</div>
            <div className="text-xl mb-2">En attente de joueurs...</div>
          </div>
        </div>
      }
    >
      <div className="bg-blue700 w-full h-full flex justify-center px-4">
        <div className="w-full max-w-md h-screen flex flex-col items-center relative text-center">
          <div className="text-white text-6xl mt-20">{data.name}</div>
          <div className="flex items-center gap-2 mb-6">
            <div className="text-xl">
              {data.members ? Object.values(data.members).length : 0}
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C15.05 13.06 15.06 13.08 15.07 13.09C16.21 13.92 17 15.03 17 16.5V18C17 18.35 16.93 18.69 16.82 19H22C22.55 19 23 18.55 23 18V16.5C23 14.17 18.33 13 16 13Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-xl mb-2">En attente de joueurs...</div>
          <div className="flex flex-col items-center">
            {data.members
              ? Object.values(data.members).map((user) => (
                  <div key={user}>{user}</div>
                ))
              : null}
          </div>
          <div className=" w-full flex justify-center absolute bottom-8">
            <Link href="/games/qcm" className="w-full max-w-60">
              <MainButton text="Suivant" className="w-full" />
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
