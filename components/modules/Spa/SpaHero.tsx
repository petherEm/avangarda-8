import { Container } from "../../container";
import { ConfiguredVideoPlayer } from "@/components/shared";

export default function SpaHero() {
  return (
    <Container className="relative h-[70vh] md:h-screen w-full overflow-hidden">
      <ConfiguredVideoPlayer module="spa" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </Container>
  );
}
