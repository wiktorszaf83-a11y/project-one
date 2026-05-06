"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getCookie, setCookie, themes } from "@/utils/cookies";
import { useRouter, usePathname, Link } from "@/i18n/routing";

export default function Header({}) {
  const themeMenu = useTranslations("header.themeMenu");
  const themeMenuObjects = [
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
  ];
  const langMenu = useTranslations("header.langMenu");
  const langMenuObjects = [
    {
      src: "/Icons/Lang/pl.png",
      alt: "Polski",
      code: "pl",
      label: langMenu("pl"),
    },
    {
      src: "/Icons/Lang/en.png",
      alt: "English",
      code: "en",
      label: langMenu("en"),
    },
  ];

  const userMenu = useTranslations("header.userMenu");
  const userMenuObjects = [
    { label: userMenu("option1"), href: "/" },
    { label: userMenu("option2"), href: "/" },
    { label: userMenu("option3"), href: "/" },
    { label: userMenu("option4"), href: "/" },
    { label: userMenu("option5"), href: "/" },
  ];

  const leftAndSuperMenu = useTranslations("header.leftAndSuperMenu");
  const leftAndSuperMenuObjects = [
    { label: leftAndSuperMenu("option1"), href: "/interiorDesigner" },
    { label: leftAndSuperMenu("option2"), href: "/flappyBird" },
    { label: leftAndSuperMenu("option3"), href: "/" },
    { label: leftAndSuperMenu("option4"), href: "/" },
    { label: leftAndSuperMenu("option5"), href: "/" },
    { label: leftAndSuperMenu("option6"), href: "/" },
  ];

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLang: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLang });
    });
  };

  // Refs
  const leftMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideMenu =
        (themeMenuRef.current && themeMenuRef.current.contains(target)) ||
        (leftMenuRef.current && leftMenuRef.current.contains(target)) ||
        (userMenuRef.current && userMenuRef.current.contains(target)) ||
        (langMenuRef.current && langMenuRef.current.contains(target));

      if (!isInsideMenu) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Menu states
  const [activeMenu, setActiveMenu] = useState<
    "left" | "lang" | "user" | "theme" | null
  >(null);

  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [themeindex, setThemeindex] = useState(0);

  useEffect(() => {
    const savedTheme = getCookie("themeIndex");
    if (savedTheme !== null) {
      setThemeindex(parseInt(savedTheme, 10));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes[themeindex]);
    setCookie("themeIndex", themeindex.toString());
  }, [themeindex]);

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
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseEnter = (menu: "left" | "lang" | "user" | "theme") => {
    if (window.innerWidth >= 768) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      setActiveMenu(menu);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      closeTimerRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 bg-(--header-bg)
        ${isVisible ? "translate-y-0" : "-translate-y-full"} md:translate-y-0
        `}
    >
      {/* Main Header */}
      <div
        className={`w-full px-2 md:px-4 transition-all duration-300
        h-12 
        ${scrollY > 100 ? "md:h-14" : "md:h-20"}
        `}
      >
        <div className="items-center justify-between flex max-w-7xl mx-auto h-full">
          {/* Left Side */}
          <div className="flex items-center">
            <div
              className="relative"
              ref={leftMenuRef}
              onMouseEnter={() => {
                if (scrollY > 100) handleMouseEnter("left");
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative flex items-center justify-center w-8 md:w-11 h-auto -translate-y-4 md:-translate-y-5">
                {/* Hamburger Button */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300
                ${scrollY > 100 ? "opacity-100 pointer-events-auto" : "md:opacity-0 md:pointer-events-none"}`}
                >
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === "left" ? null : "left")
                    }
                    className={`flex flex-col items-center justify-center rounded-lg border w-8 h-8 md:w-10 md:h-10 font-bold text-(--foreground) hover:scale-110 transition-transform duration-300 outline-none
                   ${
                     activeMenu === "left"
                       ? "bg-(--nav-hover)"
                       : "bg-transparent hover:bg-(--nav-hover)"
                   }`}
                  >
                    <span className="text-xl md:text-3xl leading-none -translate-y-0.5 ">
                      ☰
                    </span>
                  </button>
                </div>

                {/* Icon Logo */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300
                ${scrollY > 100 ? "opacity-0 pointer-events-none" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}`}
                >
                  <Link href={`/`}>
                    <Image
                      src="/Logo/znaczekLogo.png"
                      alt="Logo Icon"
                      width={64}
                      height={64}
                      priority
                      className={`scale-115 object-contain hover:scale-125 transition-transform duration-300
                        ${scrollY > 100 ? "md:scale-100" : "md:scale-135 md:hover:scale-155"} 
                  ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                    />
                  </Link>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 left-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${activeMenu === "left" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu Container */}
              <div
                className={`
                fixed top-0 left-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${activeMenu === "left" ? "translate-x-0" : "-translate-x-full"}
                
                md:absolute md:top-7 md:left-0 md:w-max md:h-auto md:bg-transparent md:shadow-none md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  activeMenu === "left"
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : "md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none"
                }
              `}
              >
                {/* Mobile Left Menu */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {leftAndSuperMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {leftAndSuperMenuObjects.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block px-6 py-4 text-lg md:px-4 md:py-3 md:text-base text-(--foreground) hover:bg-(--nav-hover) transition-colors border-b last:border-b-0 border-(--border-color)"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Text Logo */}
            <div className="transition-all duration-300 ml-1 md:ml-1.5 md:translate-y-0">
              <Link href={`/`}>
                <Image
                  src="/Logo/tekstLogo.png"
                  alt="Logo Text"
                  width={128}
                  height={72}
                  className={`w-24 md:w-22 h-auto hover:scale-110 transition-transform duration-300
                    ${scrollY > 100 ? "md:scale-100" : "md:scale-125 md:translate-x-4 md:hover:scale-145"}
                  ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                  style={{ height: "auto" }}
                  priority
                />
              </Link>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex gap-2 md:gap-4">
            {/* Lang Menu */}
            <div
              className="relative"
              ref={langMenuRef}
              onMouseEnter={() => handleMouseEnter("lang")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "lang" ? null : "lang")
                }
                className="transition-all duration-300 shrink-0 hover:scale-115 active:scale-95 flex items-center justify-center translate-y-1 md:translate-y-1"
              >
                <Image
                  src="/Icons/Lang/lang.png"
                  alt="Lang"
                  width={48}
                  height={48}
                  className={`w-8 md:w-8 h-auto object-contain transition-all duration-300 
                    ${scrollY > 100 ? "md:scale-100" : "md:scale-135 md:-translate-x-2"}
                    ${themeindex === 0 || themeindex === 2 ? "invert" : ""}
                  `}
                />
              </button>

              {/* Backdrop for mobile */}
              <div
                className={`fixed top-0 right-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${activeMenu === "lang" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu container */}
              <div
                className={`
                fixed top-0 right-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${activeMenu === "lang" ? "translate-x-0" : "translate-x-full"}
                
                md:absolute md:top-12 md:-right-12 md:w-max md:h-auto md:bg-transparent md:shadow-none md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  activeMenu === "lang"
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : "md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none"
                }
              `}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {langMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {langMenuObjects.map((item) => (
                    <button
                      key={item.code}
                      disabled={isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        switchLanguage(item.code);

                        if (window.innerWidth < 768) {
                          setActiveMenu(null);
                        }
                      }}
                      className={`px-6 py-4 md:p-3 transition-colors duration-200 flex items-center justify-start gap-4 border-b last:border-b-0 md:border-none border-(--border-color)
                      ${locale === item.code ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"}
                      ${isPending ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                        className={`object-contain transition-all duration-300 
                        ${item.code === "pl" ? "scale-90" : ""}
                      `}
                      />
                      <span className="text-lg text-(--foreground)">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* User Menu */}
            <div
              className="relative"
              ref={userMenuRef}
              onMouseEnter={() => handleMouseEnter("user")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "user" ? null : "user")
                }
                className="transition-all duration-300 shrink-0 hover:scale-115 active:scale-95 flex items-center justify-center translate-y-1 md:translate-y-1"
              >
                <Image
                  src="/Icons/user.png"
                  alt="User"
                  width={48}
                  height={48}
                  className={`w-8 md:w-8 h-auto object-contain transition-all duration-300 
                    ${scrollY > 100 ? "md:scale-100" : "md:scale-135 md:-translate-x-1"}
                    ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 right-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${activeMenu === "user" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setActiveMenu(null)}
              />
              <div
                className={`
                fixed top-0 right-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${activeMenu === "user" ? "translate-x-0" : "translate-x-full"}
                
                md:absolute md:top-12 md:-right-14 md:w-max md:h-auto md:bg-transparent md:shadow-none md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  activeMenu === "user"
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : "md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none"
                }
              `}
              >
                {/* Mobile User Menu */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {userMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {userMenuObjects.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block px-6 py-4 text-lg md:px-4 md:py-3 md:text-base text-(--foreground) hover:bg-(--nav-hover) transition-colors border-b last:border-b-0 border-(--border-color)"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Theme Menu */}
            <div
              className="relative"
              ref={themeMenuRef}
              onMouseEnter={() => handleMouseEnter("theme")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "theme" ? null : "theme")
                }
                className="transition-all duration-300 shrink-0 hover:scale-115 active:scale-95 flex items-center justify-center translate-y-0 md:translate-y-0"
              >
                <Image
                  src="/Icons/Themes/theme-icon.png"
                  alt="Theme"
                  width={48}
                  height={48}
                  className={`w-10 md:w-10 h-auto object-contain transition-all duration-300 
                    ${scrollY > 100 ? "md:scale-100" : "md:scale-135"}
                    ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                />
              </button>

              {/* Backdrop for mobile */}
              <div
                className={`fixed top-0 right-0 w-full h-dvh bg-black/60 z-40 transition-opacity duration-300 md:hidden
                ${activeMenu === "theme" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu container */}
              <div
                className={`
                fixed top-0 right-0 w-[80vw] h-dvh bg-(--header-bg) z-50 flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                ${activeMenu === "theme" ? "translate-x-0" : "translate-x-full"}
                
                md:absolute md:top-12 md:right-0 md:w-max md:h-auto md:bg-transparent md:shadow-none md:block backdrop-blur-xs md:backdrop-blur-md
                ${
                  activeMenu === "theme"
                    ? "md:translate-x-0 md:translate-y-0 md:opacity-100 md:visible md:pointer-events-auto"
                    : "md:translate-x-0 md:-translate-y-2 md:opacity-0 md:invisible md:pointer-events-none"
                }
              `}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-(--border-color) md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {themeMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto md:overflow-visible md:bg-(--header-bg) md:shadow-2xl md:rounded-lg md:border md:border-(--border-color)">
                  {themeMenuObjects.map((item) => (
                    <button
                      key={item.index}
                      onClick={() => {
                        setThemeindex(item.index);
                        setActiveMenu(null);
                      }}
                      className={`px-6 py-4 md:p-3 transition-colors duration-200 flex items-center justify-start gap-4 border-b last:border-b-0 md:border-none border-(--border-color)
                      ${themeindex === item.index ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                        className={`object-contain transition-all duration-300 ${
                          themeindex === 0 || themeindex === 2 ? "invert" : ""
                        } ${item.index === 2 ? "scale-90" : ""}`}
                      />
                      <span className="text-lg text-(--foreground)">
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
      <div className="hidden md:flex items-center justify-center">
        <nav className="max-w-7xl mx-auto w-full flex justify-left">
          {leftAndSuperMenuObjects.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`
        flex-1 flex items-center justify-center
        font-semibold text-(--foreground) 
        hover:bg-(--nav-hover) hover:opacity-70 
        transition-all duration-300 overflow-hidden
        rounded-lg mx-1.5 hover:scale-110
        ${scrollY > 100 ? "h-0 opacity-0 pointer-events-none" : "h-14 opacity-100"}
      `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
