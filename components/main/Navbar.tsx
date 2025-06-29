"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Gift,
  GiftIcon,
  Instagram,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-swticher";
import { getTranslatedSlug } from "@/lib/slug-mapping";

interface MenuItemType {
  nameKey: string;
  href: string;
}

const MenuListing: MenuItemType[] = [
  { nameKey: "hotel", href: "/hotel" },
  { nameKey: "offers", href: "/pakiety" },
  { nameKey: "business", href: "/biznes" },
  { nameKey: "events", href: "/przyjecia" },
  { nameKey: "dining", href: "/restauracja" },
  { nameKey: "spa", href: "/spa" },
  { nameKey: "entertainment", href: "/rozrywka" },
  { nameKey: "kids", href: "/dzieci" },
];

interface NavbarProps {
  lang: string;
  dict: {
    nav: {
      [key: string]: string;
    };
  };
}

export function Navbar({ lang, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [menuItemsVisible, setMenuItemsVisible] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
      // Trigger menu items animation after sheet opens
      const timer = setTimeout(() => setMenuItemsVisible(true), 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
      setMenuItemsVisible(false);
    }
  }, [isSheetOpen]);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (navRef.current?.contains(event.target as Node)) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const isActive = (href: string) => {
    // Convert the base href to the localized version for comparison
    const segments = href.replace(/^\//, "").split("/");
    const translatedSegments = segments.map((segment) =>
      getTranslatedSlug(segment, lang as "pl" | "en")
    );
    const localizedHref = `/${lang}/${translatedSegments.join("/")}`;
    return (
      pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
    );
  };

  const getLocalizedHref = (path: string) => {
    // Convert path segments using slug translation
    const segments = path.replace(/^\//, "").split("/");
    const translatedSegments = segments.map((segment) => {
      if (!segment) return segment;
      return getTranslatedSlug(segment, lang as "pl" | "en");
    });
    return `/${lang}/${translatedSegments.join("/")}`;
  };

  const MobileMenuContent = () => (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Custom close button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSheetOpen(false)}
          className="text-white hover:bg-white/10 rounded-full h-8 w-8 transition-all duration-300 hover:rotate-90"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Header with logo - compact for half width */}
      <SheetHeader className="mb-3 pt-4 px-3 flex-shrink-0">
        <SheetTitle className="flex justify-center">
          <div
            className={`transition-all duration-700 ${
              menuItemsVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <Image
              src="/avangarda-logo-sm-3.png"
              alt="Hotel Avangarda"
              width={100}
              height={80}
              className="h-auto w-[100px]"
              quality={100}
              priority
            />
          </div>
        </SheetTitle>
      </SheetHeader>

      {/* Navigation menu - scrollable content */}
      <div className="flex flex-col flex-1 min-h-0 px-3">
        {/* Navigation links - compact spacing for half width */}
        <nav className="flex flex-col space-y-0.5 mb-3">
          {MenuListing.map((item, index) => (
            <div
              key={item.nameKey}
              className={`transition-all duration-500 ${
                menuItemsVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{
                transitionDelay: menuItemsVisible
                  ? `${index * 60 + 200}ms`
                  : "0ms",
              }}
            >
              <Link
                href={getLocalizedHref(item.href)}
                className={`group relative text-sm font-alata font-medium transition-all duration-300 py-2.5 px-3 rounded-lg block transform hover:translate-x-1 ${
                  isActive(item.href)
                    ? "text-avangarda bg-gradient-to-r from-avangarda/20 to-avangarda/10 border-l-3 border-avangarda"
                    : "text-white hover:text-avangarda hover:bg-white/5"
                }`}
                onClick={() => setIsSheetOpen(false)}
              >
                <span className="relative z-10 text-xs sm:text-sm">
                  {dict.nav[item.nameKey]}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-avangarda/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </Link>
            </div>
          ))}
        </nav>

        {/* Action buttons - compact for half width */}
        <div
          className={`flex flex-col gap-2 py-2 border-t border-white/20 transition-all duration-700 ${
            menuItemsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: menuItemsVisible ? "700ms" : "0ms" }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full font-alata justify-start gap-2 text-white hover:bg-white/10 py-2 text-xs rounded-lg transition-all duration-300 transform hover:translate-x-1"
            onClick={() => setIsSheetOpen(false)}
          >
            <Phone className="h-3 w-3 text-avangarda" />
            <span className="truncate">{dict.nav.phone}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full font-alata justify-start gap-2 text-white hover:bg-white/10 py-2 text-xs rounded-lg transition-all duration-300 transform hover:translate-x-1"
            onClick={() => setIsSheetOpen(false)}
          >
            <Gift className="h-3 w-3 text-avangarda" />
            <Link
              href={getLocalizedHref("/pakiety")}
              className="flex-1 text-left truncate"
            >
              Kup Voucher
            </Link>
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-avangarda to-avangarda/80 text-white hover:from-avangarda/90 hover:to-avangarda/70 py-2 text-xs font-alata rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-avangarda/25"
            onClick={() => setIsSheetOpen(false)}
          >
            {dict.nav.book}
          </Button>
        </div>

        {/* Footer section - compact */}
        <div
          className={`flex flex-col items-center gap-2 pt-2 pb-3 transition-all duration-700 ${
            menuItemsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: menuItemsVisible ? "900ms" : "0ms" }}
        >
          <div
            className={`transition-all duration-500 ${
              menuItemsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: menuItemsVisible ? "1000ms" : "0ms" }}
          >
            <LanguageSwitcher />
          </div>

          <div className="flex justify-center gap-3">
            {[
              {
                href: "https://facebook.com",
                icon: Facebook,
                label: "Facebook",
              },
              {
                href: "https://facebook.com",
                icon: Instagram,
                label: "Instagram",
              },
            ].map(({ href, icon: Icon, label }, index) => (
              <Link
                key={label}
                href={href}
                className={`text-white hover:text-avangarda transition-all duration-300 p-1.5 rounded-full hover:bg-white/10 transform hover:scale-110 ${
                  menuItemsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: menuItemsVisible
                    ? `${1100 + index * 100}ms`
                    : "0ms",
                }}
                aria-label={`Visit our ${label} page`}
                onClick={() => setIsSheetOpen(false)}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Container
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled || isHovered ? "bg-primary" : "bg-transparent pt-2 sm:pt-4"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div
        className={`transition-all duration-500 ${isScrolled ? "pb-2" : "flex items-center justify-end gap-4 py-2"}`}
      >
        {isScrolled ? (
          <>
            {/* Desktop layout when scrolled - Two row layout with logo on left between rows */}
            <div className="hidden xl:block relative">
              {/* First row: Phone, Language Switcher, Social Icons */}
              <div className="flex items-center justify-end gap-2 sm:gap-4 py-2">
                <Button
                  size="sm"
                  className="bg-transparent font-alata px-2 text-xs text-white hover:text-avangarda sm:px-4 sm:text-sm transition-colors duration-300"
                >
                  <Phone className="h-2 w-2 sm:h-3 sm:w-3" />
                  <span className="ml-1 text-[14px]">{dict.nav.phone}</span>
                </Button>
                <LanguageSwitcher />
                <div className="flex items-center gap-2">
                  <Link
                    href="https://facebook.com"
                    className="text-white hover:text-avangarda transition-colors duration-300"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    className="text-white hover:text-avangarda transition-colors duration-300"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Logo positioned on the left, centered between rows */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Link href={getLocalizedHref("/")} className="flex-shrink-0">
                  <Image
                    src="/avangarda-logo-sm-3.png"
                    alt="Hotel Avangarda"
                    width={130}
                    height={104}
                    className="h-auto w-[110px] transition-opacity duration-500 sm:w-[130px]"
                    quality={100}
                    priority
                  />
                </Link>
              </div>

              {/* Second row: Navigation + Kup Voucher */}
              <div className="flex items-center justify-between py-2">
                <nav className="flex items-center justify-center gap-3 xl:gap-6 flex-1">
                  {MenuListing.map((item) => (
                    <Link
                      key={item.nameKey}
                      href={getLocalizedHref(item.href)}
                      className={`whitespace-nowrap text-md font-alata font-medium transition-colors duration-300 tracking-wider ${
                        isActive(item.href)
                          ? "text-avangarda"
                          : "text-white hover:text-avangarda"
                      }`}
                    >
                      {dict.nav[item.nameKey]}
                    </Link>
                  ))}
                </nav>

                {/* Kup Voucher button moved to far right */}
                <Link href={getLocalizedHref("/pakiety")}>
                  <Button
                    size="sm"
                    className="bg-avangarda font-alata px-3 py-1.5 text-sm text-white hover:bg-avangarda/90 transition-colors duration-300"
                  >
                    <GiftIcon className="h-4 w-4 mr-2" />
                    Kup Voucher
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile/Tablet layout when scrolled */}
            <div
              className={`xl:hidden flex items-center justify-between ${isScrolled && "py-2"}`}
            >
              {/* Mobile logo when scrolled */}
              <Link href={getLocalizedHref("/")} className="flex-shrink-0">
                <Image
                  src="/avangarda-logo-sm-3.png"
                  alt="Hotel Avangarda"
                  width={110}
                  height={88}
                  className="h-auto w-[90px] transition-opacity duration-500 sm:w-[100px]"
                  quality={100}
                  priority
                />
              </Link>

              {/* Right side buttons */}
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  className="bg-avangarda font-alata px-3 py-2 text-xs text-white hover:bg-avangarda/90 sm:px-4 sm:text-sm transition-colors duration-300"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="ml-1 sm:ml-2">{dict.nav.phone}</span>
                </Button>

                <Link href={getLocalizedHref("/pakiety")}>
                  <Button
                    size="sm"
                    className="bg-avangarda font-alata px-2 py-1 text-xs text-white hover:bg-avangarda/90 xl:px-4 xl:text-sm flex transition-colors duration-300"
                  >
                    <GiftIcon className="h-3 w-3 xl:h-4 xl:w-4" />
                    <span className="hidden sm:inline xl:inline">
                      Kup Voucher
                    </span>
                  </Button>
                </Link>

                {/* Enhanced mobile menu trigger */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white p-4 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 h-14 w-14"
                    >
                      <Menu className="h-8 w-8" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right-mobile"
                    className="bg-gradient-to-br from-[#404042] via-[#404042] to-[#353537] border-l border-avangarda/20 p-0 overflow-hidden"
                  >
                    <MobileMenuContent />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </>
        ) : (
          // Original layout when not scrolled
          <>
            <Link
              href="https://facebook.com"
              className="hidden xl:flex text-white hover:text-avangarda transition-colors duration-300"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="https://facebook.com"
              className="hidden xl:flex text-white hover:text-avangarda transition-colors duration-300"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <div className="hidden xl:block">
              <LanguageSwitcher />
            </div>
            <Button
              size="sm"
              className="bg-avangarda font-alata px-2 text-xs text-white hover:bg-avangarda/90 sm:px-4 sm:text-sm transition-colors duration-300"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 sm:ml-2">{dict.nav.phone}</span>
            </Button>
            <Link href={getLocalizedHref("/pakiety")}>
              <Button
                size="sm"
                className="bg-avangarda font-alata px-2 text-xs text-white hover:bg-avangarda/90 sm:px-4 sm:text-sm flex transition-colors duration-300"
              >
                <GiftIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Kup Voucher
              </Button>
            </Link>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden text-white p-4 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 h-14 w-14"
                >
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right-mobile"
                className="bg-gradient-to-br from-[#404042] via-[#404042] to-[#353537] border-l border-avangarda/20 p-0 overflow-hidden"
              >
                <MobileMenuContent />
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>

      {/* Main navbar - only shown when not scrolled */}
      {!isScrolled && (
        <div className="relative">
          <div className="h-[120px] flex-col items-center justify-center sm:h-40">
            <Link
              href={getLocalizedHref("/")}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/avangarda-logo-lg-2.png"
                alt="Hotel Avangarda"
                width={200}
                height={160}
                className="h-auto w-[150px] transition-opacity duration-500 sm:w-[200px] md:w-[250px]"
                priority
              />
            </Link>
            <nav className="hidden w-full xl:flex absolute -bottom-10 left-0 flex-row justify-center gap-2 xl:gap-6 overflow-x-auto">
              {MenuListing.map((item) => (
                <Link
                  key={item.nameKey}
                  href={getLocalizedHref(item.href)}
                  className={`whitespace-nowrap text-md font-alata font-medium transition-colors duration-300 tracking-wider ${
                    isActive(item.href)
                      ? "text-avangarda"
                      : "text-white hover:text-avangarda"
                  }`}
                >
                  {dict.nav[item.nameKey]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </Container>
  );
}
