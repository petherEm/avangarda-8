import About from "@/components/main/About";
import Business from "@/components/main/Business";

import Entertainment from "@/components/main/Entertainment";
import Hero from "@/components/modules/Hero/Hero";
import Offers from "@/components/main/Offers";
import Restaurant from "@/components/main/Restaurant";

import Spa from "@/components/main/Spa";
import Weddings from "@/components/main/Weddings";
import { getDictionary } from "@/lib/dictionary";
import { getAllOffers } from "@/sanity/lib/offers/getOffers";
import AnimateOnScroll from "@/components/animate-on-scroll";
import Rooms from "@/components/main/Rooms";
import CTAgeneric from "@/components/main/CTAgeneric";
import RestaurantNew from "@/components/main/RestaurantNew";
import TrustedCompanies from "@/components/modules/Business/TrustedCompanies";
import TrustedCompaniesMain from "@/components/main/TrustedCompaniesMain";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "pl");
  const offers = await getAllOffers();
  return (
    <>
      {/* Example content to enable scrolling */}
      <Hero />

      <AnimateOnScroll>
        <Offers dict={dict} offers={offers} lang={lang} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Business lang={lang} dict={dict} />
      </AnimateOnScroll>
      <TrustedCompaniesMain dict={dict} lang={lang} />
      <AnimateOnScroll>
        <Weddings dict={dict} lang={lang} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <RestaurantNew dict={dict} lang={lang} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Spa dict={dict} lang={lang} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTAgeneric dict={dict} lang={lang} />
      </AnimateOnScroll>
    </>
  );
}
