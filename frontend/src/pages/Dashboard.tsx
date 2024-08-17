import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiAlignJustify } from "react-icons/fi";
import { useEffect} from "react";
import doctor from "../assets/doctor.png";
import doctor2 from "../assets/doctor2.png";
import Sidebarr from "../components/Sidebarr";
import { useRecoilState, useSetRecoilState,useRecoilValue } from "recoil";
import {
  Appointments,
  doctor_detail,
  docWindow,
  toggle_Drawer,
  filteredAppointmentsSelector,
  selectedDateState,
  booking,
  current_app
} from "../store/atoms/atom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { timer, timeSelector } from "../store/atoms/atom";
import TimePicker from "../components/TimePicker";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import logo from "../assets/createAppoint.svg";
import EditIcon from "@mui/icons-material/Edit";
import { Dropdown } from "flowbite-react";
import DocPicker from "../components/DocPicker";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#00c9b7",
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

const Dashboard = () => {
  const navigate = useNavigate();
  const doctors: any = [
    {
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
    {
      name: "Dr. Stephanie Graff - MBS",
      description:
        "Fellowship Leukemia and Bone Marrow Transplantation, University of British Columbia Fellowship Pediatric BMT , Children’s Hospital , Los Angeles FRACP , Medical Oncology",
      timings: [
        "09:00 am - 12:30 pm",
        "02:00 pm - 04:00 pm",
        "06:00 pm - 08:00 pm",
      ],
    },
  ];
  const [docwindow, setdocwindow]: any = useRecoilState(docWindow);
  const [currentDoctor, setCurrentDoctor] = useRecoilState(doctor_detail);
  const settoggledrawer = useSetRecoilState(toggle_Drawer);
  const [timervalue, timerVisible] = useRecoilState(timer);
  const currentTime = useRecoilValue(timeSelector);
  let filteredAppointments = useRecoilValue(filteredAppointmentsSelector);
  const setSelectedDate = useSetRecoilState(selectedDateState);
  const nobooking= useRecoilValue(booking);
  const setAppointments: any = useSetRecoilState(Appointments);
  const setCurrent_appointment: any=useSetRecoilState(current_app);

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      setAppointments([]);
    }

    const retrieve_doctor = localStorage.getItem("current_doctor");
    if (retrieve_doctor) {
      setCurrentDoctor(JSON.parse(retrieve_doctor));
    } else {
      setCurrentDoctor(doctors[0]);
    }
  }, []);


  return (
    <>
      {timervalue ? <TimePicker></TimePicker> : null}
      {docwindow ? <DocPicker></DocPicker> : null}
      <div className="max-h-screen max-w-screen">
        <Sidebarr></Sidebarr>
        <div className="p-4 flex flex-row justify-between bg-[#00c9b7] z-30 h-16 w-full">
          <div>
            <button
              onClick={() => {
                settoggledrawer(true);
              }}
            >
              <FiAlignJustify className="text-3xl text-white hover:text-gray-300" />
            </button>
          </div>
          <div>
            <h1 className="text-white font-medium text-2xl">Home</h1>
          </div>
          <Dropdown
            className="h-32 w-32 flex flex-col justify-center items-center"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="flex flex-rows items-center">
                <div className="mx-2">
                  <h1 className=" text-white font-medium">
                    {currentDoctor.name}
                  </h1>
                </div>
                <div className="mt-2 ml-4">
                  <img
                    src={
                      currentDoctor.name.includes("Joshua") ? doctor : doctor2
                    }
                    className="h-12"
                  ></img>
                </div>
              </div>
            )}
          >
            <Dropdown.Item
              onClick={() => setdocwindow(true)}
              className="w-full text-md mb-4"
            >
              Switch Account
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => navigate("/")}
              className="w-full text-md"
            >
              Log Out
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="p-4 flex flex-row justify-between w-screen">
          <div className="flex flex-row">
            <div className="mr-3 ">
              <ThemeProvider theme={newTheme(baseTheme)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      onChange={(e) => {
                        const formattedDate:any = e?.format("MM/DD/YYYY");
                        setSelectedDate(formattedDate);
                      }}
                      label="MM/DD/YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ThemeProvider>
            </div>
            <span
              onClick={() => {
                timerVisible(true);
              }}
              className="flex flex-col justify-center items-center p-2 mt-2 border-[1.32px] border-gray-300 rounded-md w-[180px] h-[56px]"
            >
              {currentTime}
            </span>
          </div>
          <div className="mt-4">
            <button
              className="flex flex-row py-1 pl-2  rounded-md  justify-center items-center hover:bg-gray-200"
              onClick={() => {
                window.location.reload();
              }}
            >
              <div>
                <RefreshIcon className="text-[#00c9b7] mr-1"></RefreshIcon>
              </div>
              <div className="text-[#00c9b7]">Refresh</div>
            </button>
          </div>
        </div>
        <div className="h-full w-full px-10 ">
          <div className="min-h-[300px] max-h-[600px] border-2 overflow-auto">
          {nobooking ? <div className="flex flex-col justify-center items-center text-2xl font-light text-black h-[300px] w-full">No bookings found</div> :
            <div>
              {filteredAppointments.map((app: any, index: any) => {
              
              return (
                <div
                  key={index}
                  className="border-b-[1px] p-4 flex flex-row justify-between"
                >
                  <div>
                    <div className="text-xl">{app.patient_name}</div>
                    <div className="text-lg">+91{app.phone}</div>
                    <div className="flex flex-row">
                      <div className="mr-2 text-lg font-medium">{app.date}</div>
                      <div className="text-lg font-medium">{app.timeSlot}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center ">
                    <div className="bg-[#f8d4f0] p-1 rounded-2xl text-[#9c2085]">
                      BOOKED
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-[#00c9b7]">
                    <Dropdown
                      className="flex flex-col justify-center items-center h-14 w-32"
                      label=""
                      dismissOnClick={true}
                      renderTrigger={() => <EditIcon className="" />}
                    >
                      <Dropdown.Item onClick={()=>{
                        setCurrent_appointment(app);
                        navigate('/details');
                      }}>Show Details</Dropdown.Item>
                      <Dropdown.Item>View Invoice</Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              );
            })}
            </div>
            
          }
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/Form");
              }}
              className="absolute mb-6 mr-6 bottom-0 end-0"
            >
              <img src={logo}></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
