"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import moment from 'moment';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BeforeAfterSlider from './components/SlideShow';
const greatFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
import { Great_Vibes } from 'next/font/google';
import AnniversaryModal from './components/Anniversary';

async function fetchEvents() {
  try {
    const response = await fetch("https://sweetmarketonmain.com/api/events", { cache: "no-store" });
    const data = await response.json();

    // Transform and sort events by start date
    const formattedEvents = data.events.map((event) => ({ 
      start: new Date(event.start),
      title: event.summary,
      description: event.description,
      location: event.location,
    }));

    // Sort events by start date and keep only the three nearest events
    return formattedEvents.sort((a, b) => a.start - b.start).slice(0, 3);
  } catch (error) {
    console.error("Error fetching nearest events:", error);
    return []; // Return empty array on error
  }
}

const inside =[
  {title:"Reading Nook" , img:"/Img/Reading_Nook.jpg", desc:"Escape into our cozy reading nook, where comfort meets tranquility. Whether you're lost in a good book or simply enjoying a peaceful moment, our nook offers the perfect atmosphere for relaxation. Come unwind, sip your favorite drink, and let the world fade away as you immerse yourself in your next great read."},
  {title:"Market" , img:"/Img/Market_Image.JPG", desc:"Step into our market, where history meets charm. Discover a collection of unique antiques, vintage treasures, and one-of-a-kind pieces. Whether you're looking for timeless decor or a rare find, our market offers a nostalgic experience that brings the past to life."},
  {title:"Lani Moku Chill Bar" , img:"/Img/Lani_Moku_Bar.jpg", desc:"Relax and unwind at our Lani Moku Chill Bar, where great drinks and good company meet. Whether you're enjoying a craft cocktail or a cold beer, our welcoming atmosphere makes it the perfect spot to relax with friends or make new ones. Cheers to unforgettable moments!"}
]

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const food = [
    { img: "/Img/Tailg8s_Logo.png", name: "Tailg8's", url: "https://tailg8s.com" },
    {
      img: "/Img/Calle_Steelo_Logo.png",
      name: "Calle Steelo Taqueria",
      url: "https://www.facebook.com/CalleSteeloTaqueria/",
    },
    {
      img: "/Img/Kento_Logo.png",
      name: "Kento",
      url: "https://kentosfoodtruck.com/",
    },
    {
      img: "/Img/Once_Famous_Logo.png",
      name: "Once Famous Grill",
      url: "https://www.oncefamousgrill.com/",
    },
  ];

  const posts = [
    { img: "/Img/Performance_1.JPG", alt: "Isaac Baranger Performance" },
    { img: "/Img/Flower_Image.JPG", alt: "Flowers in Sweet Market" },
    { img: "/Img/Picture_1.JPG", alt: "Truck with Flowers" },
    { img: "/Img/Picture_2.JPG", alt: "Flower Shop Setup" },
    { img: "/Img/Picture_3.JPG", alt: "Flowers and Cart" },
    { img: "/Img/Picture_4.jpg", alt: "People enjoying outside sitting area" },
    { img: "/Img/Picture_5.jpg", alt: "Inside shop items" },
    { img: "/Img/Picture_6.jpg", alt: "Table with old antiques" },
    { img: "/Img/Picture_7.jpg", alt: "Old truck bed with product bags" },
  ];

  return (
    <>
    <div >
    <AnniversaryModal />

    </div>
    <div className="bgBeige">
      <div className="">
        {/* LANDING IMG */}
        <div className="relative h-96 w-full">
  <Image className="h-full w-full object-cover" width={800} height={800} quality={100} loading="lazy"  src="/Img/Sweet_Market.jpg" alt="Sweet Market" />
  <div className="absolute inset-0 bg-white bg-opacity-70 flex text-center justify-center items-center">
    <Image src="/Img/Sweet_Market_Logo.png" width={500} height={500} alt='Sweet Market Logo' className=" lg:w-4/12 font-semibold font-serif text-white" />
  </div>
</div>



        {/* ================================================= */}
        {/* Events Section */}
        <motion.div initial={{ opacity: 0, x: "-20px" }}
      whileInView={{ opacity: 1, x: "0px" }} transition={{ duration: 1 }} viewport={{ once: true }} className="w-full">
      <div className="text-center text-3xl font-semibold font-serif pt-5">
        <h3 className="">Upcoming Events</h3>
      </div>
      <div className="pt-10 lg:w-1/2 lg:mx-auto mx-5">
        {/* Card Start */}
        {loading ? (
          // Loading Skeleton
          <div className="animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8">
                <div className="col-span-1 text-center text-white py-2 bg-gray-300 rounded-l-xl ">
                  <div className="h-8 bg-gray-400 rounded w-3/4 mx-auto mt-2"></div>
                  <div className="h-12 bg-gray-400 rounded w-3/4 mx-auto mt-2"></div>
                </div>
                <div className="col-span-5 ms-5">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mt-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Events
          events.map((event, index) => (
            <div key={index} className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8">
              <div className="col-span-1 text-center text-white py-2 bg-red-500 rounded-l-xl ">
                {/* Display Month and Date from event.start */}
                <h4>{moment(event.start).format("MMM")}</h4>
                <h4 className="text-4xl font-semibold">
                  {moment(event.start).format("D")}
                </h4>
              </div>
              <div className="col-span-5 ms-5">
                {/* Display title and description */}
                <h3 className="font-bold text-2xl">{event.title} @ {moment(event.start).format("ha")}</h3>
                {event.description === "No Description" ? null : (
                  <p className="text-gray-600">{event.description}</p>
                )}
              </div>
            </div>
          ))
        )}
        <div className="pt-10 text-center">
          <Link href="/events">
            <button className="active:scale-95 duration-75 rounded-lg bg-red-400 text-white px-4 py-2">
              See All
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
        <motion.div initial={{ opacity: 0, x: "-20px" }}
      whileInView={{ opacity: 1, x: "0px" }} transition={{ duration: 1 }} viewport={{ once: true }} className="mt-20">
    <h2 className={`lg:ms-10 pb-10 ${greatFont.className} lg:text-left text-center text-6xl`}>
            Inside the Market
          </h2>
          <div className="grid lg:grid-cols-3 lg:w-10/12 mx-auto mb-16 overflow-hidden">
  {inside.map((item, index) => (
    <div key={index} className="col-span-1 my-5 grid grid-cols-1 text-center">
      <img
        className="mx-auto h-72 w-72 bg-gray-400 object-cover"
        src={item.img}
        alt="In time"
      />
      <div className="">
        <h2 className="font-bold pt-5 text-2xl pb-1">{item.title}</h2>
        <p className="mx-2">
          {item.desc}
        </p>
      </div>
    </div>
  ))}
  </div>
  </motion.div>

        {/* ==================================================================================================== */}
        {/* Start Food Section */}
        <motion.div initial={{ opacity: 0, x:"-20px" }}
  whileInView={{ opacity: 1, x: "0px" }} transition={{duration:1}} viewport={{ once: true }} id="food-trucks" className="mx-auto">
          <div className="pt-20 text-center text-3xl font-semibold font-serif">
            <h3 className="">Food Trucks</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-1/2 mx-auto mt-10">
            {food.map((item, index) => (
              <div key={index} className="relative mx-auto w-72 mb-20">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.img}
                    className="w-full h-auto"
                    alt={item.name}
                  />

                  {/* Hover effect */}
                  <div className="absolute h-72 inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-bold">{item.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* ======================================================================================================== */}
      {/* About Section */}
      <motion.div initial={{ opacity: 0, x:"-20px" }}
  whileInView={{ opacity: 1, x: "0px" }} transition={{duration:1}} viewport={{ once: true }} className="lg:mt-20">
        
      <div className="grid mx-auto mt-20 grid-cols-1 lg:grid-cols-2 w-11/12 lg:w-8/12">
  <div className="col-span-1 order-2 lg:order-1 mx-auto">
    <img
      src="/Img/Sweet Salvage Store.png"
      className="mx-auto mt-5 mb-5  bg-black"
      alt="Picture"
    />
  </div>
  <div className="order-1 lg:order-2 col-span-1  mx-auto flex flex-col justify-center h-full text-center">
    <h3 className="text-center font-bold text-5xl font-serif mb-4">About Us</h3>
    <p className="lg:mx-10 mx-6">
      Welcome to Sweet Salvage – your go-to spot for cool, vintage vibes
      and good times! Inside, you’ll find a mix of farmhouse decor,
      unique finds, and all the cozy stuff to make your space feel
      special. But we’re more than just a shop – outside, our food truck
      pavilion has all the tasty eats, and we’ve got live music to keep
      things lively. Whether you're here to shop, grab a bite, or just
      hang out, Sweet Salvage is all about laid-back fun and making
      memories.
    </p>
    </div>
  </div>
    <div className="mt-3 center">
    <Link href="about-us">
    <button className="active:scale-95 duration-75 rounded-lg bg-red-400 text-white px-4 py-2">View More</button>
    </Link>
</div>

      </motion.div>
      {/* ======================================================================================================================= */}
      {/* IG POSTS */}
      <div className="font-bold text-3xl font-serif text-center mt-20">
  <h3 className="flex justify-center items-center gap-2">
    Follow Us on
    <a href="https://www.instagram.com/sweetsalvagedesigns/?hl=en" target="_blank" rel="noopener noreferrer">
    <FaInstagram/>
    </a>
    /
    <a href="https://www.facebook.com/SweetSalvageDesigns/" target="_blank" rel="noopener noreferrer">
    <FaFacebookF />
    </a>
  </h3>
</div>

<div className=" w-11/12 gap-4 max-w-6xl mx-auto my-8 pb-16">
<BeforeAfterSlider posts={posts}/>
</div>
</div>
    </>
  );
}
