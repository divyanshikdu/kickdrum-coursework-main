import "./BookingPage.scss";
import BookingSummary from "./BookingSummary";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setTypeofCleaning,setTimeofCleaning,setBedrooms,setBathrooms,toggleExtra,setDate,setTermsAccepted,
  setTime,setHours,setFullName,setEmail,setPhone,setAddress,setCardNumber,setExpiry,setCvv,setCardName,
} from "../../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import { setConfig } from "../../store/bookingSlice";
import { useEffect } from "react";

function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector((state: RootState) => state.booking);
  //config part-
  useEffect(() => {
  async function loadConfig() {
    try {
      const res = await fetch(
        "https://2ufgqjdd41.execute-api.ap-south-1.amazonaws.com/dev/config"
      );
      const data = await res.json();
      dispatch(setConfig(data));
    } catch (e) {
      console.error("Config load failed", e);
    }
  }

  loadConfig();
}, [dispatch]);

  // total cost calculation
  function totalcost() {
    let cost = 0;

    if (booking.typeofCleaning === "standard") cost = 30;
    else if (booking.typeofCleaning === "deep") cost = 50;
    else if (booking.typeofCleaning === "move in/out") cost = 70;

    const cleaningcost = cost * booking.hours;

    let extracost = 0;
    if (booking.extra.Oven) extracost += 10;
    if (booking.extra.Fridge) extracost += 5;
    if (booking.extra.Windows) extracost += 15;

    const roomCost = booking.bedrooms * 5 + booking.bathrooms * 2;

    return cleaningcost + extracost + roomCost;
  }
  const isFormValid =booking.typeofCleaning &&booking.timeofCleaning &&booking.date &&booking.time &&
  booking.fullName &&booking.email &&booking.phone.length === 10 &&booking.address &&
  booking.cardNumber.length === 16 &&booking.expiry &&booking.cvv.length === 3 &&booking.cardName &&booking.termsAccepted;
    async function handleCompleteBooking() {
    try {
      const response = await fetch(
        "https://2ufgqjdd41.execute-api.ap-south-1.amazonaws.com/dev/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        }
      );

      if (!response.ok) throw new Error("Booking failed");

      navigate("/confirmation");
    } catch (error) {
      alert("Something went wrong while booking");
      console.error(error);
    }
  }
  if (booking.loading) {
  return <div style={{ padding: 40 }}>Loading configuration...</div>;
}

  return (
    <div className="booking">
      <div className="bookingbox">
        <div className="bookingform">

          <h2 className="bookingtitle">What type of Cleaning</h2>
          
    <div className="bookingtimegrid">
        {["standard", "deep", "move in/out"].map((type) => 
        (<button key={type} type="button" className={booking.typeofCleaning === type ? "active" : ""}
        onClick={() => dispatch(setTypeofCleaning(type))}>{type}
    </button>
  ))}
</div>
    <h2 className="bookingtitle">Cleaning Frequency</h2>

    <div className="bookingtimegrid">
        {["onetime", "weekly", "biweekly", "monthly"].map((f) => (
    <button key={f} type="button" className={booking.timeofCleaning === f ? "active" : ""}
    onClick={() => dispatch(setTimeofCleaning(f))}>{f} </button>))}
</div>
          <h2 className="bookingtitle">Home Details</h2>
          <div className="roomdetails">
          <label>
            Bedrooms:
            <input
              type="number"
              min="0"
              value={booking.bedrooms}
              onChange={(e) => dispatch(setBedrooms(Number(e.target.value)))}
            />
          </label>
         

          <label>
            Bathrooms:
            <input
              type="number"
              min="0"
              value={booking.bathrooms}
              onChange={(e) => dispatch(setBathrooms(Number(e.target.value)))}
            />
          </label>
           </div>

          <div className="bookingextras">
            <label>
              <input
                type="checkbox"
                checked={booking.extra.Oven}
                onChange={() => dispatch(toggleExtra("Oven"))}
              />
              Oven
            </label>

            <label>
              <input
                type="checkbox"
                checked={booking.extra.Fridge}
                onChange={() => dispatch(toggleExtra("Fridge"))}
              />
              Fridge
            </label>

            <label>
              <input
                type="checkbox"
                checked={booking.extra.Windows}
                onChange={() => dispatch(toggleExtra("Windows"))}
              />
              Windows
            </label>
          </div>

          {/* Hours & Date */}
          <h2 className="bookingtitle">Choose hours and dates</h2>

          <div className="bookingextras">
            <label>
              How many hours?
              <input
                type="number"
                min="1"
                value={booking.hours}
                onChange={(e) => dispatch(setHours(Number(e.target.value)))}
              />
            </label>

            <label>
              Choose a date:
              <input
                type="date"
                value={booking.date}
                onChange={(e) => dispatch(setDate(e.target.value))}
              />
            </label>
          </div>

          <div className="bookingtime">
            <p>When do you like to start?</p>

            <div className="bookingtimegrid">
              {[
                "7:00 AM",
                "9:00 AM",
                "11:00 AM",
                "1:00 PM",
                "3:00 PM",
                "5:00 PM",
                "7:00 PM",
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={booking.time === slot ? "active" : ""}
                  onClick={() => dispatch(setTime(slot))}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <h2 className="bookingtitle">Personal Details</h2>

          <div className="bookingpersonal">
            <input
              placeholder="Full Name"
              value={booking.fullName}
              onChange={(e) => dispatch(setFullName(e.target.value))}
            />

            <input
              type="email"
              placeholder="Email"
              value={booking.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <input
              type="tel"
              maxLength={10}
              placeholder="Phone"
              value={booking.phone}
              onChange={(e) => dispatch(setPhone(e.target.value))}
            />

            <textarea
              rows={3}
              placeholder="Address"
              value={booking.address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />
          </div>

          {/* Payment */}
          <h2 className="bookingtitle">Payment Details</h2>

          <div className="payment">
            <input
              placeholder="Card Number"
              maxLength={16}
              value={booking.cardNumber}
              onChange={(e) =>
                dispatch(setCardNumber(e.target.value.replace(/\D/g, "")))
              }
            />

            <div className="paymentrow">
              <input
                type="date"
                value={booking.expiry}
                onChange={(e) => dispatch(setExpiry(e.target.value))}
              />

              <input
                placeholder="CVV"
                maxLength={3}
                value={booking.cvv}
                onChange={(e) =>
                  dispatch(setCvv(e.target.value.replace(/\D/g, "")))
                }
              />
            </div>

            <input
              placeholder="Name on Card"
              value={booking.cardName}
              onChange={(e) => dispatch(setCardName(e.target.value))}
            />
          </div>
         <div className="terms">
  <label>
    <input
      type="checkbox"
      checked={booking.termsAccepted}
      onChange={(e) => dispatch(setTermsAccepted(e.target.checked))}
    />
    I read and agree to the terms & conditions
  </label>
</div>

<button
  className="completeBtn"
  disabled={!isFormValid}
  onClick={handleCompleteBooking}>
  Complete Booking via Secure Server
</button>
        </div>
        <div className="bookingsummary">
          <BookingSummary
            typeofCleaning={booking.typeofCleaning}
            timeofCleaning={booking.timeofCleaning}
            hours={booking.hours}
            date={booking.date}
            time={booking.time}
            fullName={booking.fullName}
            address={booking.address}
            totalCost={totalcost()}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
