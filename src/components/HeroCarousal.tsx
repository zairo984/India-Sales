"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/pexels-krisof-2674905.jpg",
  "/rider.jpg",
  "/main_horse.jpg",
]

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full max-w-7xl">
          {images.map((src, index) => {
            const position = (((index - activeIndex) % images.length) + images.length) % images.length
            let adjustedPosition = position > images.length / 2 ? position - images.length : position
            const isActive = index === activeIndex

            return (
              <motion.div
                key={`image-${index}`}
                className="absolute transition-all duration-700"
                animate={{
                  x: adjustedPosition * 400, // More spread-out effect
                  scale: isActive ? 1.2 : 0.85, // Slightly larger for emphasis
                  zIndex: isActive ? 10 : 10 - Math.abs(adjustedPosition),
                  filter: isActive ? "brightness(100%)" : "brightness(40%)",
                  rotateY: adjustedPosition * -12, // More natural 3D effect
                  opacity: isActive ? 1 : 0.5, // Fade inactive images slightly
                }}
                transition={{
                  duration: 1, 
                  ease: "easeInOut",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    width={800} // Larger images
                    height={600}
                    priority={isActive}
                    className="object-cover transition-all rounded-2xl"
                    style={{
                      width: isActive ? "800px" : "650px",
                      height: isActive ? "600px" : "500px",
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-14 w-14 z-20"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-7 w-7" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-14 w-14 z-20"
        onClick={handleNext}
      >
        <ChevronRight className="h-7 w-7" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Navigation Dots */}
      {/* <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-150" : "bg-white/50"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* CTA Button */}
      <Button
        variant="secondary"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 py-5 px-10 rounded-full text-lg font-semibold shadow-xl bg-white text-black hover:bg-gray-200 transition z-20"
        onClick={() => (window.location.href = "/products")}
      >
        Explore Products <ShoppingBag className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
