"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EntertainmentProps {
  lang?: string;
  dict?: any;
}

const images = [
  { src: "/fort/fort-02.jpg", alt: "Entertainment 11" },
  { src: "/entertainment/13.JPG", alt: "Entertainment 13" },
  { src: "/entertainment/6.jpg", alt: "Entertainment 6" },
  { src: "/spa/pool-kids.jpg", alt: "Entertainment 12" },
  { src: "/entertainment/8.jpeg", alt: "Entertainment 8" },
  { src: "/entertainment/9.jpeg", alt: "Entertainment 9" },
  { src: "/entertainment/10.jpeg", alt: "Entertainment 10" },
];

// Duplicate the array for a seamless loop
const duplicatedImages = [...images, ...images];

const Entertainment = ({ lang = "pl", dict }: EntertainmentProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Determine the entertainment URL based on language
  const entertainmentUrl = lang === "en" ? "/en/rozrywka" : "/pl/rozrywka";

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return (
    <section className="w-full text-primary py-8 md:py-12 overflow-hidden">
      <div className=" w-full py-8 md:py-12">
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 space-y-6 py-16">
          <h1 className="uppercase text-4xl md:text-5xl text-center font-semibold tracking-wider text-avangarda">
            ZAREZERWUJ JUŻ DZIŚ!
          </h1>

          <div className="flex flex-col md:flex-row items-center text-center md:items-center justify-center gap-4 md:gap-8">
            <p className="text-black text-base md:text-lg leading-relaxed md:w-2/3">
              Odkryj szeroką gamę atrakcji i aktywności, które sprawią, że Twój
              pobyt będzie pełen niezapomnianych wrażeń. W Avangarda każdy
              znajdzie coś dla siebie.
            </p>
          </div>
        </div>

        {/* Full-width Slider Container */}
        <div className="relative w-full">
          {/* First Row - Right to Left */}
          <div className="relative w-[100vw] overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-6"
              style={{ width: "fit-content" }}
              initial={{ x: "0%" }}
              animate={
                shouldAnimate
                  ? {
                      x: ["0%", "-50%"],
                    }
                  : {}
              }
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`row1-${index}`}
                  className="relative w-[280px] md:w-[300px] lg:w-[320px] aspect-square flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          {" "}
          <Button size="lg" className="w-fit" variant="fillRight">
            {/* {dict.nav.book} */}
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            ZAREZERWUJ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Entertainment;
