import Form from "../components/Form";

export default function Contact() {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 text-center">
            <h2 className="font-bold text-4xl mt-5">Contact Us</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 mt-10">
            {/* HOURS */}
            <div className="col-span-1">
                <p className="font-bold text-2xl">Hours:</p>
            <ul className=" me-auto">
              <li>Sunday: 10 AM–6 PM</li>
              <li>Monday: Closed</li>
              <li>Tuesday: 11 AM–8 PM</li>
              <li>Wednesday: 11 AM–8 PM</li>
              <li>Thursday: 11 AM–9 PM</li>
              <li>Friday: 11 AM–9 PM</li>
              <li>Saturday: 11 AM–9 PM</li>
            
            </ul>
            </div>
            <div className="col-span-1">
                <p className="font-bold text-2xl">Location:</p>
            {/* LOCATION */}
            <p>Address: 4425 Main St, Springfield, OR 97478</p>
          </div>
          </div>
          </div>
    
          <div className="col-span-1">
            <Form />
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5735.6731181048!2d-122.9607600243209!3d44.045431526975094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c0e0939f244f03%3A0x7bc8c0a460bb73bf!2sSweet%20Salvage%2F%20The%20Sweet%20Market%20%26%20Food%20truck%20Pavilion!5e0!3m2!1sen!2sus!4v1730054967015!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
