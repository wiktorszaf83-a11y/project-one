"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Header({ lang }: { lang: string }) {
  const accountMenu = useTranslations("header.accountMenu");
  const leftMenu = useTranslations("header.leftMenu");
  const themeMenu = useTranslations("header.themeMenu");
  const superMenu = useTranslations("header.superMenu");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  // Refs
  const leftMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
      if (
        leftMenuRef.current &&
        !leftMenuRef.current.contains(event.target as Node)
      ) {
        setIsLeftMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Left Menu
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  // Lang Menu
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  // User menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Theme Menu
  const [themeindex, setThemeindex] = useState(0);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themes = ["project-one", "light", "dark"];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes[themeindex]);
  });

  // Scroll
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mobile
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Desktop
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleResize = () => {
      document.body.classList.add("resize-animation-stopper");

      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 bg-(--header-bg)
        ${isVisible ? "translate-y-0" : "-translate-y-full"} md:translate-y-0
        `}
    >
      {/* Main Header */}
      <div
        className={`w-full px-2 md:px-4 transition-all duration-300
        h-12 md:h-18
        `}
      >
        <div className="items-center justify-between flex max-w-7xl mx-auto h-full">
          {/* Left Side */}
          <div className="flex items-center">
            <div className="relative group" ref={leftMenuRef}>
              <div className="relative flex items-center justify-center w-8 h-8 md:w-14 md:h-14">
                {/* Hamburger Button */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300
                ${scrollY > 100 ? "opacity-100 pointer-events-auto" : "md:opacity-0 md:pointer-events-none"}`}
                >
                  <button
                    onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}
                    className={`flex flex-col items-center justify-center rounded-lg border w-full h-full font-bold text-(--foreground) hover:scale-110 transition-transform duration-300 outline-none
                   ${
                     isLeftMenuOpen
                       ? "bg-(--nav-hover)"
                       : "bg-transparent hover:bg-(--nav-hover)"
                   }`}
                  >
                    <span className="text-xl md:text-3xl leading-none -translate-y-0.5">
                      ☰
                    </span>
                  </button>
                </div>

                {/* Icon Logo */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300
                ${scrollY > 100 ? "opacity-0 pointer-events-none" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}`}
                >
                  <Link href={`/${locale}`}>
                    <Image
                      src="/Logo/znaczekLogo.png"
                      alt="Logo Icon"
                      width={64}
                      height={64}
                      className={`scale-115 object-contain hover:scale-125 transition-transform duration-300
                  ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                    />
                  </Link>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 left-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${isLeftMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsLeftMenuOpen(false)}
              />

              {/* Menu Container */}
              <div
                className={`
                fixed top-0 left-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"}
                
                md:absolute md:top-full md:left-0 md:w-max md:h-auto md:bg-transparent md:shadow-none d:pt-1 md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  isLeftMenuOpen
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : `md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none ${
                        scrollY > 100
                          ? "group-hover:md:translate-y-0 group-hover:md:opacity-100 group-hover:md:visible group-hover:md:pointer-events-auto"
                          : ""
                      }`
                }
              `}
              >
                {/* Mobile Left Menu */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {leftMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setIsLeftMenuOpen(false)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {[
                    { label: leftMenu("option1"), href: "/" },
                    { label: leftMenu("option2"), href: "/" },
                    { label: leftMenu("option3"), href: "/" },
                    { label: leftMenu("option4"), href: "/" },
                    { label: leftMenu("option5"), href: "/" },
                  ].map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block px-6 py-4 text-lg md:px-4 md:py-3 md:text-base text-(--foreground) hover:bg-(--nav-hover) transition-colors border-b last:border-b-0 border-(--border-color)"
                      onClick={() => setIsLeftMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Text Logo */}
            <div className="transition-all duration-300 ml-1 md:ml-4">
              <Link href={`/${locale}`}>
                <Image
                  src="/Logo/tekstLogo.png"
                  alt="Logo Text"
                  width={128}
                  height={72}
                  className={`w-24 md:w-32 h-auto hover:scale-110 transition-transform duration-300
                  ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                  style={{ height: "auto" }}
                />
              </Link>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex gap-2 md:gap-4">
            {/* Lang Menu */}
            <div className="relative group" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="transition-all duration-300 shrink-0 hover:scale-110 active:scale-95 flex items-center justify-center translate-y-1 md:translate-y-2"
              >
                <Image
                  src="/Icons/Lang/lang.png"
                  alt="Lang"
                  width={48}
                  height={48}
                  className={`w-8 md:w-12 h-auto object-contain transition-all duration-300 ${
                    themeindex === 0 || themeindex === 2 ? "invert" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 top-full w-max transition-all duration-300 z-50 md:pt-1 backdrop-blur-md ${
                  isLangMenuOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:md:translate-y-0 group-hover:md:opacity-100 group-hover:md:visible group-hover:md:pointer-events-auto"
                }`}
              >
                <div
                  className="flex flex-col bg-(--header-bg) shadow-2xl rounded-xl overflow-hidden border border-(--border-color)"
                  ref={langMenuRef}
                >
                  {[
                    {
                      src: "/Icons/Lang/pl.png",
                      alt: "Project One",
                      code: "pl",
                    },
                    {
                      src: "/Icons/Lang/en.png",
                      alt: "Light",
                      code: "en",
                    },
                  ].map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        switchLanguage(item.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`p-3 transition-colors duration-200 flex items-center justify-between gap-3
                      ${locale === item.code ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                        className={`object-contain transition-all duration-300 
                        ${item.index === 2 ? "scale-90" : ""}
                      `}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* User Menu */}
            <div className="relative group" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="transition-all duration-300 shrink-0 hover:scale-110 active:scale-95 flex items-center justify-center translate-y-1 md:translate-y-2"
              >
                <Image
                  src="/Icons/user.png"
                  alt="User"
                  width={48}
                  height={48}
                  className={`w-8 md:w-12 h-auto object-contain transition-all duration-300 ${
                    themeindex === 0 || themeindex === 2 ? "invert" : ""
                  }`}
                />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 right-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${isUserMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div
                className={`
                fixed top-0 right-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${isUserMenuOpen ? "translate-x-0" : "translate-x-full"}
                
                md:absolute md:top-full md:right-0 md:w-max md:h-auto md:bg-transparent md:shadow-none md:pt-1 md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  isUserMenuOpen
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : "md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none group-hover:md:translate-y-0 group-hover:md:opacity-100 group-hover:md:visible group-hover:md:pointer-events-auto"
                }
              `}
              >
                {/* Mobile User Menu */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {accountMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {[
                    { label: accountMenu("option1"), href: "/" },
                    { label: accountMenu("option2"), href: "/" },
                    { label: accountMenu("option3"), href: "/" },
                    { label: accountMenu("option4"), href: "/" },
                    { label: accountMenu("option5"), href: "/" },
                  ].map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block px-6 py-4 text-lg md:px-4 md:py-3 md:text-base text-(--foreground) hover:bg-(--nav-hover) transition-colors border-b last:border-b-0 border-(--border-color)"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Theme Menu */}
            <div className="relative group">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="transition-all duration-300 shrink-0 hover:scale-110 active:scale-95 flex items-center justify-center"
              >
                <Image
                  src="/Icons/Themes/theme-icon.png"
                  alt="Theme"
                  width={48}
                  height={48}
                  className={`w-10 md:w-16 h-auto object-contain transition-all duration-300 ${
                    themeindex === 0 || themeindex === 2 ? "invert" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 top-full w-max transition-all duration-300 z-50 md:pt-1 backdrop-blur-md ${
                  isThemeMenuOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:md:translate-y-0 group-hover:md:opacity-100 group-hover:md:visible group-hover:md:pointer-events-auto"
                }`}
              >
                <div
                  className="flex flex-col bg-(--header-bg) shadow-2xl rounded-xl overflow-hidden border border-(--border-color)"
                  ref={themeMenuRef}
                >
                  {[
                    {
                      src: "/Logo/znaczekLogo.png",
                      alt: "Project One",
                      index: 0,
                      Label: themeMenu("one"),
                    },
                    {
                      src: "/Icons/Themes/light.png",
                      alt: "Light",
                      index: 1,
                      Label: themeMenu("light"),
                    },
                    {
                      src: "/Icons/Themes/dark.png",
                      alt: "Dark",
                      index: 2,
                      Label: themeMenu("dark"),
                    },
                  ].map((item) => (
                    <button
                      key={item.index}
                      onClick={() => {
                        setThemeindex(item.index);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`p-3 transition-colors duration-200 flex items-center justify-between gap-3
            ${themeindex === item.index ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                        className={`object-contain transition-all duration-300 ${
                          themeindex === 0 || themeindex === 2 ? "invert" : ""
                        }
                        ${item.index === 2 ? "scale-90" : ""}
                      `}
                      />
                      <span className="hidden md:block text-lg">
                        {item.Label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Super Menu */}
      <div
        className={`hidden md:flex items-center justify-center border-(--border-color) transition-all duration-300 overflow-hidden
          ${scrollY > 100 ? "h-0 opacity-0 border-none" : "h-14 opacity-100"}
        `}
      >
        <nav className="max-w-7xl mx-auto w-full flex justify-left">
          {[
            { label: superMenu("option1"), href: "/" },
            { label: superMenu("option2"), href: "/" },
            { label: superMenu("option3"), href: "/" },
            { label: superMenu("option4"), href: "/" },
            { label: superMenu("option5"), href: "/" },
            { label: superMenu("option6"), href: "/" },
          ].map((link, idx) => (
            <div
              key={idx}
              className="relative group hover:bg-(--nav-hover) flex-1 text-center py-3 rounded-md"
            >
              <Link
                href={link.href}
                className="font-semibold text-(--foreground) hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
