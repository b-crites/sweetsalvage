"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

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
          <Link href="/">
            <button onClick={() => setIsMenuOpen(false)}>SWEET SALVAGE</button>
          </Link>
        </h2>

        {/* Desktop Links */}
        <ul className="hidden md:flex text-white font-serif text-lg space-x-6">
          <li className="relative group">
            <button className="focus:outline-none">Pavillion</button>
            <div className="absolute left-0 z-50 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden transition-all duration-300 max-h-0 opacity-0 transform scale-y-75 group-hover:max-h-96 group-hover:opacity-100 group-hover:scale-y-100">
              <Link href="/bands"><button className="block px-4 py-2 text-sm hover:text-white hover:bg-gray-700 w-full text-left">Bands</button></Link>
              <Link href="/events"><button className="block px-4 py-2 text-sm hover:text-white hover:bg-gray-700 w-full text-left">Events</button></Link>
              <Link href="/#food-trucks"> <button onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm hover:text-white hover:bg-gray-700 w-full text-left">Menus</button></Link>
            </div>
          </li>
         
          <li>
            <Link href="/about-us"><button>About</button></Link>
          </li>
          
          {/* Dropdown Menu with Slide Effect */}
          
          <li>
            <Link href="/contact"><button>Contact Us</button></Link>
          </li>
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
          <li onClick={handleMenuToggle}>
            <Link href="/bands"><button>Bands</button></Link>
          </li>
          <li onClick={handleMenuToggle}>
            <Link href="/events"><button>Events</button></Link>
          </li>
          <li onClick={handleMenuToggle}>
          <Link href="/#food-trucks">
              <button>Menu</button>
            </Link>
          </li>
          <li onClick={handleMenuToggle}>
            <Link href="/contact"><button>Contact Us</button></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
