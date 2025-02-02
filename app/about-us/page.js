import { Great_Vibes } from 'next/font/google';
const greatFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

export default function About() {
  return (
    <>
      <div className="bg-white pb-12">
        <div className="mt-10 lg:ms-10 pb-10">
          <h1 className="font-bold font-serif lg:text-left text-center text-5xl">
            About Us
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 text-center mx-auto  w-8/12">
          <div className="col-span-1 my-auto">
            <div className="">
              <h2 className={`font-bold ${greatFont.className} text-5xl text-center`}>Our Journey</h2>
            </div>
            <div className="pt-5 mx-3 lg:mx-10 ">
              <p>
              Sweet Salvage Markets started as a simple idea—a place where community,
               creativity, and local craftsmanship could come together. From our humble
                beginnings in 2022 with just a single market location, we’ve grown into 
                something much more. What started as a small marketplace has blossomed into a vibrant gathering 
                 spot where people can shop, connect, and celebrate the charm of unique finds.
                  Every vendor, every product, and every event we host is a reflection of the 
                  heart and soul we pour into making Sweet Salvage more than just a market—it’s
                   an experience. And this is just the beginning of our journey.


              </p>
            </div>
          </div>
          <div className="pt-10 lg:pt-0">
            <img className="w-96 h-72 mx-auto" src="/Img/View.png" alt="" />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 w-8/12 mx-auto py-10 lg:py-20">
          <div className="">
            <h2 className={`text-5xl ${greatFont.className} text-center`} >
              What's Sweet Salvage?
            </h2>
          </div>
          <div className="lg:mx-3 pt-5 text-center">
            <p>
            Sweet Salvage is more than just a market—it’s a place where nostalgia meets creativity,
             and local craftsmanship shines. We bring together a thoughtfully curated mix of antiques,
              handmade goods, cozy yet stylish clothing, and locally made treats like pickles, honey,
               and preserves. But it doesn’t stop there.
               At Sweet Salvage, we believe shopping should be an experience.
                That’s why we’ve expanded beyond just a marketplace. With the Sweet Salvage 
                Pavilion, we’ve created a welcoming space for food trucks, live music, and a lively beer
                 garden where the community can gather, unwind, and enjoy something special.
                 Whether you’re here to find a unique treasure, support local artisans,
                  or just soak in the atmosphere, Sweet Salvage is a place to explore, connect, and enjoy.
            </p>
          </div>
          <div className="lg:pt-10 pt-0">
            <img className="w-96 h-72 mx-auto" src="/Img/View.png" alt="" />
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        <div className="grid lg:grid-cols-2 grid-cols-1 text-center mx-auto pt-10 lg:pt-20 w-8/12">
          <div className="pt-10 lg:pt-0 order-2 lg:order-1">
            <img className="w-96  mx-auto" src="/Img/Jennifer.jpg" alt="" />
          </div>
          <div className="col-span-1 my-auto lg:order-2 order-1">
            <div className="">
              <h2 className={`font-bold ${greatFont.className} text-5xl text-center`}>About Jennifer</h2>
            </div>
            <div className="lg:pt-5 mx-3 lg:mx-10 ">
              <p>
              Sweet Salvage Markets was built on passion, hard work, and the determination to turn a 
              vision into reality. As an entrepreneur, the owner faced the challenges of starting a
               business head-on—navigating the ups and downs, learning through experience, and pushing 
               forward despite the obstacles.
               With a love for unique finds and a drive to create something special,
                she turned Sweet Salvage into more than just a market. It became a space where 
                local artisans, small businesses, and the community could come together. From curating
                 antiques to building a gathering place with food, music, and local goods, she proved 
                 that perseverance and heart can turn a dream into a thriving business.
                 Sweet Salvage is a reflection of that journey—one of resilience, creativity, 
                 and the belief that great things happen when you keep going.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
