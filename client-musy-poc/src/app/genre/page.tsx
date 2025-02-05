"use client";

import GenreSelectBtn from "@/components/genreSelectBtn";
import MainButton from "@/components/mainButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const genres = [
  "Rap",
  "Rock",
  "Pop",
  "Electro",
  "Reggae",
  "Classique",
  "Jazz",
  "Metal",
  "Funk",
  "Blues",
  "Soul",
  "Disco",
  "Country",
  "Variété",
  "RnB",
  "Hip-Hop",
  "Techno",
  "House",
  "Dubstep",
  "Drum and Bass",
  "Hardcore",
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center relative text-center">
        <h1 className="text-white text-3xl font-semibold my-8">
          Selectionner les genres
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {genres.map((genre) => (
            <GenreSelectBtn key={genre} text={genre} />
          ))}
        </div>
        <div className=" w-full flex justify-center absolute bottom-8">
          <Link href="/waitingRoom" className="w-full max-w-60">
            <MainButton
              text="Suivant"
              className="w-full"
              onClick={() => router.push("./waitingRoom")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
