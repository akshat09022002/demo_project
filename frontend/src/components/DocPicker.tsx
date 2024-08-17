import { useSetRecoilState } from "recoil";
import Doctor from "../assets/doctor.png";
import Doctor2 from "../assets/doctor2.png";
import { doctor_detail,docWindow } from "../store/atoms/atom";

const DocPicker = () => {
  const changeDoctor = useSetRecoilState(doctor_detail);
  const docwindowstatus= useSetRecoilState(docWindow);

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

  return (
    <div className="absolute inset-0 z-50 flex justify-center items-center bg-opacity-30 backdrop-blur-sm max-h-screen max-w-screen">
      <div className="flex flex-col items-center rounded-md bg-[#00c9b7] overflow-y-auto h-[412px] w-screen sm:w-screen max-w-screen md:max-w-[600px]">
        <div className="text-3xl mt-8 text-white font-bold">Switch User</div>
        <div className="w-full">
          
          {//@ts-ignore
          doctors.map((doctor: any, index: any) => {
            return (
             <button onClick={()=>{
                changeDoctor(doctor);
                docwindowstatus(false);
                localStorage.setItem('current_doctor',JSON.stringify(doctor));
             }}>
                <div className="flex flex-row mt-12">
                <div className="ml-8">
                  <img
                    className="h-[100px] w-[100px]"
                    src={doctor.name.includes("Joshua") ? Doctor : Doctor2}
                  ></img>
                </div>
                <div className="ml-28 text-white text-2xl flex flex-col justify-center">{doctor.name}</div>
              </div>
             </button>   
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocPicker;
