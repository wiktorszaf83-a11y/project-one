export default function Home() {
  return (
    <main className="relative w-full">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white/5 backdrop-blur-xs" />

      <div className="relative z-0 mx-auto flex w-full max-w-7xl flex-col items-center pt-24 md:pt-40">
        <section className="flex min-h-dvh w-full flex-col items-center justify-start px-4 text-center md:h-screen">
          <h1 className="text-4xl font-black text-white drop-shadow-2xl md:text-6xl">
            Witaj w Project One
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:mt-6 md:text-xl">
            To jest widok na samej górze. Header powinien być teraz duży, a
            opcje menu powinny być widoczne poziomo pod logiem.
          </p>
          <div className="mt-8 animate-bounce text-3xl text-white md:mt-10 md:text-4xl">
            ↓
          </div>
        </section>

        <section className="flex min-h-dvh w-full flex-col items-center justify-center bg-black/20 px-4 text-center backdrop-blur-sm md:h-screen">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Właśnie przescrollowałeś!
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/60 md:text-lg">
            W tym momencie Header powinien się zmniejszyć, pasek stać się
            węższy, a menu poziome powinno zniknąć (chowając się do ikony ☰).
          </p>
        </section>

        <section className="flex h-[50vh] w-full items-center justify-center px-4 text-center">
          <p className="text-sm text-white/40 italic md:text-base">
            Koniec testowej treści.
          </p>
        </section>
      </div>
    </main>
  );
}
