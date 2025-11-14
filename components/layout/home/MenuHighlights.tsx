// components/MenuHighlights.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const signatureDishes = [
  {
    name: "Classic Steak Frites",
    description: "Prime cut of tenderloin, house-made truffle butter, and crispy, hand-cut fries.",
    price: "35",
  },
  {
    name: "Seared Scallops Risotto",
    description: "Perfectly seared sea scallops served over creamy saffron risotto with basil oil.",
    price: "42",
  },
  {
    name: "Lumière Chocolate Lava",
    description: "Rich dark chocolate cake with a molten center, served with vanilla bean gelato.",
    price: "15",
  },
];

export function MenuHighlights() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        
        <p className="text-sm tracking-widest uppercase text-amber-500 mb-2">
          Featured
        </p>
        <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-12">
          Signature Dishes
        </h2>
        
        {/* Grid for Dish Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <Card key={index} className="bg-[#1A1A1A] border-[#333] text-white rounded-lg shadow-xl hover:shadow-amber-500/30 transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-amber-500">{dish.name}</CardTitle>
                <CardDescription className="text-lg text-gray-400 mt-2">${dish.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to Full Menu */}
        <div className="mt-12">
          <Button
            className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black text-lg px-8 py-6 uppercase tracking-widest transition-colors"
            asChild
          >
            <a href="#menu">View Full Menu</a>
          </Button>
        </div>
        
      </div>
    </section>
  );
}