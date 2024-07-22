"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export const HoverEffect = ({
  items,
  className
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-900/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 }
                }}
              />
            )}
          </AnimatePresence>
          <Card
            isHovered={hoveredIndex === idx}
            className="bg-white backdrop-blur-none bg-opacity-5"
          >
            <CardTitle className="font-bold text-xl">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  isHovered
}: {
  className?: string;
  children: React.ReactNode;
  isHovered: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative",
        className
      )}
    >
      <div className="relative z-10">
        <div className="p-4">{children}</div>
      </div>
      {isHovered && (
        <>
          <div
            className="absolute rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              left: `${mousePosition.x - 150}%`,
              top: `${mousePosition.y - 150}%`,
              filter: "blur(60px)",
              opacity: 0.7
            }}
          />
          <div
            className="absolute w-56 h-56 rounded-full bg-gradient-radial from-white/10 via-white/10 to-transparent pointer-events-none animate-pulse"
            style={{
              left: `${mousePosition.x - 112}px`,
              top: `${mousePosition.y - 112}px`,
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              filter: "blur(30px)"
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full bg-gradient-radial from-white/10 via-white/10 to-transparent pointer-events-none animate-fadeIn"
            style={{
              left: `${mousePosition.x - 80}px`,
              top: `${mousePosition.y - 80}px`,
              animation: "fadeIn 0.3s ease-out",
              filter: "blur(20px)"
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full bg-white/20 pointer-events-none animate-fadeIn"
            style={{
              left: `${mousePosition.x - 48}px`,
              top: `${mousePosition.y - 48}px`,
              animation: "fadeIn 0.2s ease-out",
              filter: "blur(15px)"
            }}
          />
        </>
      )}
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
