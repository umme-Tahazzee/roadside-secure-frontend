
import Hero from "@/components/module/home/Hero";

import HowItWorks from "@/components/module/home/HowItWorks";

import FAQ from "@/components/module/home/FAQ";
import CTA from "@/components/module/home/CTA";
import WhyChooseUs from "@/components/module/home/Services";
import OurServices from "@/components/module/home/ForMechanics";


export default function HomePage() {
  return (
      <main className="">
       <Hero/>
       <HowItWorks/>
       <WhyChooseUs/>
       <OurServices/>
       <FAQ/>
           
      </main> 
  );
}