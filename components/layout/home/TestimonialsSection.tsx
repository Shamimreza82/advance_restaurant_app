// components/TestimonialsSection.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react"; // Importing an icon for a quote mark

// --- Testimonial Data (example) ---
const testimonials = [
  {
    name: "Eleanor Vance",
    title: "Food Critic",
    quote: "Bistro Lumière offers an unparalleled dining experience. The Coq au Vin was a masterpiece, and the ambiance transported me straight to Paris. A true culinary gem!",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    title: "Regular Customer",
    quote: "Every visit to Lumière is a delight. The staff are incredibly attentive, and the Filet Mignon is consistently perfect. My go-to place for special occasions.",
    rating: 5,
  },
  {
    name: "Sophia Chen",
    title: "First-time Visitor",
    quote: "Absolutely blown away by the quality and presentation. The Salmon Tartare was incredibly fresh, and the wine pairing recommendations were spot on. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    title: "Local Foodie",
    quote: "Finally, a restaurant that truly understands fine dining. The attention to detail in every dish and the elegant, intimate atmosphere make it stand out.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 text-center">
        
        <p className="text-sm tracking-widest uppercase text-amber-500 mb-2">
          What Our Guests Say
        </p>
        <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-12">
          Customer Testimonials
        </h2>
        
        {/* Grid for Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-[#1A1A1A] border border-[#333] text-white rounded-lg shadow-xl hover:shadow-amber-500/30 transition-shadow flex flex-col justify-between">
              <CardHeader className="pb-4">
                <Quote className="w-8 h-8 text-amber-500 mb-4 mx-auto" /> {/* Quote icon */}
                <CardTitle className="text-xl font-semibold leading-relaxed text-gray-200 font-serif italic">
                  &quot;{testimonial.quote}&quot;
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 border-t border-gray-700 mt-auto">
                <p className="text-lg font-bold text-amber-500">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
                {/* Optional: Star Rating can be added here */}
                {/* <div className="flex justify-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
}