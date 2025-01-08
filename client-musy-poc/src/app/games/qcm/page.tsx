"use client";

import MainButton from "@/components/mainButton";
import { useRouter } from "next/navigation";

export default function QCM() {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-blue950 flex flex-col items-center pt-24 relative">
      <div className="text-white text-6xl mb-6">QCM</div>
      <div className="text-xl mb-2">Question 1/10</div>
      <div className="text-white text-2xl mb-6">
        Quelle est la capitale de la France ?
      </div>
      <div className=" w-full grid grid-cols-2 gap-4 absolute bottom-8">
        <MainButton text="Paris" />
        <MainButton text="Londres" />
        <MainButton text="Berlin" />
        <MainButton text="Madrid" />
      </div>
    </div>
  );
}
