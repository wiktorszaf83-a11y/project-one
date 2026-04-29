import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover -z-20"
      >
        <source src="/background1.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white/5 backdrop-blur-xs" />

      <div className="relative z-0 flex flex-col items-center pt-40">
        <section className="flex h-screen flex-col items-center justify-start text-center px-4">
          <h1 className="text-6xl font-black text-white drop-shadow-2xl">
            Witaj w Project One
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-2xl">
            To jest widok na samej górze. Header powinien być teraz duży, a
            opcje menu powinny być widoczne poziomo pod logiem.
          </p>
          <div className="mt-10 animate-bounce text-white text-4xl">↓</div>
        </section>

        <section className="flex h-screen flex-col items-center justify-center text-center px-4 bg-black/20 w-full backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-white">
            Właśnie przescrollowałeś!
          </h2>
          <p className="mt-4 text-lg text-white/60">
            W tym momencie Header powinien się zmniejszyć, pasek stać się
            węższy, a menu poziome powinno zniknąć (chowając się do ikony ☰).
          </p>
        </section>

        <section className="flex h-[50vh] items-center justify-center">
          <p className="text-white/40 italic">Koniec testowej treści.</p>
        </section>
      </div>
    </main>
  );
}
