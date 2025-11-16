import { FaqSection } from "@/components/layout/home/FaqSection";
import { GallerySection } from "@/components/layout/home/GallerySection";
import Hero from "@/components/layout/home/HeroSection";


import { TestimonialsSection } from "@/components/layout/home/TestimonialsSection";



export default function Home() {
  return (
    <div>
      <Hero />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
}
