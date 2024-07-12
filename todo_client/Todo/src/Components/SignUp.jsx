import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userdata;

  const handleinputchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/SignUp`,
        userdata
      );
      console.log(response.data);
      toast.success("Sign up successful!");
    } catch (err) {
      console.error(err);
      toast.error("Sign up failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleinputchange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleinputchange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleinputchange}
          />
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
