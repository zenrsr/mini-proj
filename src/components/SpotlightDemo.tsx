import React from "react";
import { cn } from "../lib/utils";
import { Spotlight } from "./ui/Spotlight";
import { TeamPreview } from "@/components/TeamPreview";

export function SpotlightPreview() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 flex flex-col justify-between">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Contact <br /> US
        </h1>
        <div className="mt-4">
          <TeamPreview />
        </div>
      </div>
    </div>
  );
}
