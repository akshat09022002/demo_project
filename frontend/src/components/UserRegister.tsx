import { useState } from "react";
import { registerUser, users_entry } from "../store/atoms/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [user_list,setUsers]=useRecoilState(users_entry);
  const registeruserwin= useSetRecoilState(registerUser);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      const newuser_list:any=[...user_list,formData];
      setUsers(newuser_list);
      localStorage.setItem('users',JSON.stringify(newuser_list));
      registeruserwin(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex justify-center items-center bg-opacity-30 backdrop-blur-sm max-h-screen max-w-screen">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
