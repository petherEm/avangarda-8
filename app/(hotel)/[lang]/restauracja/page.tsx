import AnimateOnScroll from "@/components/animate-on-scroll";
import ClubCoola from "@/components/modules/Entertainment/ClubCoola";
import GastroClub from "@/components/modules/Gastro/GastroClub";
import GastroCTA from "@/components/modules/Gastro/GastroCTA";
import GastroFort from "@/components/modules/Gastro/GastroFort";
import GastroHero from "@/components/modules/Gastro/GastroHero";
import GastroIntro from "@/components/modules/Gastro/GastroIntro";
import GastroPort from "@/components/modules/Gastro/GastroPort";
import GastroPort2 from "@/components/modules/Gastro/GastroPort2";
import GastroRest from "@/components/modules/Gastro/GastroRest";
import { getDictionary } from "@/lib/dictionary";

export default async function GastroMainPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "pl");

  return (
    <>
      <GastroHero />

      <GastroIntro dict={dict} lang={lang} />

      <GastroRest dict={dict} lang={lang} />

      <GastroClub dict={dict} lang={lang} />

      <GastroPort2 dict={dict} lang={lang} />
    </>
  );
}
