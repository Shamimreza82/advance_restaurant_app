// components/FloatingWhatsApp.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

export default function FloatingWhatsApp({ phoneNumber }: FloatingWhatsAppProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 2 }}
            whileHover={{ scale: 1.15 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              variant="default"
              className="rounded-full p-4 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-2xl shadow-green-600/50 backdrop-blur-sm transition-transform duration-300"
            >
              <FaWhatsapp size={35} />
            </Button>
          </motion.a>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 text-white border border-slate-700">
          <p>Chat with us on WhatsApp!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
