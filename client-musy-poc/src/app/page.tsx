"use client";

import { useState, useEffect } from "react";
import MainButton from "@/components/mainButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-blue700 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <Image
          className={`mb-8 transition-all duration-1000 ${
            loaded ? "w-2/4" : "w-full"
          }`}
          src="/white_logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div
          className={`flex flex-col gap-2 min-w-60 transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <MainButton
            text="Rejoindre une salle"
            onClick={() => router.push("/joinRoom")}
          />
          <MainButton
            text="Créer une salle"
            onClick={() => router.push("/waitingRoom")}
          />
        </div>
      </div>
    </div>
  );
}
