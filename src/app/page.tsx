import { FeatureSection } from "@/components/FeatureSection";
import { HeroParallaxDemo } from "@/components/HeroParallaxDemo";
import Gallery from "@/components/services/Gallery";

export default function Home() {
  return (
    <main
      className={`min-h-screen max-w-screen overflow-x-hidden flex flex-col justify-center items-center p-12 `}
    >
      <HeroParallaxDemo />
      <FeatureSection />
      <Gallery />
    </main>
  );
}
