"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventsModal from "../components/EventsModal";

const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => {
  const startTime = moment(event.start).format('h:mm A');
  return (
    <span>
      <strong>{event.title}</strong> @ {startTime}
    </span>
  );
};

const Events = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [events, setEvents] = useState([]); // set up events correctly for updates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(3); // Default to 3 months
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const presentationRef = useRef(null); // Ref for full-screen container
  const [loading, setLoading] = useState(true);
  
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Fetch events from backend API on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
  
        
        const response = await fetch("/api/events");
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        console.log("Fetched data:", data);
  
        // clearly use data.events instead of just data
        const formattedEvents = data.events.map((event) => ({
          start: new Date(event.start),
          end: new Date(new Date(event.start).setHours(new Date(event.start).getHours() + 1)),
          title: event.summary,
          description: event.description || "No Description",
          location: event.location || "",
        }));
  
        console.log("Formatted events:", formattedEvents);
  
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchEvents();
  }, []);
  
  

  //Ensures client-side rendering for components requiring DOM manipulation
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle the date change in presentation mode
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
      }, 15000); // Change month every 15 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPresentationMode, selectedMonths]); // Include selectedMonths in dependency array

  // Key event listeners for additional functionalities
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();

      // Check for Esc to exit presentation mode
      if (event.key === "Escape") {
        if (isPresentationMode) {
          exitPresentation();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPresentationMode]);

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const startPresentation = () => {
    setIsPresentationMode(true);
    setCurrentDate(new Date()); // Reset to the current date for the presentation

    // Request full-screen mode for the presentation container
    if (presentationRef.current?.requestFullscreen) {
      presentationRef.current.requestFullscreen().catch((error) => {
        console.error("Failed to enter full-screen mode:", error);
      });
    }
  };

  const exitPresentation = () => {
    setIsPresentationMode(false);

    // Exit full-screen mode
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((error) => {
        console.error("Failed to exit full-screen mode:", error);
      });
    }
  };

  if (!isClient) return null; // Ensures server-side rendering works without client-specific code errors

  return (
    <>
      <div className="mt-10 ms-10 text-center lg:text-left">
        <h2 className="font-semibold font-serif text-5xl">Events</h2>
      </div>

      <div className="pt-20 lg:w-1/2 gap-4 lg:mx-auto mx-5">
        {loading ? (
          // Loading Skeleton
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8">
                <div className="col-span-1 text-center text-white py-2 bg-gray-300 rounded-l-xl ">
                  <div className="h-8 bg-gray-400 rounded w-3/4 mx-auto mt-2"></div>
                  <div className="h-12 bg-gray-400 rounded w-3/4 mx-auto mt-2"></div>
                </div>
                <div className="col-span-5 ms-5">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mt-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {/* Events */}
            {events.slice(0, 6).map((event, index) => (
              <div key={index} className="grid grid-cols-6 shadow-xl bg-gray-50 rounded-xl mb-8">
                <div className="col-span-1 text-center text-white py-2 bg-red-500 rounded-l-xl ">
                  {/* Display Month and Date from event.start */}
                  <h4>{moment(event.start).format("MMM")}</h4>
                  <h4 className="text-4xl font-semibold">
                    {moment(event.start).format("D")}
                  </h4>
                </div>
                <div className="col-span-5 ms-5">
                  {/* Display title and description */}
                  <h3 className="font-bold text-2xl">{event.title} @ {moment(event.start).format("ha")}</h3>
                  {event.description === "No Description" ? null : (
                    <p className="text-gray-600">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={presentationRef} style={{ textAlign: "center" }}>
        <div
          style={{
            position: isPresentationMode ? "fixed" : "relative",
            top: 0,
            left: 0,
            width: "100vw",
            height: isPresentationMode ? "100vh" : "auto",
            backgroundColor: isPresentationMode ? "white" : "initial",
            zIndex: isPresentationMode ? 1000 : "initial",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: isPresentationMode ? "hidden" : "initial",
          }}
        >
          {isPresentationMode && (
            <>
              <h2 style={{ fontSize: "2rem", position: 'absolute', top: '10%' }}>
                {moment(currentDate).format("MMMM YYYY")}
              </h2>
              <div
                style={{
                  display: isPresentationMode ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", // Changed from column to row
                  position: "absolute",
                  bottom: 10,
                  width: "100%",
                  zIndex: 1001,
                }}
              >
                <p className="font-semibold italic text-3xl mr-4">Powered by</p>
                <img src="/Img/VaLogo.png" alt="Visionary Advance Logo" className="w-44" />
              </div>
            </>
          )}
          
          <Calendar
            localizer={localizer}
            date={currentDate}
            onNavigate={handleNavigate}
            defaultView="month"
            views={["month"]}
            events={events}
            style={{
              position: isPresentationMode ? "absolute" : "relative", // Position the calendar absolutely in presentation mode
              top: isPresentationMode ? "15%" : "initial", // Adjust the calendar's vertical position in presentation mode
              height: isPresentationMode ? "65vh" : "500px",
              width: isPresentationMode ? "85vw" : "90%",
              zIndex: isPresentationMode ? 999 : "initial", // Ensure the calendar stays on top in presentation mode
            }}
            toolbar={!isPresentationMode}
            onSelectEvent={handleEventClick}
            components={{
              event: EventComponent,
            }}
          />
          {!isPresentationMode && (
            <button
              onClick={startPresentation}
              className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded"
            >
              Start
            </button>
          )}
        </div>
        <EventsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      </div>
    </>
  );
};

export default Events;
