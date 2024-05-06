import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../common.css";
import "./style.css";
import Logo from "../../assets/logo-design.png";
import { registerRoute } from "../../utils/apiRoutes";
export default function RegisterUser() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    confPassword: "",
    userName: "",
    mail: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
  };
  useEffect(() => {
    if (localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, []);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, userName, mail } = values;
      const { data } = await axios.post(registerRoute, {
        userName,
        mail,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const { password, confPassword, userName, mail } = values;
    console.log(values);
    if (password != confPassword) {
      toast.error("Password and Confirm Password does not match", toastOptions);
      return false;
    } else if (userName.length < 5) {
      toast.error("Username should be atleast 5 characters long", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password should be atleast 5 characters long", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" className="logo" />
            <h1>Connect Sphere</h1>
          </div>
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="mail"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confPassword"
            required
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create User</button>
          <span>
            Already Have an account ?{" "}
            <Link to="/login" className="loginlink">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
