
import Hero from "@/components/module/home/Hero";
import Services from "@/components/module/home/Services";
import HowItWorks from "@/components/module/home/HowItWorks";
import ForMechanics from "@/components/module/home/ForMechanics";
import FAQ from "@/components/module/home/FAQ";
import CTA from "@/components/module/home/CTA";


export default function HomePage() {
  return (
      <main>
       <Hero/>
       <Services/>
       <HowItWorks/>
       <ForMechanics/>
       <FAQ/>
       <CTA/>     
      </main> 
  );
}