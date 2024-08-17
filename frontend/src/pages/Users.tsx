import Sidebarr from "../components/Sidebarr";
import { FiAlignJustify } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { doctor_detail, docWindow, toggle_Drawer } from "../store/atoms/atom";
import { Dropdown } from "flowbite-react";
import doctor from "../assets/doctor.png";
import doctor2 from "../assets/doctor2.png";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const setdocwindow = useSetRecoilState(docWindow);
  const settoggledrawer = useSetRecoilState(toggle_Drawer);
  const currentDoctor = useRecoilValue(doctor_detail);

  return (
    <div className="max-h-screen max-w-screen">
      <Sidebarr />
      <div className="p-4 flex flex-row justify-between bg-[#00c9b7] z-30 h-16 w-full">
        <div>
          <button onClick={() => settoggledrawer(true)}>
            <FiAlignJustify className="text-3xl text-white hover:text-gray-300" />
          </button>
        </div>
        <div>
          <h1 className="text-white font-medium text-2xl">
            Users & Permissions
          </h1>
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
                  alt="Doctor"
                />
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

      {/* Users & Permissions Section */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 font-semibold text-xl">
            Users & Permissions
          </h2>
          <button onClick={()=>{
            navigate('/adduser');
          }} className="text-teal-500 font-semibold hover:underline">
            Add Staff
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col">
              <p className="text-gray-900 font-medium text-lg">Queuemate</p>
              <button className="text-teal-500 text-sm">All Permissions</button>
            </div>
            <a href="#" className="text-teal-500">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21 7L17 3 5 15v4h4L21 7zM3 17h18v2H3v-2z" />
              </svg>
            </a>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col">
              <p className="text-gray-900 font-medium text-lg">Joshua</p>
              <p className="text-teal-500 text-sm">All Permissions</p>
            </div>
            <a href="#" className="text-teal-500">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21 7L17 3 5 15v4h4L21 7zM3 17h18v2H3v-2z" />
              </svg>
            </a>
          </div>
          {/* Repeat the user-item div for each additional user */}
        </div>
      </div>
    </div>
  );
};

export default Users;
