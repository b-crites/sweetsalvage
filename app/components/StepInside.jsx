"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    img: "/Img/IMG_9582.jpeg",
    alt: "Covered patio with string lights and seating",
    caption: "The Patio",
  },
  {
    img: "/Img/A91310D1-5902-431A-99F4-5B3D3115526B.jpeg",
    alt: "Indoor dining area with rustic decor and string lights",
    caption: "Dining Area",
  },
  {
    img: "/Img/IMG_9586.webp",
    alt: "Glass barn doors opening into the market",
    caption: "The Market",
  },
  {
    img: "/Img/IMG_9479.webp",
    alt: "Live music performance with audience",
    caption: "Live Music Nights",
  },
];

export default function StepInside() {
  return (
    <section className="py-16 px-5 md:px-10">
      <motion.div
        initial={{ opacity: 0, x: "-20px" }}
        whileInView={{ opacity: 1, x: "0px" }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="greatFont text-5xl md:text-6xl text-center pb-2">
          Step Inside
        </h2>
        <p className="text-center text-gray-600 mb-10">
          A look inside our newly opened indoor space
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-xl group"
            >
              <Image
                src={photo.img}
                alt={photo.alt}
                width={800}
                height={600}
                quality={100}
                loading="lazy"
                className="w-full h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <p className="text-white text-lg font-bold px-4 pb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
