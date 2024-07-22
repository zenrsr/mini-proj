"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { WobbleCard } from "./ui/wobble-card";
import Link from "next/link";
import gsap from "gsap";
import { Syne } from "next/font/google";
const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "800"]
});

export function FeatureSection() {
  const h1Ref = useRef(null);

  return (
    <section
      className={`min-h-screen w-screen p-12 flex flex-col items-center`}
    >
      <h1
        className={`${syne.className} text-5xl text-white tracking-widest font-extrabold text-center m-12`}
      >
        Features
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <Link
          href="/pdf-monkey"
          className="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] cursor-pointer"
        >
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] cursor-pointer"
            className=""
          >
            <div className="max-w-xs" onClick={() => alert("Hello")}>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                PDF storage and sharing made easy.
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                With over 100,000 monthly bot users actively uploading files,
                <span className="font-extrabold text-lg "> PDFMonkey </span> is
                the most popular PDF storage and sharing platform for
                developers.
              </p>
            </div>
            <Image
              src="/images/3.jpeg"
              width={650}
              height={500}
              alt="linear demo image"
              className="absolute -right-4 lg:-right-[40%] -bottom-10 object-contain rounded-tl-[250px]"
            />
          </WobbleCard>
        </Link>
        <Link
          href="/pdf-monkey"
          className="col-span-1 h-full min-h-[500px] lg:min-h-[300px]"
        >
          <WobbleCard containerClassName="h-full gap-4 h-full min-h-[500px] lg:min-h-[300px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]  text-white">
              No shirt, no shoes, no weapons.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells “stop!”, goes limp, or taps out, the fight is
              over.
            </p>
          </WobbleCard>
        </Link>
        <Link
          href="/pdf-monkey"
          className="col-span-1 lg:col-span-3 h-full min-h-[300px] lg:min-h-[400px] xl:min-h-[300px]"
        >
          <WobbleCard containerClassName="h-full min-h-[300px] lg:min-h-[400px] xl:min-h-[300px] bg-blue-900">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Signup for blazing-fast cutting-edge state of the art Gippity AI
                wrapper today!
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p>
            </div>
            <Image
              src="/images/pdf.jpeg"
              width={800}
              height={700}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </Link>
      </div>
    </section>
  );
}
