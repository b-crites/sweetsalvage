import React from "react";

function Header() {
  return (
    <nav className=" bg-gray-950 w-full py-10">
      <div className="grid grid-cols-2">
        <div className=" col-span-1 me-auto ms-5">
          <h2 className=" font-serif text-4xl text-white"><button>SWEET SALVAGE</button></h2>
        </div>
        <div className=" text-white font-serif col-span-1 ms-auto me-8">
          <ul className="flex text-xl flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-4 rtl:space-x-reverse">
            <li>
              <button>About</button>
            </li>
            <li>
              <button>Events</button>
            </li>
            <li>
              <button>Menus</button>
            </li>
            <li>
              <button>Contact Us</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
