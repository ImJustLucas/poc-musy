"use client";

import GenreSelectBtn from "@/components/genreSelectBtn";
import MainButton from "@/components/mainButton";
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
    <div className="bg-blue700 max-w-md w-full h-full">
      <div className="w-full h-screen bg-blue700 flex flex-col pt-24 relative">
        <h1 className="text-white text-3xl font-semibold mb-8">
          Selectionner les genres
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {genres.map((genre) => (
            <GenreSelectBtn key={genre} text={genre} />
          ))}
        </div>
        <div className=" w-full flex justify-center absolute bottom-8">
          <MainButton
            text="Suivant"
            className="w-full max-w-60"
            onClick={() => router.push("./waitingRoom")}
          />
        </div>
      </div>
    </div>
  );
}
