// components/FaqSection.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// --- FAQ Data (example) ---
const faqItems = [
  {
    question: "Do I need a reservation to dine at Bistro Lumière?",
    answer: "While walk-ins are welcome, we highly recommend making a reservation, especially for dinner service and on weekends, to ensure you get a table. You can book directly using our online booking form.",
    value: "item-1",
  },
  {
    question: "What is the dress code at the restaurant?",
    answer: "Our dress code is smart casual. We encourage our guests to dress comfortably yet elegantly. Please avoid beachwear, athletic shorts, and flip-flops.",
    value: "item-2",
  },
  {
    question: "Do you accommodate dietary restrictions and allergies?",
    answer: "Absolutely. Our chefs are dedicated to providing a safe and enjoyable dining experience. Please notify us of any dietary restrictions or allergies when making your reservation or upon arrival.",
    value: "item-3",
  },
  {
    question: "Is there private dining available for events?",
    answer: "Yes, Bistro Lumière offers a private dining space perfect for corporate events, celebrations, and intimate gatherings. Please contact us directly via email or phone for capacity and menu options.",
    value: "item-4",
  },
  {
    question: "Do you offer vegetarian or vegan options?",
    answer: "We offer several dedicated vegetarian dishes and can adapt many items to be vegan upon request. Please consult your server for the day's fresh, seasonal options.",
    value: "item-5",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        
        <p className="text-sm tracking-widest uppercase text-amber-500 mb-2">
          Questions & Answers
        </p>
        <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-12">
          Frequently Asked Questions
        </h2>
        
        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full text-left">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.value} 
                value={item.value}
                // Custom styling for dark theme borders and hover states
                className="border-b border-gray-700 last:border-b-0"
              >
                <AccordionTrigger 
                  // Trigger styling for question text
                  className="text-lg font-semibold hover:text-amber-500 transition-colors py-4 text-gray-200"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent 
                  // Content styling for answer text
                  className="text-gray-400 pb-4 pr-6 leading-relaxed"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
      </div>
    </section>
  );
}