"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { FloatingNavDemo } from "./FloatingNavDemo";

export function HeroParallaxDemo() {
  return (
    <>
      <FloatingNavDemo />
      <HeroParallax products={products} />
    </>
  );
}
export const products = [
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://img.freepik.com/free-vector/standup-meeting-concept-illustration_114360-7226.jpg"
  },
  {
    title: "Results",
    link: "/result",
    thumbnail:
      "https://img.freepik.com/free-vector/grades-concept-illustration_114360-697.jpg?t=st=1710776859~exp=1710780459~hmac=49c6b77a35df444bab7f972f4d296b33497db20afe32e7ef8c2cbf2cba8e84e3&w=996"
  },
  {
    title: "PDF Monkey",
    link: "/pdf-monkey",
    thumbnail:
      "https://img.freepik.com/free-vector/thesis-concept-illustration_114360-7710.jpg?t=st=1710776626~exp=1710780226~hmac=a4d7c508352d582b262af61f7228d6cf554a93826abc3c32a815ba90b98e00c7&w=996"
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png"
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png"
  },
  {
    title: "Chill out bro",
    link: "/pdf-monkey",
    thumbnail:
      "https://img.freepik.com/free-photo/full-shot-man-futuristic-portrait_23-2151178908.jpg?t=st=1710777980~exp=1710781580~hmac=ae506553c2d7616aef29edc620aaade577a601c199d0cf6fb3cf870cc053b155&w=1480"
  },

  {
    title: "Pass",
    link: "/not-found",
    thumbnail:
      "https://img.freepik.com/free-photo/futuristic-style-dog-with-robot-suit_23-2151107736.jpg?t=st=1710777842~exp=1710781442~hmac=e655560ec602de091b2e584d444a6553f3641b9cfdc400cdbfea880da8b9c65e&w=996"
  },
  {
    title: "Portfolio Generator",
    link: "/portfolio-maker",
    thumbnail:
      "https://elements-cover-images-0.imgix.net/5e9e5ac6-0af0-4bf4-9cc8-ceaf6afca7e6?auto=compress%2Cformat&w=900&fit=max&s=4d51a15c2513300508be671bffc3e70e"
  },
  {
    title: "Tailwind Master Kit",
    link: "/not-found",
    thumbnail:
      "https://img.freepik.com/free-photo/painting-representing-krishna_23-2151073143.jpg?t=st=1710780122~exp=1710783722~hmac=d250e9061daea135a8ed449f48cb95ee73b4601b0b9292aee716a2e784781cec&w=1480"
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png"
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png"
  }
];
