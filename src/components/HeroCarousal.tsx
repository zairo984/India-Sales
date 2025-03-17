"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/web1.jpg", "/web2.jpg", "/web5.jpg", "/web4.jpg", "/web6.jpg"];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full max-w-7xl">
          {images.map((src, index) => {
            const position = (((index - activeIndex) % images.length) + images.length) % images.length;
            const adjustedPosition = position > images.length / 2 ? position - images.length : position;
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={`image-${index}`}
                className="absolute transition-all duration-700"
                animate={{
                  x: adjustedPosition * (window.innerWidth < 768 ? 250 : 400), // Responsive spacing
                  scale: isActive ? 1.2 : 0.85,
                  zIndex: isActive ? 10 : 10 - Math.abs(adjustedPosition),
                  filter: isActive ? "brightness(100%)" : "brightness(40%)",
                  rotateY: adjustedPosition * -12,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ ease: "easeIn" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (offset.x > 50) {
                    handlePrevious();
                  } else if (offset.x < -50) {
                    handleNext();
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    width={800}
                    height={600}
                    priority={isActive}
                    className="object-cover transition-all rounded-2xl w-full sm:w-[650px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[600px]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 sm:h-14 sm:w-14 z-20"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 sm:h-14 sm:w-14 z-20"
        onClick={handleNext}
      >
        <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
      </Button>

      {/* CTA Button */}
      <Button
        variant="secondary"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 py-4 px-8 sm:py-5 sm:px-10 rounded-full text-base sm:text-lg font-semibold shadow-xl bg-white text-black hover:bg-gray-200 transition z-20"
        onClick={() => (window.location.href = "/products")}
      >
        Explore Products <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}
