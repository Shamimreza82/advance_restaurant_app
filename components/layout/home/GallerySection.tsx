// components/GallerySection.tsx

"use client"; // If using in an App Router page directly, Dialog needs client component

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

const galleryImages = [
  { src: "/gallary/gallary-1.avif", alt: "Restaurant interior with warm lighting" },
  { src: "/gallary/gallary-2.avif", alt: "A chef meticulously plating a dish" },
  { src: "/gallary/gallary-3.avif", alt: "An exquisite dessert presentation" },
  { src: "/gallary/gallary-4.avif", alt: "Fine dining table setting" },
  { src: "/gallary/gallary-5.avif", alt: "Wine cellar with a selection of bottles" },
  { src: "/gallary/gallary-6.avif", alt: "Outdoor seating area with evening ambiance" },
];

export function GallerySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const openDialog = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm tracking-widest uppercase text-amber-500 mb-2">
          Ambiance & Creations
        </p>
        <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-12">
          Our Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer group shadow-lg hover:shadow-amber-500/40 transition-shadow"
              onClick={() => openDialog(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg font-semibold">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[800px] p-0 border-none bg-transparent">
          {selectedImage && (
            <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg max-h-full max-w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}