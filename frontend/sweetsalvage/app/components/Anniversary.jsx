"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnniversaryModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenAnniversaryModal");

    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenAnniversaryModal", "true");
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">🎉 1-Year Anniversary Party!</h2>
          <p className="mt-4 text-gray-600">
            Join us this Saturday (03/01) to celebrate our 1-year milestone! Expect great vibes,
            live music, and a fun time! 🎉
          </p>
          <p className="mt-2 text-lg font-semibold text-indigo-600">Don't miss out!</p>
        </div>
      </div>
    </div>
    </motion.div>
    </>
  );
}
