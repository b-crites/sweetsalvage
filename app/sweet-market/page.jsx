import BeforeAfterSlider from "../components/SlideShow";
import { Great_Vibes } from 'next/font/google';
const greatFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

export default function Market() {

    const inside =[
        {title:"Reading Nook" , img:"/Img/Nook.jpg", desc:"Escape into our cozy reading nook, where comfort meets tranquility. Whether you're lost in a good book or simply enjoying a peaceful moment, our nook offers the perfect atmosphere for relaxation. Come unwind, sip your favorite drink, and let the world fade away as you immerse yourself in your next great read."},
        {title:"Market" , img:"/Img/Market.jpg", desc:"Step into our market, where history meets charm. Discover a collection of unique antiques, vintage treasures, and one-of-a-kind pieces. Whether you're looking for timeless decor or a rare find, our market offers a nostalgic experience that brings the past to life."},
        {title:"Lani Moku Chill Bar" , img:"/Img/Bar.jpg", desc:"Relax and unwind at our Lani Moku Chill Bar, where great drinks and good company meet. Whether you're enjoying a craft cocktail or a cold beer, our welcoming atmosphere makes it the perfect spot to relax with friends or make new ones. Cheers to unforgettable moments!"}
    ]

  return (
    <>
      <div className="bgBeige">
        <div className=" heroH overflow-hidden relative">
          <img
            className="w-full xl:-translate-y-80 "
            src="/Img/Sweet Market.jpg"
            alt="Sweet Market"
          />
          <div className="h-full w-full bg-white opacity-65 absolute top-0 left-0"></div>

          <img
            className="absolute w-10/12 lg:w-4/12 m-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src="/Img/Sweet Market Logo.png"
            alt="Sweet Market Logo"
          />
        </div>
        <div className="pt-10">
          <h2 className={`ms-10 pb-5 ${greatFont.className} lg:text-left text-center text-6xl`}>
            Before & Afters
          </h2>
          {/* SLIDESHOW */}
          <BeforeAfterSlider />
        </div>
        {/* INSIDE THE MARKET */}
        <div className="">
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


          <div className="w-10/12 mx-auto  lg:pb-5">
          <div className="lg:pt-10 pt-0">
            <img className=" h-72 mx-auto" src="/Img/BookClub.jpg" alt="" />
          </div>
          <div className="lg:mx-3 pt-5 text-center">
            <p>
              
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
            </p>
          </div>
         
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 text-center mx-auto lg:py-20 py-10  w-8/12">
          <div className="col-span-1 my-auto">
            <div className="">
              <h2 className=" font-bold text-3xl text-center">Market History</h2>
            </div>
            <div className="pt-5 mx-3 lg:mx-10 ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              </p>
            </div>
          </div>
          <div className="pt-10 lg:pt-0">
            <img className="w-96 h-72 mx-auto" src="/Img/View.png" alt="" />
          </div>
        </div>
        </div>
        
      </div>
    </>
  );
}
