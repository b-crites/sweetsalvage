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
        {/* ------------------------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 w-8/12 mx-auto py-10 lg:py-20">
          <div className="">
            <h2 className={`text-5xl ${greatFont.className} text-center`} >
              What's Sweet Salvage?
            </h2>
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
          <div className="lg:pt-10 pt-0">
            <img className=" mx-auto" src="/Img/Sweet Salvage Store.png" alt="" />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
