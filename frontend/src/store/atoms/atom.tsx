import { atom, selector } from "recoil";

export const registerUser:any= atom({
  key:"registerUser",
  default: false
})

export const users_entry= atom({
  key:"users_entry",
  default:[{
    name:"Queuemate",
    phone:"9999999999",
    email:"queuemate@gmail.com",
    password:"queuemate",
    confirmPassword:"queuemate"
  },{
    name:"Joshua",
    phone:"1111111111",
    email:"joshua@gmail.com",
    password:"joshua",
    confirmPassword:"joshua"
  }]
})

export const current_app = atom({
  key: "current-app",
  default: {
    address: "",
    date: "",
    doctor_name: "",
    patient_name: "",
    phone: "",
    reason: "",
    timeSlot: "",
  },
});

export const toast = atom({
  key: "toast",
  default: false,
});

export const selectedDateState = atom({
  key: "selectedDateState",
  default: "", 
});

export const docWindow = atom({
  key: "docWindow",
  default: false,
});

export const Appointments: any = atom({
  key: "Appointments",
  default: [],
});

export const signinpop = atom({
  key: "signinpop",
  default: false,
});

export const toggle_Drawer = atom({
  key: "toggleDrawer",
  default: false,
});

export const timeSelector = atom({
  key: "timeSelector",
  default: "All Slots",
});

export const timer = atom({
  key: "timer",
  default: false,
});

export const doctor_detail = atom({
  key: "doctor_detail",
  default: {
    name: "Dr. Joshua - OBS",
    description:
      "Orthopaedics,MBBS,(M.A.M.C.)M.S. (Ortho),Mch (Ortho)Gold medalist",
    timings: [
      "09:00 am - 09:15 am",
      "09:15 am - 09:30 am",
      "09:30 am - 09:45 am",
      "09:45 am - 10:00 am",
      "10:00 am - 10:15 am",
      "10:15 am - 10:30 am",
      "10:30 am - 10:45 am",
      "10:45 am - 11:00 am",
      "11:00 am - 11:15 am",
      "11:15 am - 11:30 am",
      "11:30 am - 11:45 am",
      "11:45 am - 12:00 pm",
      "12:00 pm - 12:15 pm",
      "12:15 pm - 12:30 pm",
      "02:00 pm - 02:15 pm",
      "02:15 pm - 02:30 pm",
      "02:30 pm - 02:45 pm",
      "02:45 pm - 03:00 pm",
      "03:00 pm - 03:15 pm",
      "03:15 pm - 03:30 pm",
      "03:30 pm - 03:45 pm",
      "03:45 pm - 04:00 pm",
      "04:00 pm - 04:15 pm",
      "04:15 pm - 04:30 pm",
      "04:30 pm - 04:45 pm",
      "04:45 pm - 05:00 pm",
      "06:00 pm - 06:15 pm",
      "06:15 pm - 06:30 pm",
      "06:30 pm - 06:45 pm",
      "06:45 pm - 07:00 pm",
      "07:00 pm - 07:15 pm",
      "07:15 pm - 07:30 pm",
      "07:30 pm - 07:45 pm",
      "07:45 pm - 08:00 pm",
      "08:00 pm - 08:15 pm",
      "08:15 pm - 08:30 pm",
    ],
  },
});

export const filteredAppointmentsSelector = selector({
  key: "filteredAppointmentsSelector",
  get: ({ get }) => {
    const allAppointments: any = get(Appointments);
    const currentDoctor = get(doctor_detail);
    const selectedTimeSlot = get(timeSelector);
    const selectedDate = get(selectedDateState);

    const mappedAppointments = allAppointments.map((app: any) => {
      const matchesDoctor = app.doctor_name === currentDoctor.name;

      const appDate = new Date(app.date).toLocaleDateString("en-US");
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
        "en-US"
      );

      const matchesDate =
        selectedDate === "" ? true : appDate === formattedSelectedDate;
      const matchesTimeSlot =
        selectedTimeSlot === "All Slots"
          ? true
          : app.timeSlot === selectedTimeSlot;

      return matchesDoctor && matchesDate && matchesTimeSlot ? app : null;
    });

    return mappedAppointments.filter((app: any) => app !== null);
  },
});

export const booking = selector({
  key: "booking",
  get: ({ get }) => {
    const array = get(filteredAppointmentsSelector);
    if (array.length > 0) {
      return false;
    } else {
      return true;
    }
  },
});
