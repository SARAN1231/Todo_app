import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Authcontext } from "./ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { setauthuser } = useContext(Authcontext);
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userdata;

  const handleinputchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handlsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/Login`,
        userdata
      );
      setauthuser(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
       const initialauthuser = localStorage.getItem("users");
      const user = JSON.parse(initialauthuser);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate(`/${user.id}`);
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handlsubmit}>
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
