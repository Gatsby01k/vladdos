import TopNav from "@/components/TopNav";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopNav />
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
        <h1 className="text-3xl tracking-[0.25em] neon-text">PROJECTS</h1>
        <p className="mt-4 opacity-75">Сетка проектов, превью, теги, ссылки.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl p-6 glass neon-border">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.35em] opacity-80">PROJECT #{i}</div>
                <div className="text-[10px] tracking-[0.35em] opacity-60">2026</div>
              </div>
              <div className="mt-3 text-sm opacity-80">
                Название проекта, краткое описание, стек, кнопки.
              </div>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full px-3 py-1 text-[10px] glass neon-border opacity-80">NEXT</span>
                <span className="rounded-full px-3 py-1 text-[10px] glass neon-border opacity-80">MOTION</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
