import TopNav from "@/components/TopNav";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopNav />
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-16">
        <h1 className="text-3xl tracking-[0.25em] neon-text">RESUME</h1>
        <p className="mt-4 opacity-75">
          Тут можно сделать резюме как в игре: блоки опыта, стека, серты, контакты.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl p-6 glass neon-border">
            <div className="text-xs tracking-[0.35em] opacity-80">ABOUT</div>
            <div className="mt-3 text-sm opacity-75">Добавь описание, роли, ниши.</div>
          </div>
          <div className="rounded-2xl p-6 glass neon-border">
            <div className="text-xs tracking-[0.35em] opacity-80">STACK</div>
            <div className="mt-3 text-sm opacity-75">Frontend / Motion / 3D / Branding.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
