"use client";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { HoverEffect } from "@/components/ui/hover-sections";
import Spline from "@splinetool/react-spline";

const CardHoverEffectDemo = () => {
  return (
    <main className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/G4oYsGbtvOa4IXGh/scene.splinecode" />
      </div>
      <div
        className="max-w-5xl mx-auto p-12 relative z-10"
        suppressHydrationWarning
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="cursor-pointer">
              <BreadcrumbLink href="/pdf-monkey">Year 3</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={"/sem-1"}>
                <BreadcrumbPage className="text-white">SEM 1</BreadcrumbPage>
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <HoverEffect items={projects} />
      </div>
    </main>
  );
};

const projects = [
  {
    title: "Cryptography and Networks Security",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "/cns"
  },
  {
    title: "Artificial Intelligence",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/cns"
  },
  {
    title: "Object Orientation Analysis & Design",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "/cns"
  },
  {
    title: "Software Testing",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "/cns"
  },
  {
    title: "Human Computer Interaction",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "/cns"
  }
];

export default CardHoverEffectDemo;
