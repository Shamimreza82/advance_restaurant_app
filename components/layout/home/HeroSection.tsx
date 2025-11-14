// components/HeroSection.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";

// Placeholder for your main hero image
// You should place an image file (e.g., 'hero-bistro.jpg') in your public directory
const HERO_IMAGE_PATH = "/hero-bistro.jpg";

export function HeroSection() {
  return (
    // 1. Main container with dark background (bg-black)
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-black text-white">
      
      {/* 2. Background Image with subtle dark overlay */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_PATH}
          alt="Elegant restaurant interior"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-50" // Adjust opacity for the dark theme feel
        />
        {/* Extra dark overlay to match the deep black theme */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 3. Central Content (z-10 to stack above the image) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Title/Branding */}
        <p className="text-sm tracking-widest uppercase text-amber-500 mb-2 font-serif">
          Experience Fine Dining
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 max-w-4xl leading-tight font-serif italic">
          Bistro Lumière
        </h1>

        {/* Subtitle/Slogan */}
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
          Where exquisite flavors meet an unforgettable ambiance.
        </p>

        {/* Call to Action Button (matching the 'BOOK A TABLE' orange/red) */}
        <Button
          className="bg-[#D97706] hover:bg-[#B45309] text-white text-lg px-8 py-6 rounded-none uppercase tracking-widest font-bold transition-colors shadow-lg"
          asChild
        >
          <a href="#booking">Book A Table Now</a>
        </Button>
      </div>

      {/* Optional: Scroll Indicator (Triangle down arrow) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
}