


// biome-ignore assist/source/organizeImports: <explanation>
import Hero from "@/components/module/home/Hero";
import WhyChooseUs from "@/components/module/home/Services";
import OurServices from "@/components/module/home/ForMechanics";
import FAQ from "@/components/module/home/FAQ";
import HowItWorks from "@/components/module/home/HowItWorks";


export default function HomePage() {
  return (
      <main className=" ">
       <Hero/>
       <HowItWorks/>
       <WhyChooseUs/>
       <OurServices/>
       <FAQ/>
           
      </main> 
  );
}