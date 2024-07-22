"use client";
import { useEffect, useRef } from "react";
import { Breads } from "@/components/Breads";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";

const FoldersDemo = () => {
  return (
    <section className="bg-black flex flex-col items-center justify-center min-h-screen text-white py-12">
      <Breads />
      <div className="w-full h-screen">
        <Spline scene="https://prod.spline.design/pkC5k9UMz-y069Lj/scene.splinecode" />
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 py-16 space-y-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold mb-6">Semester 1</h1>
            <button
              type="button"
              className="border-2 border-white text-xl px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              <Link href="/sem-1">Explore Now</Link>
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/assets/img3.jpg"
              alt="Semester 1"
              width={400}
              height={200}
              className="rounded-2xl border border-gray-300"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
            <h1 className="text-4xl font-bold mb-6">Semester 2</h1>
            <button
              type="button"
              className="border-2 border-white text-xl px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              <Link href="/sem-2"> Explore Now</Link>
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/assets/img2.jpg"
              alt="Semester 2"
              width={400}
              height={200}
              className="rounded-2xl border border-gray-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoldersDemo;
