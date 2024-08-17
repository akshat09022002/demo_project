import { useRecoilValue } from "recoil";
import doctor from "../assets/doctor.png";
import doctor2 from "../assets/doctor2.png";
import { current_app } from "../store/atoms/atom";

const Details = () => {
  const curr_app = useRecoilValue(current_app);
  console.log(curr_app);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-teal-500 w-full py-4 text-center text-white font-bold text-lg">
        Details
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full mt-8 flex-grow">
        <div className="flex justify-center mb-4">
          <img
            src={curr_app.doctor_name.includes("Joshua") ? doctor : doctor2}
            alt="Doctor"
            className="rounded-full border-gray-300 border-2 w-40 h-40"
          />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Booking for:</h2>
          <p className="text-lg font-medium text-gray-700">
            {curr_app.doctor_name}
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Name:</strong> {curr_app.patient_name}
          </p>
          <p>
            <strong>Phone Number:</strong> {curr_app.phone}
          </p>
          <p>
            <strong>Address:</strong> {curr_app.address}
          </p>
          <p>
            <strong>Reason:</strong> {curr_app.address}
          </p>
          <p>
            <strong>Status:</strong>
            <span className="ml-2 text-teal-500 font-semibold">BOOKED</span>
          </p>
        </div>

        <div className="mt-6 text-center bg-red-200 text-red-600 py-2 rounded-md">
          Your Number: 1
        </div>

        <div className="mt-4 text-center">
          <p>
            <strong>Date & Slot:</strong>
          </p>
          <p>
            {curr_app.date} & {curr_app.timeSlot}
          </p>
        </div>

        <div className="mt-4 text-center">
          <p>
            <strong>Venue Address:</strong>
          </p>
          <p>
            A-130, Block A, Sector 63, Noida, U.P, India Sector-76, Noida 201301
            Uttar Pradesh
          </p>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">
            Get Directions on Map
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500">
          <p>For assistance call at:</p>
          <p>+91-789034343</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
