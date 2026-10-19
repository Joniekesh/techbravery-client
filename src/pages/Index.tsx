import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import ProductEngineeringSection from "@/components/home/ProductEngineeringSection";
import HowWeWork from "@/components/home/HowWeWork";
import WhyTechbravery from "@/components/home/WhyTechbravery";
import Hero from "@/components/home/Hero";
import PlatformsPreview from "@/components/home/PlatformsPreview";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="TechBravery | Custom Industry Grade Software Development"
        description="TechBravery builds custom web and mobile apps, SaaS platforms, and AI-powered software for businesses in Africa and beyond."
        url="/"
        image="/og-image.png"
      />
      <div className="min-h-screen">
        {/* <TechBraveryHero /> */}
        <Hero />
        <ProductEngineeringSection />
        <HowWeWork />
        <WhyTechbravery />
        <Services />
        <PlatformsPreview />
        <Testimonials />
      </div>
    </>
  );
};

export default Index;
