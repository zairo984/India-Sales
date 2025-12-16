"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/india_sales_01.jpg",
  "/india_sales_02.jpg",
  "/india_sales_03.jpg",
  "/india_sales_04.jpg",
  "/india_sales_05.jpg",
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [windowHeight, setWindowHeight] = useState(768);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/60" />

      {/* Perspective Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        <div className="relative flex items-center justify-center w-full max-w-7xl">
          {images.map((src, index) => {
            const position =
              (((index - activeIndex) % images.length) + images.length) %
              images.length;
            const adjustedPosition =
              position > images.length / 2
                ? position - images.length
                : position;
            const isActive = index === activeIndex;
            const absPosition = Math.abs(adjustedPosition);

            return (
              <motion.div
                key={`image-${index}`}
                className="absolute transition-all duration-700 ease-out"
                animate={{
                  x: adjustedPosition * (windowWidth < 768 ? 250 : 400),
                  y: absPosition * (windowWidth < 768 ? 15 : 25),
                  scale: isActive ? 1.2 : 0.85 - absPosition * 0.08,
                  zIndex: isActive ? 50 : 50 - absPosition,
                  filter: isActive
                    ? "brightness(100%) saturate(110%)"
                    : `brightness(${45 - absPosition * 8}%) saturate(70%)`,
                  rotateY: adjustedPosition * -15,
                  rotateX: absPosition * 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  mass: 1,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x > 50 || velocity.x > 500) {
                    handlePrevious();
                  } else if (offset.x < -50 || velocity.x < -500) {
                    handleNext();
                  }
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    boxShadow: isActive
                      ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 100px -20px rgba(255, 255, 255, 0.15)"
                      : "0 15px 40px -10px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {/* Glass Reflection Effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none z-10" />
                  )}

                  {/* Subtle White Glow for Active Image */}
                  {isActive && (
                    <div className="absolute -inset-1 bg-white/10 rounded-2xl blur-xl" />
                  )}

                  <Image
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    width={700}
                    height={450}
                    priority={isActive}
                    className="object-contain sm:object-cover transition-all rounded-2xl 
                     w-[90vw] h-[60vh] 
                     sm:w-[500px] sm:h-[350px] 
                     md:w-[600px] md:h-[400px] 
                     lg:w-[700px] lg:h-[400px] 
                     xl:w-[700px] xl:h-[400px] 
                     max-w-full aspect-[4/3]"
                  />

                  {/* Border Highlight for Active Image */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-white/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 
          bg-black/50 hover:bg-black/70 backdrop-blur-md 
          text-white rounded-full h-10 w-10 sm:h-14 sm:w-14 z-50 
          border border-white/10 transition-all duration-300
          hover:scale-110 active:scale-95
          shadow-lg hover:shadow-2xl"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 
          bg-black/50 hover:bg-black/70 backdrop-blur-md 
          text-white rounded-full h-10 w-10 sm:h-14 sm:w-14 z-50 
          border border-white/10 transition-all duration-300
          hover:scale-110 active:scale-95
          shadow-lg hover:shadow-2xl"
        onClick={handleNext}
      >
        <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-36 sm:bottom-32 lg:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveIndex(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            }}
            className="group relative"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Enhanced CTA Button */}
      <Button
        variant="secondary"
        className="absolute bottom-28 sm:bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 
          py-4 px-8 sm:py-5 sm:px-10 rounded-full 
          text-base sm:text-lg font-semibold 
          bg-white text-black hover:bg-gray-100 
          transition-all duration-300 z-50
          shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
          hover:scale-105 active:scale-95
          border border-white/10"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.href = "/products";
          }
        }}
      >
        Explore Products <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Floating Particles Effect (Optional) - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              animate={{
                x: [Math.random() * windowWidth, Math.random() * windowWidth],
                y: [
                  Math.random() * windowHeight,
                  Math.random() * windowHeight,
                ],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
