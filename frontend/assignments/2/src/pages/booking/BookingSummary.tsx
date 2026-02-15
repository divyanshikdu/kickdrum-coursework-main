import "./BookingSummary.scss";
interface BookingSummaryinterface {
    typeofCleaning: string;
    timeofCleaning: string;
    hours: number;
    date: string;
    time: string;
    fullName: string;
    address: string;
    totalCost: number;
}
function BookingSummary({typeofCleaning,timeofCleaning,hours,date,time,address,totalCost,}: 
    BookingSummaryinterface) {
    return (
    <div className="summary">
      <h3 className="summarytitle">Booking Summary</h3>

      <p>{typeofCleaning || "—"}</p>
      <p>{date ? `${date} @ ${time}` : "—"}</p>
      <p>{hours} hours</p>
      <p>{timeofCleaning || "—"}</p>
      <p>{address || "—"}</p>

      <div className="summarytotal">
        <span>Total cost-      </span>
        <b>${totalCost}</b>
      </div>
    </div>
  );
}
export default BookingSummary;