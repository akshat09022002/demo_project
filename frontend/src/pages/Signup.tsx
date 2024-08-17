import Signinform from "../components/Signinform";
import photo from "../assets/signupbg.svg";
import logo from "../assets/logo.png";
import { toast } from "../store/atoms/atom";
import { useRecoilState } from "recoil";
import { Toast } from "flowbite-react";
import { useEffect } from "react";

import { HiFire } from "react-icons/hi";

const Signup = () => {
  const [showToast, setShowToast] = useRecoilState(toast);
  console.log(showToast);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); 
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div
      style={{ backgroundImage: `url(${photo})` }}
      className="flex flex-col justify-center items-center h-screen w-full bg-no-repeat bg-cover"
    >
      {showToast && (
        <div className="absolute top-10 right-8 z-50">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Invalid Inputs</div>
            <Toast.Toggle
              className="ml-32"
              onDismiss={() => setShowToast(false)}
            />
          </Toast>
        </div>
      )}
      <div className="p-4 bg-[#07bebc] bg-opacity-25 min-w-1/2 min-h-1/2 max-h-[500px] max-w-[373px]">
        <div className="flex flex-row w-full mt-4 justify-center">
          <img src={logo} className="h-1/3 w-1/3"></img>
        </div>
        <div className="flex flex-row w-full justify-center my-4">
          <h1 className="text-[#07bebc] text-3xl font-bold">Login</h1>
        </div>
        <Signinform></Signinform>
      </div>
    </div>
  );
};

export default Signup;
