"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getCookie, setCookie, themes } from "@/utils/cookies";
import { useRouter, usePathname, Link } from "@/i18n/routing";

export default function Header() {
  const themeMenu = useTranslations("header.themeMenu");
  const themeMenuObjects = [
    {
      src: "/Logo/smallLogo.png",
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
    { label: leftAndSuperMenu("option1"), href: "/designer" },
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

  // Page is static?
  const staticPages = ["/designer", "/flappyBird"];
  const isStaticPage = staticPages.includes(pathname);

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
    if (isStaticPage) {
      setIsVisible(true);
    } else {
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
    }
  }, [lastScrollY, isStaticPage]);

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
      className={`fixed top-0 left-0 z-50 flex w-full flex-col bg-(--header-bg) transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} md:translate-y-0`}
    >
      {/* Main Header */}
      <div
        className={`h-12 w-full px-2 transition-all duration-300 md:px-4 ${scrollY > 100 ? "md:h-14" : !isStaticPage ? "md:h-20" : "md:h-14"} `}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center">
            <div
              className="relative"
              ref={leftMenuRef}
              onMouseEnter={() => {
                if (isStaticPage || scrollY > 100) handleMouseEnter("left");
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative flex h-auto w-8 -translate-y-4 items-center justify-center md:w-11 md:-translate-y-5">
                {/* Hamburger Button */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${scrollY > 100 ? "pointer-events-auto opacity-100" : isStaticPage ? "pointer-events-auto opacity-100" : "md:pointer-events-none md:opacity-0"}`}
                >
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === "left" ? null : "left")
                    }
                    className={`flex h-8 w-8 flex-col items-center justify-center rounded-lg border font-bold text-(--foreground) transition-transform duration-300 outline-none hover:scale-110 md:h-10 md:w-10 ${
                      activeMenu === "left"
                        ? "bg-(--nav-hover)"
                        : "bg-transparent hover:bg-(--nav-hover)"
                    }`}
                  >
                    <span className="-translate-y-0.5 text-xl leading-none md:text-3xl">
                      ☰
                    </span>
                  </button>
                </div>

                {/* Icon Logo */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${scrollY > 100 ? "pointer-events-none opacity-0" : isStaticPage ? "pointer-events-none opacity-0" : "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100"}`}
                >
                  <Link href={`/`}>
                    <Image
                      src="/Logo/smallLogo.png"
                      alt="Logo Icon"
                      width={64}
                      height={64}
                      priority
                      className={`scale-115 object-contain transition-transform duration-300 hover:scale-125 ${scrollY > 100 ? "md:scale-100" : "md:scale-135 md:hover:scale-155"} ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                    />
                  </Link>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 left-0 z-40 h-dvh w-full bg-black/60 transition-opacity duration-300 md:hidden ${activeMenu === "left" ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu Container */}
              <div
                className={`fixed top-0 left-0 z-50 flex h-dvh w-[80vw] flex-col bg-(--header-bg) shadow-2xl transition-all duration-300 ease-in-out ${activeMenu === "left" ? "translate-x-0" : "-translate-x-full"} backdrop-blur-xs md:absolute md:top-7 md:left-0 md:block md:h-auto md:w-max md:bg-transparent md:shadow-none md:backdrop-blur-md ${
                  activeMenu === "left"
                    ? "md:pointer-events-auto md:visible md:translate-x-0 md:translate-y-0 md:opacity-100"
                    : "md:pointer-events-none md:invisible md:translate-x-0 md:-translate-y-2 md:opacity-0"
                } `}
              >
                {/* Mobile Left Menu */}
                <div className="flex items-center justify-between border-b border-(--border-color) p-6 md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {leftAndSuperMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 transition-opacity hover:opacity-100"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto md:overflow-visible md:rounded-lg md:border md:border-(--border-color) md:bg-(--header-bg) md:shadow-2xl">
                  {leftAndSuperMenuObjects.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block border-b border-(--border-color) px-6 py-4 text-lg text-(--foreground) transition-colors last:border-b-0 hover:bg-(--nav-hover) md:px-4 md:py-3 md:text-base"
                      onClick={() => setActiveMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Text Logo */}
            <div className="ml-1 transition-all duration-300 md:ml-1.5 md:translate-y-0">
              <Link href={`/`}>
                <Image
                  src="/Logo/textLogo.png"
                  alt="Logo Text"
                  width={128}
                  height={72}
                  className={`h-auto w-24 transition-transform duration-300 hover:scale-110 md:w-22 ${scrollY > 100 ? "md:scale-100" : isStaticPage ? "md:scale-100" : "md:translate-x-4 md:scale-125 md:hover:scale-145"} ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
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
                className="flex shrink-0 translate-y-1 items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 md:translate-y-1"
              >
                <Image
                  src="/Icons/Lang/lang.png"
                  alt="Lang"
                  width={48}
                  height={48}
                  className={`h-auto w-8 object-contain transition-all duration-300 md:w-8 ${scrollY > 100 ? "md:scale-100" : isStaticPage ? "md:scale-100" : "md:-translate-x-2 md:scale-135"} ${themeindex === 0 || themeindex === 2 ? "invert" : ""} `}
                />
              </button>

              {/* Backdrop for mobile */}
              <div
                className={`fixed top-0 right-0 z-40 h-dvh w-full bg-black/60 transition-opacity duration-300 md:hidden ${activeMenu === "lang" ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu container */}
              <div
                className={`fixed top-0 right-0 z-50 flex h-dvh w-[80vw] flex-col bg-(--header-bg) shadow-2xl transition-all duration-300 ease-in-out ${activeMenu === "lang" ? "translate-x-0" : "translate-x-full"} backdrop-blur-xs md:absolute md:top-12 md:-right-12 md:block md:h-auto md:w-max md:bg-transparent md:shadow-none md:backdrop-blur-md ${
                  activeMenu === "lang"
                    ? "md:pointer-events-auto md:visible md:translate-x-0 md:translate-y-0 md:opacity-100"
                    : "md:pointer-events-none md:invisible md:translate-x-0 md:-translate-y-2 md:opacity-0"
                } `}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-(--border-color) p-6 md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {langMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 transition-opacity hover:opacity-100"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex flex-1 flex-col overflow-y-auto md:overflow-visible md:rounded-lg md:border md:border-(--border-color) md:bg-(--header-bg) md:shadow-2xl">
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
                      className={`flex items-center justify-start gap-4 border-b border-(--border-color) px-6 py-4 transition-colors duration-200 last:border-b-0 md:border-none md:p-3 ${locale === item.code ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"} ${isPending ? "cursor-not-allowed opacity-50" : "opacity-100"}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                        className={`object-contain transition-all duration-300 ${item.code === "pl" ? "scale-90" : ""} `}
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
                className="flex shrink-0 translate-y-1 items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 md:translate-y-1"
              >
                <Image
                  src="/Icons/user.png"
                  alt="User"
                  width={48}
                  height={48}
                  className={`h-auto w-8 object-contain transition-all duration-300 md:w-8 ${scrollY > 100 ? "md:scale-100" : isStaticPage ? "md:scale-100" : "md:-translate-x-1 md:scale-135"} ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`fixed top-0 right-0 z-40 h-dvh w-full bg-black/60 transition-opacity duration-300 md:hidden ${activeMenu === "user" ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={() => setActiveMenu(null)}
              />
              <div
                className={`fixed top-0 right-0 z-50 flex h-dvh w-[80vw] flex-col bg-(--header-bg) shadow-2xl transition-all duration-300 ease-in-out ${activeMenu === "user" ? "translate-x-0" : "translate-x-full"} backdrop-blur-xs md:absolute md:top-12 md:-right-14 md:block md:h-auto md:w-max md:bg-transparent md:shadow-none md:backdrop-blur-md ${
                  activeMenu === "user"
                    ? "md:pointer-events-auto md:visible md:translate-x-0 md:translate-y-0 md:opacity-100"
                    : "md:pointer-events-none md:invisible md:translate-x-0 md:-translate-y-2 md:opacity-0"
                } `}
              >
                {/* Mobile User Menu */}
                <div className="flex items-center justify-between border-b border-(--border-color) p-6 md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {userMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 transition-opacity hover:opacity-100"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto md:overflow-visible md:rounded-lg md:border md:border-(--border-color) md:bg-(--header-bg) md:shadow-2xl">
                  {userMenuObjects.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="block border-b border-(--border-color) px-6 py-4 text-lg text-(--foreground) transition-colors last:border-b-0 hover:bg-(--nav-hover) md:px-4 md:py-3 md:text-base"
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
                className="flex shrink-0 translate-y-0 items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 md:translate-y-0"
              >
                <Image
                  src="/Icons/Themes/theme-icon.png"
                  alt="Theme"
                  width={48}
                  height={48}
                  className={`h-auto w-10 object-contain transition-all duration-300 md:w-10 ${scrollY > 100 ? "md:scale-100" : isStaticPage ? "md:scale-100" : "md:scale-135"} ${themeindex === 0 || themeindex === 2 ? "invert" : ""}`}
                />
              </button>

              {/* Backdrop for mobile */}
              <div
                className={`fixed top-0 right-0 z-40 h-dvh w-full bg-black/60 transition-opacity duration-300 md:hidden ${activeMenu === "theme" ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={() => setActiveMenu(null)}
              />

              {/* Menu container */}
              <div
                className={`fixed top-0 right-0 z-50 flex h-dvh w-[80vw] flex-col bg-(--header-bg) shadow-2xl transition-all duration-300 ease-in-out ${activeMenu === "theme" ? "translate-x-0" : "translate-x-full"} backdrop-blur-xs md:absolute md:top-12 md:right-0 md:block md:h-auto md:w-max md:bg-transparent md:shadow-none md:backdrop-blur-md ${
                  activeMenu === "theme"
                    ? "md:pointer-events-auto md:visible md:translate-x-0 md:translate-y-0 md:opacity-100"
                    : "md:pointer-events-none md:invisible md:translate-x-0 md:-translate-y-2 md:opacity-0"
                } `}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-(--border-color) p-6 md:hidden">
                  <span className="text-2xl font-black tracking-wider text-(--foreground)">
                    {themeMenu("menuName")}
                  </span>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-4xl leading-none text-(--foreground) opacity-70 transition-opacity hover:opacity-100"
                    aria-label="Zamknij menu"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto md:overflow-visible md:rounded-lg md:border md:border-(--border-color) md:bg-(--header-bg) md:shadow-2xl">
                  {themeMenuObjects.map((item) => (
                    <button
                      key={item.index}
                      onClick={() => {
                        setThemeindex(item.index);
                        setActiveMenu(null);
                      }}
                      className={`flex items-center justify-start gap-4 border-b border-(--border-color) px-6 py-4 transition-colors duration-200 last:border-b-0 md:border-none md:p-3 ${themeindex === item.index ? "bg-(--nav-hover)" : "hover:bg-(--nav-hover)"}`}
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
      {pathname === "/" && (
        <div className="hidden items-center justify-center md:flex">
          <nav className="justify-left mx-auto flex w-full max-w-7xl">
            {leftAndSuperMenuObjects.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`mx-1.5 flex flex-1 items-center justify-center overflow-hidden rounded-lg font-semibold text-(--foreground) transition-all duration-300 hover:scale-110 hover:bg-(--nav-hover) hover:opacity-70 ${scrollY > 100 ? "pointer-events-none h-0 opacity-0" : "h-14 opacity-100"} `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
