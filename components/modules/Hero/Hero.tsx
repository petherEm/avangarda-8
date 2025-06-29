import { lazy, Suspense } from "react";
import { Container } from "@/components/container";
import HeroLoading from "./loading";

// Use standard React lazy loading
const VideoPlayer = lazy(() => import("./video-player"));

export default function Hero() {
  return (
    <Container className="relative h-[70vh] md:h-screen w-full overflow-hidden">
      <Suspense fallback={<HeroLoading />}>
        <VideoPlayer />
      </Suspense>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </Container>
  );
}
