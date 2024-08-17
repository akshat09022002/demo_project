import { useRecoilValue, useSetRecoilState } from "recoil"
import { doctor_detail, timeSelector } from "../store/atoms/atom"
import { timer } from "../store/atoms/atom"


const TimePicker = () => {
    const setTime = useSetRecoilState(timeSelector);
    const closeTime = useSetRecoilState(timer);
    const currentDoctor = useRecoilValue(doctor_detail);
    const TimeRange = [...currentDoctor.timings, "All Slots"];
  
    return (
      <div className="absolute inset-0 z-50 flex justify-center items-center bg-opacity-30 backdrop-blur-sm max-h-screen max-w-screen">
        <div className="rounded-md bg-[#00c9b7] overflow-y-auto max-h-[50vh] ">
          {TimeRange.map((time, index) => {
            return (
              <div
                key={index}
                className="p-4 my-2 mx-4 border-[1px] rounded-md bg-white border-gray-200 cursor-pointer"
                onClick={() => {
                  setTime(time);
                  closeTime(false);
                }}
              >
                {time}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default TimePicker;
  