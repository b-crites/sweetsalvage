"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SpringMarketModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('spring_market_dismissed');
    if (dismissed === 'true') return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem('spring_market_dismissed', 'true');
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900 bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Stacked layout - image on top */}
              <div>
                {/* Image */}
                <Image
                  src="/Img/Spring-Market.jpg"
                  alt="Spring Market"
                  width={600}
                  height={750}
                  className="w-full h-auto"
                  priority
                />

                {/* Content below image */}
                <div className="p-6  text-center">
                  <h2 className="text-3xl font-bold text-green-700 mb-2 font-serif">
                    Spring Mother's Day Market
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Join us May 8-10 for our 11th annual market! Browse unique handmade goods,
                    enjoy delicious treats, and find the perfect gift for Mom.
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href="/vendor-request"
                      className="text-sm text-gray-500 hover:text-green-700 underline transition-colors"
                    >
                      Interested in being a vendor?
                    </Link>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dontShow}
                        onChange={(e) => setDontShow(e.target.checked)}
                        className="accent-green-600"
                      />
                      <span className="text-xs text-gray-400">Don't show again</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
