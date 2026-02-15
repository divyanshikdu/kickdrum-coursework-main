import "./ConfirmationPage.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function ConfirmationPage() {
  const booking = useSelector((state: RootState) => state.booking);

  return (
    <div className="confirmation">
      <div className="confirmationBox">

        <div className="confirmationsuccess">
          <h2>Your booking is confirmed!</h2>
          <p>Thank you for choosing Cleanly.</p>
        </div>

        <div className="confirmationsummary">
          <h3>Booking Summary</h3>
          <p>Cleaning Type: {booking.typeofCleaning}</p>
          <p>Frequency: {booking.timeofCleaning}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
          <p>Hours: {booking.hours}</p>
          <p>Name: {booking.fullName}</p>
          <p>Address: {booking.address}</p>
        </div>

      </div>
    </div>
  );
}

export default ConfirmationPage;
