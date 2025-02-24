import "./globals.css";
import localFont from "next/font/local";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Great_Vibes } from 'next/font/google';

const greatFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: "Sweet Market On Main And Pavilion",
  description: "Welcome to Sweet Salvage – your go-to spot for cool, vintage vibes and good times! Our food truck pavilion has all the tasty eats, and we’ve got live music to keep things lively! ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body   className={`antialiased ${'greatFont.className'} `}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
