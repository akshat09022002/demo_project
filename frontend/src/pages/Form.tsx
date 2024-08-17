import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import doctorImage1 from "../assets/doctor.png";
import doctorImage2 from "../assets/doctor2.png";
import { doctor_detail, toggle_Drawer, timeSelector, Appointments } from "../store/atoms/atom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#00c9b7',
    },
  },
});

const newTheme = (theme: any) =>
  createTheme({
    ...theme,
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: "white",
            borderRadius: "2px",
            borderWidth: "1px",
            borderColor: "#2196f3",
            border: "1px solid",
            backgroundColor: "#00c9b7",
          },
        },
      },
    },
  });

const Form = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments]: any = useRecoilState(Appointments);
  const currentDoctor = useRecoilValue(doctor_detail);
  const setTime = useSetRecoilState(timeSelector);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    reason: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const TimeRange = [...currentDoctor.timings];

  const isValidTime = (time: string) => {
    if (!selectedDate) return false; // No date selected, so time is not valid

    const now = dayjs();
    const [start, end] = time.split(" - ").map((t) => dayjs(t, "hh:mm a"));

    // Check if the selected date is today or in the future
    const isDateValid = selectedDate.isAfter(dayjs().startOf("day")) || selectedDate.isSame(dayjs().startOf("day"), "day");

    // If the selected date is today, check if the current time is before the end time
    const isTimeValid = isDateValid && (selectedDate.isAfter(dayjs().startOf("day")) || now.isBefore(end));

    return isTimeValid;
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleSelection = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Validate phone number
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        setPhoneError("Only numeric values are allowed.");
      } else if (value.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else {
        setPhoneError("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      Object.values(formData).every((value) => value.trim()) &&
      phoneError === "" &&
      formData.phone.length === 10
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Please complete all fields and select a date and time slot.");
      return;
    }

    const newAppointment = {
      doctor_name: currentDoctor.name,
      patient_name: formData.name,
      phone: formData.phone,
      address: formData.address,
      reason: formData.reason,
      date: selectedDate.format("MM-DD-YYYY"),
      timeSlot: selectedTime,
    };

    const newAppointments = [...appointments, newAppointment];
    setAppointments(newAppointments);
    localStorage.setItem("appointments", JSON.stringify(newAppointments));
    navigate("/dashboard");
  };

  return (
    <div className="">
      <div className="p-4 bg-[#00c9b7] z-30 h-16 w-full">
        <div className="flex flex-row justify-center">
          <h1 className="text-white font-medium text-2xl">Form</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-20 h-full">
        <div className="flex flex-row justify-center w-full">
          <img
            className="max-w-[300px] max-h-[300px] h-1/3 w-1/3"
            src={currentDoctor.name.includes("Joshua") ? doctorImage1 : doctorImage2}
          ></img>
        </div>
        <div className="mt-4 font-semibold">
          <h1 className="text-3xl">{currentDoctor.name}</h1>
        </div>
        <div>
          <h1 className="mt-4 font-medium text-xl">{currentDoctor.description}</h1>
        </div>
        <div>
          <h1 className="mt-4 font-medium text-lg">Fill form for Booking</h1>
        </div>
        <div className="w-full h-full pt-4 px-10 pb-10">
          <div className="p-4 bg-gray-300 w-full h-full">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-lg font-medium">Select Date & Slots</h1>
              <div className="z-50">
                <ThemeProvider theme={newTheme(baseTheme)}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker onChange={handleDateChange} label="MM/DD/YYYY" />
                    </DemoContainer>
                  </LocalizationProvider>
                </ThemeProvider>
              </div>

              <div className="mt-4 w-full">
                <h2 className="text-lg font-medium text-center mb-2">Available Slots</h2>
                <div className="p-4 rounded-md bg-gray-300">
                  {TimeRange.map((time, index) => {
                    const isValid = isValidTime(time);
                    return (
                      <div key={index} className={`flex items-center justify-center mb-2 ${isValid ? "" : "line-through text-gray-400"}`}>
                        <label className="flex items-center">
                          {time}
                          <input
                            type="checkbox"
                            name="timeSlot"
                            value={time}
                            disabled={!isValid}
                            checked={selectedTime === time}
                            onChange={() => handleSelection(time)}
                            className="ml-2"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full mt-10">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No."
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-2 border rounded"
            />
            {phoneError && <p className="text-red-500 text-sm mb-4">{phoneError}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              name="reason"
              placeholder="Reason for Booking"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-4 border rounded"
              rows={4}
            />
            <button
              onClick={handleSubmit}
              className={`w-2/5 p-2 text-white rounded ${
                !isFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-[#00c9b7] hover:bg-[#00b09b]"
              }`}
              disabled={!isFormValid()}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
