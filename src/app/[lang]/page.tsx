import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">
      <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
        <Image
          src="/Backgrounds/background1.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-(--background)/10 backdrop-blur-xs" />
      </div>

      {/* 
         KONTENER TREŚCI 
         Tutaj trzymamy 'max-w-7xl', aby tekst nie rozjeżdżał się do krawędzi ekranu,
         ale tło powyżej pozostaje szerokie na całe okno.
      */}
      <div className="relative z-0 mx-auto flex w-full max-w-7xl flex-col items-center">
        {/* Sekcja Hero - na tle obrazka */}
        <section className="flex h-screen w-full flex-col items-center justify-start px-4 text-center">
          <h1 className="text-4xl font-black text-(--foreground) drop-shadow-2xl md:text-6xl pt-24 md:pt-40">
            Witaj w Project One
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-(--foreground)/80 md:mt-6 md:text-xl">
            To jest widok na samej górze. Header powinien być teraz duży, a
            opcje menu powinny być widoczne poziomo pod logiem.
          </p>
          <div className="mt-8 animate-bounce text-3xl text-(--foreground) md:mt-20 md:text-4xl scale-400">
            ↓
          </div>
        </section>

        {/* Kolejne sekcje - tutaj tło już "ucieknie" przy scrollowaniu */}
        <section className="flex min-h-dvh w-full flex-col items-center justify-center bg-black/20 px-4 text-center backdrop-blur-sm md:h-screen">
          <h2 className="text-3xl font-bold text-(--foreground) md:text-4xl">
            Właśnie przescrollowałeś!
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-(--foreground)/60 md:text-lg">
            W tym momencie tło z pierwszej sekcji uciekło do góry wraz z całą
            stroną.
          </p>
        </section>

        <section className="flex h-[50vh] w-full items-center justify-center px-4 text-center">
          <p className="text-sm text-(--foreground)/40 italic md:text-base">
            Koniec testowej treści.
          </p>
        </section>
      </div>
    </main>
  );
}
