import TopNav from "@/components/TopNav";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TopNav />
      <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
        <h1 className="text-3xl tracking-[0.25em] neon-text">CONTACTS</h1>
        <p className="mt-4 opacity-75">Сюда — телега, инста, почта, форма.</p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl p-6 glass neon-border">
            <div className="text-xs tracking-[0.35em] opacity-80">SOCIAL</div>
            <div className="mt-3 text-sm opacity-75">Telegram / Instagram / Email</div>
          </div>
          <div className="rounded-2xl p-6 glass neon-border">
            <div className="text-xs tracking-[0.35em] opacity-80">HIRE</div>
            <div className="mt-3 text-sm opacity-75">Оставь заявку — сделаем форму.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
