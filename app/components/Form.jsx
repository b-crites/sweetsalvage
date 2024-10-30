"use client";

import { useState } from "react";

export default function Form() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMembers, setSelectedMembers] = useState("");
  const [setLength, setSetLength] = useState("");
  const [power, setPower] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [typeOfMusic, setTypeOfMusic] = useState("");
  const [genreOfMusic, setGenreOfMusic] = useState("");
  const [stagename, setStageName] = useState("");
  const [eventType, setEventType] = useState("");
  const [drinks, setDrinks] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  


  const handleChange = (e) => setSelectedValue(e.target.value);
  const handleMemberChange = (e) => setSelectedMembers(e.target.value);
  const handleMusicChange = (e) => setTypeOfMusic(e.target.value);
  const handleSetChange = (e) => setSetLength(e.target.value);
  const handleGenreChange = (e) => setGenreOfMusic(e.target.value);
  const handleStagenameChange = (e) => setStageName(e.target.value);
  const handlePowerChange = (e) => setPower(e.target.value);
  const handleEventChange = (e) => setEventType(e.target.value);
  const handleDrinkChange = (e) => setDrinks(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
//  const handleMessageChange = (e) => setMessage(e.target.value);
  

  
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  
  const today = new Date().toISOString().split("T")[0];

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collect common data
    const formData = {
      selectedValue, // Add selectedValue to capture form type
      firstName,
      lastName,
      email,
      phoneNumber,
      selectedDate,
      typeOfMusic,
      eventType,
      message,  // Add any additional form data
      drinks,
      genreOfMusic,
      setLength,
      stagename,
      selectedMembers,
      power,
    };

    // Add data based on selected form
    if (selectedValue === "band") {
      formData.typeOfMusic = typeOfMusic;
      formData.selectedMembers = selectedMembers;
      formData.setLength = setLength;
      formData.power = power;
      formData.performanceDate = selectedDate;
    } else if (selectedValue === "wedding") {
      formData.eventType = eventType;
      formData.drinks = drinks;
      formData.weddingDate = selectedDate;
    }
    
    //Log the form data with active fields
    console.log("Sending form data:", formData);  // consolidated log

    //send form data to the backend
    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }


 
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 5000); 
  };
  

  const closeBanner = () => {
    setShowBanner(false);
  };
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const formatPhoneNumber = (value) => {
    // Remove any non-digit characters
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  


  return (
    <>
     {showBanner && (
        <div className="alert-overlay">
          <div className="alert-banner">
            <button className="close-button" onClick={closeBanner}>
              &times; {/* Close icon */}
            </button>
            We will be in touch within 24 hours!
          </div>
        </div>
      )}
              <style jsx>{`
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .alert-banner {
          background-color: #4caf50; /* Green */
          color: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          width: 300px; /* Set a fixed width for the banner */
        }

         .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .close-button:hover {
          opacity: 0.8; /* Optional hover effect */
        }
      `}</style>
      <div className="rounded-xl bg-white max-w-96 min-w-fit p-4 border border-black mx-auto ">
        <h1 className="text-lg text-center font-bold mb-4">Inquiry Form</h1>

        <label
          htmlFor="dropdown"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select a Form
        </label>
        <form onSubmit={handleSubmit}>
        <select
          id="dropdown"
          value={selectedValue}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            -- Select a Form --
          </option>
          <option value="band">Band Form</option>
          <option value="wedding">Wedding Form</option>
          <option value="contact">Contact Form</option>
        </select>
        <div className="pt-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            <p>Name: <span className="text-red-600"> *</span></p>
          </label>
          <div className="flex space-x-4" id="name">
            <input
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Last Name"
              value={lastName}
          onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="pt-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          <p>Email: <span className="text-red-600"> *</span></p>
        </label>
        <div className="flex space-x-4" id="email">
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(emailRegex.test(e.target.value) ? "" : "Please enter a valid email address.");
            }}
            required
          />
        </div>
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
      </div>
      <div className="pt-4">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
          <p>Phone Number: <span className="text-red-600"> *</span></p>
        </label>
        <div className="flex space-x-4" id="phone">
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value);
              setPhoneNumber(formattedValue);

              // Remove non-digit characters for validation
              const cleanedValue = formattedValue.replace(/\D/g, '');
              
              // Validate the phone number and set error accordingly
              if (cleanedValue.length === 10) {
                setPhoneError(""); // Clear error if valid
              } else {
                setPhoneError("Please enter a valid phone number (10 digits).");
              }
            }}
            required
          />
        </div>
        {phoneError && <p className="text-red-600 text-sm">{phoneError}</p>}
      </div>
{/* BAND INFO******************************************************************************************************************************************************* */}
        {selectedValue === "band" && (
  <div className="mt-4">
    <label className="block mb-2 text-sm font-medium text-gray-700">
    <p>Band Information: <span className="text-red-600"> *</span></p>
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* GENRE */}
      <input
        className="block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Genre of Music"
        value={genreOfMusic}
        onChange={handleGenreChange}
        type="text"
        required
      />
      {/* TYPE OF MUSIC */}
      <select
        id="typeOfMusic"
        value={typeOfMusic}
        onChange={handleMusicChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
        required
      >
        <option value="" disabled>
          Type of Music?
        </option>
        <option value="Originals">Originals</option>
        <option value="Covers">Covers</option>
        <option value="Mix of Both">Mix of Both</option>
        
      </select>
      {/* STAGE NAME */}
      <input className="block w-full p-2 border border-gray-300 rounded-md"
      placeholder="Band Name/Stage Name"
      value={stagename}
      onChange={handleStagenameChange}
      type="text"
      required
      />
      {/* MEMBERS */}
      <select
        id="members"
        value={selectedMembers}
        onChange={handleMemberChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
        required
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
        required
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
        required
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
          <p>Select a Performance Date: <span className="text-red-600"> *</span></p>
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            min={today} 
            required
          />
        </div>
        {/* MESSAGES */}
    </div>
        <label className="block my-2 text-sm font-medium text-gray-700" htmlFor="message">Anything else we should know? (Optional)</label>
        <textarea id="message" 
          className="block w-full p-2 border border-gray-300 rounded-md" 
          placeholder="Message"
          value={message} //connecting to the state
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="mt-2 grid justify-items-end">

          <button className="active:scale-95 duration-75 rounded-md bg-red-400 text-white px-4 py-2">Submit</button>
            </div>
  </div>
  
)}
{/* END OF BAND INFO******************************************************************************************************************************************** */}
        {selectedValue === "wedding" && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
    <p>Wedding Information: <span className="text-red-600"> *</span></p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
        className="block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Number of Attendees?"
        type="text"
        required
      />
       <select
        id="eventType"
        value={eventType}
        onChange={handleEventChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
        required
      >
        <option value="" disabled>
          Event Type?
        </option>
        <option value="Ceremony">Ceremony</option>
        <option value="Reception">Reception</option>
        <option value="Both">Both</option>
        
      </select>
      <select
        id="drinks"
        value={drinks}
        onChange={handleDrinkChange}
        className="block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
        required
      >
        <option value="" disabled>
          Will you want an open bar?
        </option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        
      </select>
       <div className="block col-span-2 w-full">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
          <p>Select a Wedding Date: <span className="text-red-600"> *</span></p>
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            min={today} 
            required
          />
        </div>
        </div>
    </label>
            <label className="block my-2 text-sm font-medium text-gray-700" htmlFor="message">Anything else we should know? (Optional)</label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Message"
              value={message} //connecting to the state
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="mt-2 grid justify-items-end">

<button className="active:scale-95 duration-75 rounded-md bg-red-400 text-white px-4 py-2">Submit</button>
  </div>
          </div>
          
        )}
        {selectedValue === "contact" && (
          <div className="mt-4">
           <label className="block my-2 text-sm font-medium text-gray-700" htmlFor="message">What's your reason for contacting?</label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Message"
              value={message} //connecting to the state
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="mt-2 grid justify-items-end">

<button type="submit" className="active:scale-95 duration-75 rounded-md bg-red-400 text-white px-4 py-2">Submit</button>
  </div>
          </div>
        )}
        </form>
      </div>
    </>
  );
}
