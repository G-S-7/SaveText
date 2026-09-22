import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../lib/axios.js";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]); 
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/login",
        { ...inputValue },
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
      console.error(error);
      handleError("Login failed");
    }
    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
  <div className="card w-full max-w-md shadow-xl bg-base-100">
    <div className="card-body">
      <h2 className="card-title text-center">Login Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter your email"
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
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
        <span className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Signup
          </Link>
        </span>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
