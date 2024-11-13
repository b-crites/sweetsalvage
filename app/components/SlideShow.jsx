'use client'

import React, { useState, useEffect } from "react";

const imagePairs = [
  { before: "/Img/Before1.webp", after: "/Img/After1.webp" },
  { before: "/Img/Before2.webp", after: "/Img/After2.webp" },
  // Add more pairs as needed
];

function BeforeAfterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagePairs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagePairs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-96">
      {/* Navigation Buttons */}
      
      <button
        onClick={handlePrevious}
        className="absolute left-28 bottom-7 lg:bottom-0 lg:top-0 lg:left-4 text-2xl text-black"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-28 bottom-7 lg:bottom-0 lg:top-0 lg:right-4 text-2xl text-black"
      >
        &gt;
      </button>
      

      {/* Image Container */}
      <div className="flex w-11/12 lg:w-3/5 h-72 bg-gray-300 rounded-lg overflow-hidden">
        <div className="w-1/2">
          <img
            src={imagePairs[currentIndex].before}
            alt="Before"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 border-l-2 border-black">
          <img
            src={imagePairs[currentIndex].after}
            alt="After"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Dots for Pagination */}
      <div className="flex space-x-2 mt-4">
        {imagePairs.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
