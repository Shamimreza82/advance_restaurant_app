import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Star, Utensils } from 'lucide-react';
import Image from 'next/image';

// NOTE: This assumes you have the shadcn/ui components (Separator, Card, etc.) installed 
// and configured in your Next.js project.

// Component for the "About Us" section
const AboutSection = () => {
  const primaryColor = 'text-amber-500'; // Using amber to match the warm button/text color
  const bgColor = 'bg-black text-white';

  return (
    <div className={`py-20 md:py-32 ${bgColor} font-inter`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header and Subtitle */}
        <div className="text-center mb-16">
          <p className={`text-sm tracking-widest uppercase ${primaryColor}`}>Our Story</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
            The Heart of Bistro Lumière
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image/Visual Placeholder */}
          <div className="relative h-96 lg:h-full rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-1.jpg"
              alt="Bistro Lumière Chef"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            //   onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/171717/ffffff?text=Placeholder+Image"; }}
              width={800}
              height={600}
            />
            {/* Accent Border for Visual Pop */}
            <div className={`absolute inset-0 border-4 border-amber-500/50 rounded-xl pointer-events-none`}></div>
          </div>

          {/* Right Column: Text and Features */}
          <div className="flex flex-col space-y-8">
            <h3 className="text-3xl font-bold text-gray-100">
              A Legacy of Taste, Crafted with Passion.
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-lg">
              Bistro Lumière was founded on the simple philosophy that great food should be enjoyed in great company. For over two decades, we have blended traditional French techniques with fresh, local ingredients, creating an unforgettable dining experience in the heart of the city.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg">
              Our commitment to excellence extends beyond the kitchen its in the ambiance, the service, and every plate we serve. We believe every meal is a celebration.
            </p>

            <Separator className="bg-gray-700 my-4" />

            {/* Key Features/Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature 1: Quality */}
              <Card className="bg-neutral-900 border-neutral-800 hover:border-amber-500 transition-all">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Star className={`h-6 w-6 ${primaryColor}`} />
                  <CardTitle className="ml-3 text-lg font-semibold text-white">Five-Star Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    We source 100% of our produce from local, sustainable farms for guaranteed freshness.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2: Service */}
              <Card className="bg-neutral-900 border-neutral-800 hover:border-amber-500 transition-all">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Utensils className={`h-6 w-6 ${primaryColor}`} />
                  <CardTitle className="ml-3 text-lg font-semibold text-white">Artisan Craftsmanship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Our team of award-winning chefs meticulously prepares every dish by hand.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action Link */}
            <a 
              href="/menu" 
              className={`inline-flex items-center text-lg font-medium ${primaryColor} hover:text-amber-400 transition-colors pt-4`}
            >
              Explore Our Full Menu 
              <MoveRight className="w-5 h-5 ml-2" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;