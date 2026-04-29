"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  // Refs
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
      if (
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsBurgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Burger menu
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // Themes
  const [themeindex, setThemeindex] = useState(0);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themes = ["project-one", "light", "dark"];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes[themeindex]);
  }, [themeindex]);

  // Scroll
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsTop((prevState) => {
        if (prevState && window.scrollY > 150) return false;
        if (!prevState && window.scrollY < 50) return true;
        return prevState;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md ${
        isTop ? "h-28 bg-(--header-bg)" : "h-14 bg-(--header-bg)"
      }`}
    >
      <nav
        className={`relative mx-auto flex h-full max-w-[1680px] px-4 sm:px-6 lg:px-8 transition-all duration-300 gap-4 ${
          isTop ? "items-start pt-2" : "items-center"
        }`}
      >
        {/* 1. BURGER MENU */}

        <div
          ref={burgerMenuRef}
          className={`absolute left-4 sm:left-6 lg:left-8 z-10 group transition-all duration-300 ease-in-out ${
            isTop
              ? "opacity-0 scale-50 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <button
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-(--foreground) transition-colors outline-none ${
              isBurgerMenuOpen
                ? "bg-(--nav-hover)"
                : "bg-transparent hover:bg-(--nav-hover) group-hover:bg-(--nav-hover)"
            }`}
          >
            ☰
          </button>

          <div
            className={`absolute left-0 top-full w-max transition-all duration-300 z-50 ${
              isBurgerMenuOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
            }`}
          >
            <div className="min-w-56 rounded-xl mt-3 bg-(--header-bg) p-1 backdrop-blur-md shadow-2xl">
              {[
                { label: "Kalkulator", href: "/calculator" },
                { label: "Projektant wnętrz", href: "/designer" },
                { label: "Work in Progress", href: "/" },
                { label: "Work in Progress", href: "/" },
                { label: "Work in Progress", href: "/" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="block px-3 py-2 text-sm rounded-lg text-(--foreground) hover:bg-(--nav-hover) transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 2. LOGO  */}

        <div
          className={`flex flex-col justify-center transition-all duration-300 ease-in-out ${
            isTop ? "ml-0" : "ml-14"
          }`}
        >
          <Link
            href="/"
            className={`w-fit flex items-center transition-all duration-300 ease-in-out origin-left ${
              isTop ? "gap-4" : "gap-0"
            }`}
          >
            <div
              className={`transition-all duration-300 ease-in-out ${
                isTop
                  ? "w-10 h-10 opacity-100 scale-150"
                  : "w-0 h-0 opacity-0 scale-50 pointer-events-none"
              }`}
            >
              <Image
                src="/Logo/Logo2-1.png"
                alt="Project One Logo"
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
            <span
              className={`font-bold tracking-tight whitespace-nowrap transition-all duration-300 ease-in-out text-(--foreground) ${
                isTop ? "text-4xl sm:text-5xl" : "text-xl"
              }`}
            >
              Project One
            </span>
          </Link>

          {/* Horizontal Menu */}

          <div
            className={`flex gap-1 overflow-hidden transition-all duration-300 ease-in-out text-md ${
              isTop
                ? "max-h-26 opacity-100 mt-2 translate-y-0"
                : "max-h-0 opacity-0 mt-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {[
              { label: "Kalkulator", href: "/calculator" },
              { label: "Projektant wnętrz", href: "/designer" },
              { label: "Work in Progress", href: "/" },
              { label: "Work in Progress", href: "/" },
              { label: "Work in Progress", href: "/" },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="whitespace-nowrap shrink-0 rounded-xl bg-transparent px-4 py-2 font-semibold transition-all duration-300 outline-none text-(--foreground) ring-1 ring-inset ring-transparent hover:bg-(--nav-hover) hover:ring-(--border)"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* WIP Buttons */}

        <div className="ml-auto flex items-center gap-2 relative">
          <div
            className={`ml-auto flex gap-2 transition-all duration-300 ${isTop ? "text-2xl" : "text-md"}`}
          >
            <Link
              href="/"
              className="whitespace-nowrap shrink-0 rounded-xl bg-transparent px-4 py-2 font-semibold transition-all duration-300 outline-none text-(--foreground) ring-1 ring-inset ring-transparent hover:bg-(--nav-hover) hover:ring-(--border)"
            >
              WIP
            </Link>
            <Link
              href="/"
              className="whitespace-nowrap shrink-0 rounded-xl bg-transparent px-4 py-2 font-semibold transition-all duration-300 outline-none text-(--foreground) ring-1 ring-inset ring-transparent hover:bg-(--nav-hover) hover:ring-(--border)"
            >
              WIP
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`transition-all duration-300 shrink-0 hover:scale-110 active:scale-95${
                isTop ? "w-16 h-16 scale-125" : "w-10 h-10"
              }`}
            >
              <Image
                src="/Icons/theme-icon.png"
                alt="Theme"
                width={48}
                height={48}
                className={`object-contain transition-all duration-300 ${
                  themeindex === 0 || themeindex === 2 ? "invert" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 top-full transition-all duration-300 text-sm font-medium z-50 ${
                isThemeMenuOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible pointer-events-none"
              }`}
            >
              <div
                className={`w-48 rounded-xl bg-(--header-bg) p-1 backdrop-blur-md shadow-2xl flex flex-col gap-1 ${
                  isTop ? "mt-9.5" : "mt-2.5"
                }`}
                ref={themeMenuRef}
              >
                {/* Project One Theme */}

                <button
                  className={`w-full px-3 py-2 flex items-center gap-3 text-left transition-colors duration-200 rounded-lg outline-none text-(--foreground) 
                    ${
                      themeindex === 0
                        ? "bg-(--nav-hover) border"
                        : "bg-transparent hover:bg-(--nav-hover)"
                    }`}
                  onClick={() => {
                    setThemeindex(0);
                    setIsThemeMenuOpen(false);
                  }}
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    <Image
                      src="/Logo/Logo2-1.png"
                      alt="Project One"
                      width={24}
                      height={24}
                      className="object-contain transition-all duration-300"
                    />
                  </div>
                  <span className="whitespace-nowrap">Project One</span>
                </button>

                {/* Light Theme */}

                <button
                  className={`w-full px-3 py-2 flex items-center gap-3 text-left transition-colors duration-200 rounded-lg outline-none text-(--foreground) 
                    ${
                      themeindex === 1
                        ? "bg-(--nav-hover) border"
                        : "bg-transparent hover:bg-(--nav-hover)"
                    }`}
                  onClick={() => {
                    setThemeindex(1);
                    setIsThemeMenuOpen(false);
                  }}
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    <Image
                      src="/Icons/light.png"
                      alt="Light"
                      width={24}
                      height={24}
                      className={`object-contain transition-all duration-300 ${
                        themeindex === 0 || themeindex === 2 ? "invert" : ""
                      }`}
                    />
                  </div>
                  <span className="whitespace-nowrap">Light Theme</span>
                </button>

                {/* Dark Theme */}

                <button
                  className={`w-full px-3 py-2 flex items-center gap-3 text-left transition-colors duration-200 rounded-lg outline-none text-(--foreground) 
                    ${
                      themeindex === 2
                        ? "bg-(--nav-hover) border"
                        : "bg-transparent hover:bg-(--nav-hover)"
                    }`}
                  onClick={() => {
                    setThemeindex(2);
                    setIsThemeMenuOpen(false);
                  }}
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    <Image
                      src="/Icons/dark.png"
                      alt="Dark"
                      width={24}
                      height={24}
                      className={`object-contain transition-all duration-300 ${
                        themeindex === 0 || themeindex === 2 ? "invert" : ""
                      }`}
                    />
                  </div>
                  <span className="whitespace-nowrap">Dark Theme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
