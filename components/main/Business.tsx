"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import BackgroundLogoBottomDark from "../background-logo-bottom-dark";
import { AnimatedDecorativeBar } from "../animated-decorative-bar";

interface BusinessProps {
  lang?: string;
  dict?: any;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};

const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

const Business = ({ lang = "pl", dict }: BusinessProps) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const businessUrl = lang === "en" ? "/en/biznes" : "/pl/biznes";

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container className="relative w-full py-8 sm:py-12 md:py-16 lg:py-28 xl:py-32 overflow-visible mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
      {/* Background Image */}
      <BackgroundLogoBottomDark />

      <section className="relative z-20">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Mobile Layout - Stacked */}
          <div className="block lg:hidden">
            {/* Content Section - Mobile First */}
            <motion.div
              ref={contentRef}
              className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <AnimatedDecorativeBar />

              <motion.h2
                variants={fadeInUp}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="!text-white text-2xl sm:text-3xl md:text-4xl font-alata font-semibold uppercase tracking-wider mb-4 leading-tight"
              >
                Spotkania firmowe, Integracje & Business Spa
              </motion.h2>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-white"
                >
                  Hotel Avangarda oferuje nowoczesne sale konferencyjne idealne
                  na spotkania biznesowe, szkolenia i eventy firmowe. Zapewniamy
                  pełne zaplecze techniczne, w tym projektory, nagłośnienie i
                  szybki internet.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-white"
                >
                  Po intensywnym dniu pracy zapraszamy do naszej strefy SPA,
                  gdzie Goście mogą zrelaksować się w saunie, jacuzzi lub
                  podczas profesjonalnych masaży.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-white"
                >
                  Organizujemy również wieczory integracyjne i programy team
                  buildingowe – które sprzyjają budowaniu relacji i wspólnej
                  motywacji zespołu.
                </motion.p>
              </div>
            </motion.div>

            {/* Images Grid - Mobile/Tablet - Contained within boundaries */}
            <motion.div
              className="relative mb-8 sm:mb-12 overflow-hidden"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Mobile Layout - Stacked Images */}
              <div className="sm:hidden space-y-4 relative z-50 overflow-hidden">
                <motion.div
                  variants={fadeInScale}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full aspect-[4/3] relative"
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/conference/theater-03.jpg"
                      alt="Sala konferencyjna"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInScale}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full aspect-[4/3] relative"
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Image
                      src="/conference/cozy-01.jpg"
                      alt="Kameralna sala konferencyjna"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Tablet Layout - Side by side but contained */}
              <div className="hidden sm:block md:block relative h-[400px] sm:h-[500px] md:h-[600px] z-20 overflow-hidden">
                {/* Large Main Image - Contained within boundaries */}
                <motion.div
                  variants={fadeInLeft}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute top-0 left-0 w-[70%] sm:w-[75%] h-[60%] sm:h-[65%] z-50 overflow-hidden"
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-2xl"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/conference/theater-03.jpg"
                      alt="Sala konferencyjna"
                      fill
                      priority
                      className="object-cover transition-all duration-1000 hover:scale-110"
                      quality={100}
                      sizes="(max-width: 768px) 70vw, 75vw"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>

                {/* Secondary Image - Contained within boundaries */}
                <motion.div
                  variants={fadeInRight}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute bottom-0 right-0 w-[60%] sm:w-[65%] h-[55%] sm:h-[60%] z-50 overflow-hidden"
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-2xl"
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <Image
                      src="/conference/cozy-01.jpg"
                      alt="Kameralna sala konferencyjna"
                      fill
                      className="object-cover transition-all duration-1000 hover:scale-110"
                      sizes="(max-width: 768px) 60vw, 65vw"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Features List - Mobile/Tablet */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 overflow-x-hidden"
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                variants={slideInFromRight}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="p-3 sm:p-4 border-b-2 border-avangarda"
                whileHover={{ scale: 1.05 }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                  1 200
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80">
                  Osób na konferencji
                </div>
              </motion.div>

              <motion.div
                variants={slideInFromRight}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="p-3 sm:p-4 border-b-2 border-avangarda"
                whileHover={{ scale: 1.05 }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                  450m²
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80">
                  Powierzchnia sal
                </div>
              </motion.div>

              <motion.div
                variants={slideInFromRight}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="p-3 sm:p-4 border-b-2 border-avangarda"
                whileHover={{ scale: 1.05 }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 text-left">
                  Business Spa
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 text-left">
                  Sauna, Jacuzzi, Masaże, Basen
                </div>
              </motion.div>

              <motion.div
                variants={slideInFromRight}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-3 sm:p-4 border-b-2 border-avangarda"
                whileHover={{ scale: 1.05 }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 text-left">
                  Rozrywka
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 text-left">
                  Kajaki, Koncerty, Grillowisko
                </div>
              </motion.div>

              <motion.div
                variants={slideInFromRight}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="col-span-2 flex justify-center pt-4 sm:pt-6"
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.5 }}
              >
                <Link href={businessUrl}>
                  <Button
                    size="lg"
                    variant="fillRight"
                    className="px-6 sm:px-8 py-2 sm:py-3"
                  >
                    Dowiedz się więcej
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* Images Grid - Left Side - Breaking boundaries on large screens */}
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="relative h-[800px] xl:h-[900px] overflow-visible z-20">
                {/* Large Main Image - Extended beyond top */}
                <motion.div
                  variants={fadeInLeft}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute -top-44 xl:-top-48 left-0 w-[80%] xl:w-[85%] h-[60%] xl:h-[65%] z-50"
                  style={{ zIndex: 60 }}
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-2xl"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/conference/theater-03.jpg"
                      alt="Sala konferencyjna"
                      fill
                      priority
                      className="object-cover transition-all duration-1000 hover:scale-110"
                      quality={100}
                      sizes="(max-width: 1200px) 60vw, 50vw"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>

                {/* Secondary Image - Extended beyond bottom */}
                <motion.div
                  variants={fadeInRight}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute -bottom-44 xl:-bottom-48 right-0 w-[70%] xl:w-[75%] h-[55%] xl:h-[60%] z-50"
                  style={{ zIndex: 60 }}
                >
                  <motion.div
                    className="relative h-full w-full overflow-hidden shadow-2xl"
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <Image
                      src="/conference/cozy-01.jpg"
                      alt="Kameralna sala konferencyjna"
                      fill
                      className="object-cover transition-all duration-1000 hover:scale-110"
                      sizes="(max-width: 1200px) 45vw, 40vw"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section - Right Side */}
            <motion.div
              ref={contentRef}
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <AnimatedDecorativeBar />

              <motion.h2
                variants={fadeInUp}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="!text-white text-5xl xl:text-5xl font-alata font-semibold uppercase tracking-wider mb-6 leading-tight"
              >
                Spotkania firmowe, Integracje & Business Spa
              </motion.h2>

              <div className="space-y-6">
                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg max-w-2xl leading-relaxed text-white"
                >
                  Hotel Avangarda oferuje nowoczesne sale konferencyjne idealne
                  na spotkania biznesowe, szkolenia i eventy firmowe. Zapewniamy
                  pełne zaplecze techniczne, w tym projektory, nagłośnienie i
                  szybki internet.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg max-w-2xl leading-relaxed text-white"
                >
                  Po intensywnym dniu pracy zapraszamy do naszej strefy SPA,
                  gdzie Goście mogą zrelaksować się w saunie, jacuzzi lub
                  podczas profesjonalnych masaży.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg max-w-2xl leading-relaxed text-white"
                >
                  Organizujemy również wieczory integracyjne i programy team
                  buildingowe – które sprzyjają budowaniu relacji i wspólnej
                  motywacji zespołu.
                </motion.p>
              </div>

              {/* Features List with Slide-in from Right Animation */}
              <motion.div
                className="grid grid-cols-2 gap-6 pt-6 overflow-x-hidden"
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div
                  variants={slideInFromRight}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="p-4 border-b-2 border-avangarda"
                  whileHover={{ scale: 1.05 }}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    1 200
                  </div>
                  <div className="text-base text-white/80">
                    Osób na konferencji
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInFromRight}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="p-4 border-b-2 border-avangarda"
                  whileHover={{ scale: 1.05 }}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    450m²
                  </div>
                  <div className="text-base text-white/80">
                    Powierzchnia sal
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInFromRight}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="p-4 border-b-2 border-avangarda"
                  whileHover={{ scale: 1.05 }}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 text-left">
                    Business Spa
                  </div>
                  <div className="text-base text-white/80 text-left">
                    Sauna, Jacuzzi, Masaże, Basen
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInFromRight}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="p-4 border-b-2 border-avangarda"
                  whileHover={{ scale: 1.05 }}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 text-left">
                    Rozrywka
                  </div>
                  <div className="text-base text-white/80 text-left">
                    Kajaki, Koncerty, Grillowisko
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInFromRight}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="col-span-2 flex justify-start pt-4"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Link href={businessUrl}>
                    <Button size="lg" variant="fillRight">
                      Dowiedz się więcej
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Business;
