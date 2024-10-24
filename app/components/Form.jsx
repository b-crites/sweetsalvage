"use client";

import { useState } from "react";

export default function Form() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMembers, setSelectedMembers] = useState("");
  const [setLength, setSetLength] =useState("");
  const [power, setPower] = useState("");
  const [selectedDate, setSelectedDate] =useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleMemberChange = (e) => {
    setSelectedMembers(e.target.value);
  };

  const handleSetChange = (e) =>{
    setSetLength(e.target.value)
  }

  const handlePowerChange =(e) =>{
    setPower(e.target.value)
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const today = new Date().toISOString().split('T')[0];
  
  const handleSubmit = () =>{
    
    alert("SUBMITTED!!!!")
  }


  return (
    <>
      <div className="rounded-xl bg-white max-w-96 min-w-fit p-4 border border-black mx-auto my-20">
        <h1 className="text-lg text-center font-bold mb-4">Inquiry Form</h1>

        <label
          htmlFor="dropdown"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select a Form
        </label>
        <select
          id="dropdown"
          value={selectedValue}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          <option value="band">Band Form</option>
          <option value="inquiry">Inquiry Form</option>
          <option value="wedding">Wedding Form</option>
          <option value="contact">Contact Form</option>
        </select>
        <form onSubmit={handleSubmit}>
        <div className="pt-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <div className="flex space-x-4" id="name">
            <input
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="First Name"
            />
            <input
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="pt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <div className="flex space-x-4" id="email">
            <input
              className="block w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="pt-4">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <div className="flex space-x-4" id="phone">
            <input
              className="block w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {selectedValue === "band" && (
  <div className="mt-4">
    <label className="block mb-2 text-sm font-medium text-gray-700">
      Band Information:
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* GENRE */}
      <input
        className="block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Genre of Music"
        type="text"
      />
      {/* MEMBERS */}
      <select
        id="members"
        value={selectedMembers}
        onChange={handleMemberChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
      >
        <option value="" disabled>
          How many members?
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7+">7+</option>
      </select>
{/* LENGTH PICKER */}
      <select
        id="setLength"
        value={setLength}
        onChange={handleSetChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Set Time?
        </option>
        <option value="30 Minutes">30 minutes</option>
        <option value="1 hr">1 hr</option>
        <option value="1 hr 30 minutes">1 hr 30 minutes</option>
        <option value="2 hrs">2 hrs</option>
        <option value="2 hrs 30 minutes">2 hrs 30 minutes</option>
        <option value="3 hrs">3 hrs</option>
      </select>
      {/* POWER */}
      <select
        id="power"
        value={power}
        onChange={handlePowerChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Will you need power?
        </option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {/* DATE PICKER */}
      <div className="block col-span-2 w-full">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
            Select a Performance Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            min={today} 
          />
        </div>
        {/* MESSAGES */}
    </div>
        <label className="block my-2 text-sm font-medium text-gray-700" htmlFor="message">Anything else we should know?</label>
        <textarea id="message" className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Message">

        </textarea>
        <div className="mt-2 grid justify-items-end">

          <button className="active:scale-95 duration-75 rounded-md bg-red-400 text-white px-4 py-2">Submit</button>
            </div>
  </div>
  
)}
        {selectedValue === "inquiry" && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Details for Option 2:
            </label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Textarea for Option 2"
            ></textarea>
          </div>
        )}
        {selectedValue === "wedding" && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Details for Option 2:
            </label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Textarea for Option 3"
            ></textarea>
          </div>
        )}
        {selectedValue === "contact" && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Details for Option 2:
            </label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Textarea for Option 4"
            ></textarea>
          </div>
        )}
        </form>
      </div>
    </>
  );
}
