import BespokeHero from "@/components/bespoke/BespokeHero";
import BespokeIntro from "@/components/bespoke/BespokeIntro";
import BespokeQuoteForm from "@/components/bespoke/BespokeQuoteForm";
import WhyXteamwear from "@/components/bespoke/WhyXteamwear";
import StatsSection from "@/components/bespoke/StatsSection";
import CustomizationGrid from "@/components/bespoke/CustomizationGrid";
import HowItWorks from "@/components/bespoke/HowItWorks";
import MoreCollections from "@/components/bespoke/MoreCollections";

export default function BespokePage() {
  return (
    <div>
      <BespokeHero />
      <BespokeIntro />
      <BespokeQuoteForm />
      <WhyXteamwear />
      <StatsSection />
      <CustomizationGrid />
      <HowItWorks />
      <MoreCollections />
    </div>
  );
}