'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle body overflow based on menu state
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  

  return (
    <nav className="bg-gray-950 w-full py-6">
      <div className="flex justify-between items-center px-5 md:px-10">
        {/* Logo */}
        <h2 className="font-serif text-3xl text-white">
          <button onClick={() => setIsMenuOpen(false)}>SWEET SALVAGE</button>
        </h2>

        {/* Desktop Links */}
        <ul className="hidden md:flex text-white font-serif text-lg space-x-6">
          <li>
            <Link href="/about-us"><button>About</button></Link>
          </li>
          <li><button>Events</button></li>
          <li><button>Menus</button></li>
          <li><button>Contact Us</button></li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 bg-gray-950 bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-white text-2xl font-serif transform transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleMenuToggle}
          className="absolute top-5 right-5 text-3xl focus:outline-none"
        >
          &times;
        </button>

        {/* Mobile Menu Links */}
        <ul className="space-y-8 text-center">
          <li onClick={handleMenuToggle}>
            <Link href="/about-us"><button>About</button></Link>
          </li>
          <li onClick={handleMenuToggle}><button>Events</button></li>
          <li onClick={handleMenuToggle}><button>Menus</button></li>
          <li onClick={handleMenuToggle}><button>Contact Us</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
