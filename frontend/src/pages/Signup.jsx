import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import api from "../lib/axios";
import { useCookies } from "react-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]); 
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await api.post(
        "/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setCookie("token", data.token, { path: "/" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Signup
            </button>
            <span className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;