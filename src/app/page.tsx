import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
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
    </div>
  );
}
