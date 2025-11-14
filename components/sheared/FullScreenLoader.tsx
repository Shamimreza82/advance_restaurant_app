"use client";

import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FullScreenLoaderProps {
  show: boolean;
}

export function FullScreenLoader({ show }: FullScreenLoaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center text-white"
          >
            <Loader2 className="h-10 w-10 animate-spin text-white" />
            <p className="mt-3 text-sm text-gray-200">Please wait...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
