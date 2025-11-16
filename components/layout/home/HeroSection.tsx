/* eslint-disable react-hooks/purity */
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Animated Spotlights */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[160px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-700/10 blur-[180px]" />
      </div>


      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              // eslint-disable-next-line react-hooks/purity
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-4 max-w-4xl"
      >

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Discover the Art of<br />
          <span className="text-orange-500">Exquisite Cuisine</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-gray-300 text-lg md:text-xl"
        >
          A masterful blend of flavors, ambiance, and unforgettable luxury dining.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <Link
            href={"/book-a-table"}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-4 text-lg rounded-xl shadow-lg shadow-orange-600/30"
          >
            Book a Table
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white px-8 py-6 text-lg rounded-xl backdrop-blur-xl hover:bg-white/10"
          >
            Explore Menu
          </Button>
        </motion.div>
      </motion.div>
      <FloatingWhatsApp phoneNumber="+8801531297879"/>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
