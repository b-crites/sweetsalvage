"use client";


import Link from "next/link";
import Form from "./components/Form";

export default function Home() {
  const events = [
    {
      date: "18",
      day: "FRI",
      month: "OCT",
      name: "Luke Bryan",
      description: "This is where Luke Bryan will be on this date",
    },
    {
      date: "20",
      day: "SUN",
      month: "OCT",
      name: "Luke Bryan",
      description: "This is where Luke Bryan will be on this date",
    },
    {
      date: "26",
      day: "SAT",
      month: "OCT",
      name: "Luke Bryan",
      description: "This is where Luke Bryan will be on this date",
    },
  ];

  const food = [
    { img: "/Img/tailg8s.jpg", name: "Tailg8's", url: "https://tailg8s.com" },
    {
      img: " /Img/Calle_Steelo_Logo.jpg",
      name: "Calle Steelo Taqueria",
      url: "https://www.facebook.com/CalleSteeloTaqueria/",
    },
    {
      img: "/Img/Kentos.jpg",
      name: "Kento",
      url: "https://kentosfoodtruck.com/",
    },
    {
      img: "/Img/once.webp",
      name: "Once Famous Grill",
      url: "https://www.oncefamousgrill.com/",
    },
  ];

  const posts = [
    { img: "/Img/yard.jpg", alt: "Sweet Salvage" },
    { img: "/Img/Fuller.jpg", alt: "James Fuller" },
    { img: "/Img/Cramer Boys.png", alt: "Cramer Boys" },
    { img: "/Img/cramer boys setup.png", alt: "Cramer Boys Setup" },
    { img: "/Img/Ghosts.png", alt: "Ghosts" },
    { img: "/Img/In Line.png", alt: "People In Line" },
    { img: "/Img/Northern Lights.png", alt: "Northern Lights Scenery" },
    { img: "/Img/Store.png", alt: "Store" },
    { img: "/Img/View.png", alt: "View of Yard" },
  ];

  return (
    <>
      <div className="">
        {/* LANDING IMG */}
        <div className="relative h-96 w-full">
  <img className="h-full w-full object-cover" src="/Img/Farm.jpg" alt="" />
  <div className="absolute inset-0 bg-black bg-opacity-50 flex text-center justify-center items-center">
    <h1 className="text-6xl font-semibold font-serif text-white">SWEET SALVAGE</h1>
  </div>
</div>
<Form />


        {/* ================================================= */}
        {/* Events Section */}
        <div className="w-full">
          <div className=" text-center text-3xl font-semibold font-serif pt-5">
            <h3 className="">Upcoming Events</h3>
          </div>
          <div className="pt-10 lg:w-1/2 lg:mx-auto mx-5">
            {/* Card Start */}
            {events.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8"
              >
                <div className="col-span-1 text-center text-white py-2 bg-red-500 rounded-l-xl ">
                  <h4 className="">{item.month}</h4>
                  <h4 className="text-4xl font-semibold">{item.date}</h4>
                </div>
                <div className="col-span-5 ms-5">
                  <h3 className=" font-bold text-2xl  ">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            <div className=" pt-10 center">
              <button className="rounded-xl py-2 px-6 text-xl bg-red-500 text-white">
                See All
              </button>
            </div>
          </div>
        </div>
        {/* ==================================================================================================== */}
        {/* Start Food Section */}
        <div className="mx-auto">
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
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-bold">{item.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ======================================================================================================== */}
      {/* About Section */}
      <div className="lg:mt-20">
        
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
    <button className="active:scale-95 duration-75 rounded-md bg-red-400 text-white px-4 py-2">View More</button>
    </Link>
</div>

      </div>
      {/* ======================================================================================================================= */}
      {/* IG POSTS */}
      <div className="font-bold text-3xl font-serif text-center mt-20">
  <h3 className="flex justify-center items-center gap-2">
    Follow Us on
    <a href="https://www.instagram.com/sweetsalvagedesigns/?hl=en" target="_blank" rel="noopener noreferrer">
    <box-icon type="logo" size='lg' name="instagram" />
    </a>
    /
    <a href="https://www.facebook.com/SweetSalvageDesigns/" target="_blank" rel="noopener noreferrer">
    <box-icon name="facebook" size='lg' type="logo"></box-icon>
    </a>
  </h3>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 w-11/12 gap-4 max-w-6xl mx-auto my-8">
  {posts.map((post, index) => (
    <div key={index} className="relative">
      <img 
        src={post.img} 
        alt={post.alt} 
        className="w-full h-[300px] object-cover" // Adjust height as needed
      />
      {/* Optional hover effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-lg font-bold">{post.alt}</p>
      </div>
    </div>
  ))}
</div>

    </>
  );
}
