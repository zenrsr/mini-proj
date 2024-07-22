"use client";

import { useEffect } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./style.css";

import { Syne } from "next/font/google";
import Link from "next/link";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "800"]
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });

    const animation = gsap.to(".photo:not(:first-child)", {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 1
    });

    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      pin: ".right",
      animation: animation,
      scrub: true
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main>
      <h1
        className={`${syne.className} text-white text-5xl tracking-widest font-extrabold text-center m-12`}
      >
        All Services
      </h1>
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/BTfLDwLCiCNOYV-A/scene.splinecode" />
        </div>
        <div className="relative z-10">
          <div className="gallery">
            <div className="left">
              <div className={`detailsWrapper text-white ${syne.className}`}>
                <div className="details flex flex-col items-center">
                  <h1 className="font-bold tracking-wider text-5xl">
                    Your Portfolio, Your Story
                  </h1>
                  <div className="text">
                    <p className="text-normal py-4">
                      Build Your Professional Profile and share Your Expertise
                      with the World
                    </p>
                    <button className="hover:tracking-widest text-xl transition-all duration-400 w-96 rounded-2xl border-2 border-white bg-transparent p-4 mt-8">
                      <Link href="/portfolio">Explore Now</Link>
                    </button>
                  </div>
                </div>

                <div className="details flex flex-col items-center justify-center">
                  <h1 className="font-bold tracking-wider text-5xl">
                    Semester Overlook
                  </h1>
                  <div className="text">
                    <p className="text-normal py-4">
                      Birds eye view of entire semesters worth of syllabus and
                      related notes and reference books now at a glance
                    </p>
                    <button className="hover:tracking-widest text-xl transition-all duration-400 w-96 rounded-2xl border-2 border-white bg-transparent p-4 mt-8">
                      <Link href="/pdf-monkey">Explore Now</Link>
                    </button>
                  </div>
                </div>

                <div className="details flex flex-col items-center">
                  <h1 className="font-bold tracking-wider text-5xl">
                    CGPA calculator.
                  </h1>
                  <div className="text">
                    <p className="text-normal py-4">
                      Track your academic progress effortlessly. Quick and
                      accurate CGPA result
                    </p>
                    <button className="hover:tracking-widest text-xl transition-all duration-400 w-96 rounded-2xl border-2 border-white bg-transparent p-4 mt-8">
                      <Link href="/score">Explore Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="right flex justify-center flex-col items-center">
              <div className="photos rounded-2xl">
                <Image
                  src="/images/portfolio2.png"
                  alt=""
                  className="photo"
                  width={300}
                  height={150}
                />
                <Image
                  src="/images/pdf3.jpg"
                  alt=""
                  className="photo"
                  width={300}
                  height={150}
                />
                <Image
                  src="/assets/img2.jpg"
                  alt=""
                  className="photo"
                  width={300}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
