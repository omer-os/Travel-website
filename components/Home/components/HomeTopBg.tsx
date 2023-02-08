import React from "react";

export default function HomeTopBg() {
  return (
    <div className="rounded-b-xl sm:h-[20em] h-[19em] transition-all w-full relative">
      <div className="absolute w-full h-full bg-blue-600 dark:bg-zinc-900 top-0 left-0 rounded-b-xl"></div>

      <div className="text-white p-4 text-2xl font-bold capitalize relative top-[5.5em] transition-all">
        search for flights
      </div>
    </div>
  );
}