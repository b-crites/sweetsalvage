


export default function Home() {

const events = [
  {date:"18", day:"FRI", month:"OCT", name: "Luke Bryan", description:"This is where Luke Bryan will be on this date"},
  {date:"20", day:"SUN", month:"OCT", name: "Luke Bryan", description:"This is where Luke Bryan will be on this date"},
  {date:"26", day:"SAT", month:"OCT", name: "Luke Bryan", description:"This is where Luke Bryan will be on this date"}
]




  return (
 <>
 <div className="">
  {/* LANDING IMG */}
  <div className=" h-96 bg-stone-500 w-full">
    <h2>TITLE</h2>
  </div>
{/* ================================================= */}
{/* Events Section */}
<div className="w-full">
  <div className=" text-center text-3xl font-semibold font-serif pt-5">
    <h3 className="">Upcoming Events</h3>
  </div>
  <div className="pt-10 md:w-1/2 mx-auto">
    {/* Card Start */}
    {events.map((item,index) => (
    
    <div key={index} className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8">
      <div className="col-span-1 text-center text-white py-2 bg-red-500 rounded-l-xl ">
      <h4 className="">{item.month}</h4>
      <h4 className="text-4xl font-semibold">{item.date}</h4>
      </div>
      <div className="col-span-5 ms-5">
        <h3 className=" font-bold text-2xl  ">
          {item.name}
        </h3>
        <p>{item.description}</p>
        </div>

    </div>
    
    ))}
    <div className=" pt-10 center">
      <button className="rounded-xl py-2 px-6 text-xl bg-red-500 text-white">See All</button>
    </div>
  </div>

</div>
{/* ==================================================================================================== */}
{/* Start Food Section */}
<div className="">
<div className="pt-20 text-center text-3xl font-semibold font-serif">
    <h3 className="">Food Trucks</h3>
  </div>
</div>
 </div>
 </>
  );
}
