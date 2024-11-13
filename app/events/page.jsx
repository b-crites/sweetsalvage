"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MonthSelectionModal from "../components/MonthSelectionModal";
import EventsModal from "../components/EventsModal";

const localizer = momentLocalizer(moment);

export default function Events() {
  const [isClient, setIsClient] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [events, setEvents] = useState([]); // set up events correctly for updates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(""); // State for selected months
  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Fetch events from backend API on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://127.0.0.1:5000/events"); // Replace with your actual API endpoint
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        console.log("Fetched data:", data); // Log raw data to check the structure
  
        // Transform data to fit `react-big-calendar` format
        const formattedEvents = data.map((event) => {
          const startDate = new Date(event.start);
          const endDate = new Date(startDate);
          endDate.setHours(startDate.getHours() + 1); // Set end time to 1 hour after start
  
          return {
            start: startDate,
            end: endDate,
            title: event.summary,
            description: event.description, // Optional: include description if needed
            location: event.location, // Optional: include location if needed
          };
        });
        
        console.log("Formatted events:", formattedEvents); // Log formatted data
        
        setEvents(formattedEvents); // Update `events` state with fetched data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  
    fetchEvents(); // Call the function to load events
  }, []);

  //Ensures client-side rendering for components requiring DOM manipulation
  useEffect(() => {
    setIsClient(true);
  }, []);

  //handles the date change inpresentation mode
  useEffect(() => {
    let interval;
    let monthIndex = 0; // Initialize month index to track the current month in rotation

    if (isPresentationMode && selectedMonths > 0) {
      // Only start interval if selectedMonths is greater than 0
      interval = setInterval(() => {
        // Get the new date based on the current month index
        const newDate = moment().add(monthIndex, "month").toDate();
        setCurrentDate(newDate);

        // Increment the month index
        monthIndex++;

        // Reset month index if it exceeds selected months
        if (monthIndex > selectedMonths) {
          monthIndex = 0; // Restart the rotation
        }
      }, 1000); // Change month every 15 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPresentationMode, selectedMonths]); // Include selectedMonths in dependency array

  //Key event listeners for additional functionalities
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + P to show modal
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault(); // Prevent the default action
        setShowModal(true); // Show modal for month selection
      }

      // Check for Esc to exit presentation mode
      if (event.key === "Escape") {
        setIsPresentationMode(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const startPresentation = () => {
    setShowModal(false);
    setIsPresentationMode(true);
    // Set the current date to include the selected months in the rotation
    setCurrentDate(new Date()); // Reset to the current date for the presentation
  };

  if (!isClient) return null; //Ensures server-side rendering works without client-specific code errors


  return (
    <>
      <div className="mt-10 ms-10 text-center lg:text-left">
        <h2 className="font-semibold font-serif text-5xl">Events</h2>
      </div>

      <div className="pt-20 lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:mx-auto mx-5">
        {/* Example event display outside the calendar */}
        {events.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8"
          >
            <div className="col-span-1 text-center text-white py-2 bg-red-500 rounded-l-xl ">
              <h4>{moment(item.start).format("MMM")}</h4>
              <h4 className="text-4xl font-semibold">
                {moment(item.start).format("D")}
              </h4>
            </div>
            <div className="col-span-5 ms-5">
              <h3 className=" font-bold text-2xl">{item.title}</h3>
              {/* Add any additional event info here */}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <MonthSelectionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onStart={startPresentation}
          setSelectedMonths={setSelectedMonths}
        />
        <div
          style={{
            position: isPresentationMode ? "fixed" : "relative",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: isPresentationMode ? "white" : "initial",
            zIndex: isPresentationMode ? 1000 : "initial",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: isPresentationMode ? "hidden" : "initial",
          }}
        >
          {isPresentationMode && (
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
              {moment(currentDate).format("MMMM YYYY")}
            </h2>
          )}
          <Calendar
            localizer={localizer}
            date={currentDate}
            onNavigate={handleNavigate}
            defaultView="month"
            views={["month"]}
            events={events} // Pass fetched events to the calendar
            style={{
              height: isPresentationMode ? "80vh" : "500px",
              width: isPresentationMode ? "90vw" : "75%",
            }}
            toolbar={!isPresentationMode} // Only show the toolbar when not in presentation mode
            onSelectEvent={handleEventClick}
          />
        </div>
        <EventsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      </div>
    </>
  );
}