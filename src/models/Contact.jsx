<<<<<<< HEAD
import React from "react";
import Button from "../layouts/Button";

const Contact = ({ closeForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form className=" w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Book Now
          </h1>
          <div className=" flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="text"
              name="userFirstName"
              id="userFirstName"
              placeholder="First Name"
            />
          </div>
          <div className=" flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="text"
              name="userLastName"
              id="userLastName"
              placeholder="Last Name"
            />
          </div>
          <div className=" flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Your Email"
            />
          </div>
          <div className=" flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="number"
              name="userNumber"
              id="userNumber"
              placeholder="Phone No."
            />
          </div>
          <div className=" flex gap-5">
            <Button title="Book Appointment" />
            <button
              className=" bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
=======
import React, { useState } from "react";
import Button from "../layouts/Button";

const Contact = ({ closeForm }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const validPhonePrefixes = ["03", "05", "07", "08", "09"];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const isValidPhoneNumber = () => {
    return phoneNumber.length === 10 && validPhonePrefixes.includes(phoneNumber.substring(0, 2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber()) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        closeForm();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup-form relative w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-black">Book Now</h1>
        {bookingSuccess ? (
          <p className="text-green-500 text-lg font-semibold text-center">Your booking has been received!</p>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                name="userFirstName"
                id="userFirstName"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                name="userLastName"
                id="userLastName"
                placeholder="Last Name"
              />
            </div>
            <div className="flex flex-col">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Your Email"
              />
            </div>
            <div className="flex flex-col">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                name="userNumber"
                id="userNumber"
                placeholder="Phone No."
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="10"
              />
              {!isValidPhoneNumber() && phoneNumber.length > 0 && (
                <p className="text-red-500 text-sm">Invalid phone number format</p>
              )}
            </div>
            <div className="flex gap-5">
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                type="submit"
                disabled={!isValidPhoneNumber()}
              >
                Send Booking
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                type="button"
                onClick={closeForm}
              >
                Close
              </button>
            </div>
          </form>
        )}
>>>>>>> quynh-hoa1
      </div>
    </div>
  );
};

export default Contact;
