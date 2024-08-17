import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toast } from '../store/atoms/atom';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const Signinform = () => {
  const [phone,setPhone]=useState('');
  const [password,setPassword] = useState('');
  const navigate= useNavigate();
  const setShowToast = useSetRecoilState(toast);


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="mb-5 w-3/4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Phone No.
        </label>
        <input
          onChange={(e)=>{
            setPhone(e.target.value);
          }}
          type="phoneno"
          id="email"
          maxLength={10}
          pattern="\d{10}"
          className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="0123456789"
          required
        />
      </div>
      <div className="mb-5 w-3/4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your password
        </label>
        <input
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          placeholder="enter your password"
          type="password"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="flex flex-row justify-center w-full mb-5"></div>
      <button
        onClick={async ()=>{
          if(phone=='8888888888' && password=='123456'){
            navigate("/dashboard");
          }
          else{
            setShowToast(true);
          } 
        }}
        type="submit"
        className="text-white bg-[#07bebc] hover:bg-[#0cadac] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-1/2 text-sm px-5 py-2.5 text-center"
      >
        Sign in
      </button>
    </form>
  );
};

export default Signinform;
