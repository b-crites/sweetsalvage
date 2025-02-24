'use client'

import React, { useState, useEffect } from "react";

function BeforeAfterSlider({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full ">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-28 -bottom-10 lg:bottom-0 lg:top-0 lg:left-4 text-2xl text-black"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-28 -bottom-10 lg:bottom-0 lg:top-0 lg:right-4 text-2xl text-black"
      >
        &gt;
      </button>

      {/* Image Container */}
      <div className="w-11/12 lg:w-3/5 h-96 bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={posts[currentIndex].img}
          alt={posts[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dots for Pagination */}
      <div className="flex space-x-2 mt-4">
        {posts.map((_, index) => (
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
