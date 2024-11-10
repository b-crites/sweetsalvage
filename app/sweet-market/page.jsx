import BeforeAfterSlider from "../components/SlideShow";

export default function Market() {

    const inside =[
        {title:"one" , img:"#", desc:" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"},
        {title:"one" , img:"#", desc:" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"},
        {title:"one" , img:"#", desc:" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat"}
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
            className="absolute w-4/12 m-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src="/Img/Sweet Market Logo.png"
            alt="Sweet Market Logo"
          />
        </div>
        <div className="pt-10">
          <h2 className="ms-10 pb-5 cursiveFont lg:text-left text-center text-4xl">
            Our Before & Afters
          </h2>
          {/* SLIDESHOW */}
          <BeforeAfterSlider />
        </div>
        {/* INSIDE THE MARKET */}
        <div className="">
          <h2 className="lg:ms-10 pb-10 cursiveFont lg:text-left text-center text-4xl">
            Inside the Market
          </h2>
          <div className=" grid lg:grid-cols-3 lg:w-10/12 mx-auto">
          {inside.map((item,index) => (

            <div key={index} className="col-span-1 grid grid-cols-1 text-center">
              <img
                className="mx-auto pb h-64 w-64 bg-gray-400"
                src={item.img}
                alt="In time"
              />
              <div className="">
                <h2 className="font-bold text-2xl pb-2">{item.title}</h2>
                <p className="mx-2">
                  {item.desc}
                </p>
              </div>
            </div>
        ))}
          </div>
          <div className="w-10/12 mx-auto lg:pt-20 lg:pb-5">
          <div className="lg:pt-10 pt-0">
            <img className="w-96 h-72 mx-auto" src="/Img/View.png" alt="" />
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
        <div className="grid lg:grid-cols-2 grid-cols-1 text-center mx-auto lg:py-20  w-8/12">
          <div className="col-span-1 my-auto">
            <div className="">
              <h2 className=" font-bold text-3xl text-center">Our Journey</h2>
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
