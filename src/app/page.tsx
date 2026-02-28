import TopNav from "@/components/TopNav";
import HeroScene from "@/components/hero/HeroScene";
import AudioController from "@/components/audio/AudioController";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <TopNav />
      <HeroScene />
      <AudioController />
    </main>
  );
}
