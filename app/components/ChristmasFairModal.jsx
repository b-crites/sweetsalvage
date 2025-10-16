"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function ChristmasFairModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasRSVPed, setHasRSVPed] = useState(false);

  useEffect(() => {
    // Check if user has already RSVP'd
    const rsvpStatus = localStorage.getItem('christmas_fair_rsvp');
    if (rsvpStatus === 'true') {
      setHasRSVPed(true);
    }

    // Show modal after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Insert the email into Supabase using the email_list table
      const { data, error: supabaseError } = await supabase
        .from('email_list')
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase()
          }
        ])
        .select();

      if (supabaseError) {
        // Handle duplicate email error
        if (supabaseError.code === '23505') {
          setError('This email is already registered for the Christmas Fair!');
        } else {
          setError(supabaseError.message || 'Failed to submit RSVP. Please try again.');
        }
        return;
      }

      console.log('RSVP submitted successfully:', data);

      // Store RSVP status in localStorage
      localStorage.setItem('christmas_fair_rsvp', 'true');
      setHasRSVPed(true);

      // Show success message
      setSubmitted(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
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
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative"
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

              {/* Two-column layout */}
              <div className="grid md:grid-cols-2">
                {/* Left side - Image */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/Img/Christmas_Img.jpg"
                    alt="Christmas Fair"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-green-900/30"></div>
                </div>

                {/* Right side - Content */}
                <div className="p-8 flex flex-col justify-center">
                  {hasRSVPed && !submitted ? (
                    // Reminder version for users who already RSVP'd
                    <div className="text-center">
                      <div className="mb-4">
                        <svg
                          className="mx-auto h-20 w-20 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-red-600 mb-2 font-serif">
                        Christmas Fair Reminder
                      </h2>
                      <p className="text-2xl text-green-700 mb-4 font-semibold">
                        December 5-7
                      </p>
                      <p className="text-gray-700 mb-4">
                        We're excited to see you at our Christmas Fair!
                      </p>
                      <p className="text-gray-600 mb-6 text-sm">
                        Thanks for RSVPing. Don't forget to join us for magical moments,
                        unique gifts, and festive treats!
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all active:scale-95 duration-75 shadow-lg"
                      >
                        Got It!
                      </button>
                    </div>
                  ) : !submitted ? (
                    <>
                      <h2 className="text-4xl font-bold text-red-600 mb-2 text-center font-serif">
                        Christmas Fair
                      </h2>
                      <p className="text-2xl text-green-700 mb-4 text-center font-semibold">
                        December 5-7
                      </p>
                      <p className="text-gray-700 mb-6 text-center">
                        Join us for our magical Christmas Fair! Discover unique gifts,
                        enjoy festive treats, and celebrate the holiday season with us.
                        Don't miss this special event!
                      </p>

                      {/* RSVP Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                          </div>
                        )}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="your@email.com"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all active:scale-95 duration-75 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                        >
                          {loading ? 'Submitting...' : 'RSVP Now'}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <svg
                          className="mx-auto h-16 w-16 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600">
                        We've received your RSVP for the Christmas Fair. See you there!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
