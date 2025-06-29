"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Download, Phone } from "lucide-react";

import { AnimatedDecorativeBar } from "@/components/animated-decorative-bar";

// Helper function to get nested dictionary values using dot notation
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

interface BusinessIntroProps {
  dict: any;
  lang: string;
}

export default function BusinessIntro({ dict, lang }: BusinessIntroProps) {
  const phoneNumber = "+48 574 383 282";

  const t = (key: string) => getNestedValue(dict, key) || key;

  return (
    <Container className="mt-6 sm:mt-6 md:mt-4 lg:mt-0 mb-6 lg:mb-0 bg-white w-full text-primary lg:py-20">
      <div className="max-w-7xl mx-auto sm:px-4">
        {/* Introduction Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <AnimatedDecorativeBar />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl max-w-2xl font-alata md:text-5xl font-semibold uppercase tracking-wider mb-6"
            >
              {t("business.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed"
            >
              {t("business.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="flex items-center gap-2"
              >
                <Button size="lg" className="w-fit" variant="fillRight">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  DOWIEDZ SIĘ WIĘCEJ
                </Button>
              </Link>
              <Link
                href="/business/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Button variant="avangarda" size="lg">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  POBIERZ OFERTĘ
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video w-full overflow-hidden"
          >
            <Image
              src="/conference/theater-03.jpg"
              alt={t("business.title")}
              fill
              className="object-contain object-center"
            />
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
