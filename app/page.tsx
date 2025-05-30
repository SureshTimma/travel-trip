'use client';

import Image from "next/image";
import heroImage from "../public/assets/hero-girl.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="relative bg-[#F1F5F9] min-h-screen flex items-center px-32">
      <div className="text-left text-white max-w-xl z-10">
        <h1 className="text-5xl font-bold text-[#2e4369] mb-4 leading-tight">
          Travel. Relax. <br /> Memories.
        </h1>
        <Link href={isLoggedIn ? "/travel-form" : "/signup"}>
          <button className="mt-6 px-6 py-3 bg-[#2e4369] text-white font-medium rounded-md hover:bg-[#3c527d] transition">
            Book a New Trip
          </button>
        </Link>
      </div>

      <Image
        src={heroImage}
        alt="Traveler"
        className="absolute bottom-0 right-0 max-h-full object-contain z-0"
      />
    </div>
  );
}
