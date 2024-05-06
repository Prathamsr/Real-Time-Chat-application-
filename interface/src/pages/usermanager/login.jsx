import React, { useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../common.css";
import "./style.css";
import Logo from "../../assets/logo-design.png";
import { loginRoute } from "../../utils/apiRoutes";
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    userName: "",
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
      const { password, userName } = values;
      const { data } = await axios.post(loginRoute, {
        userName,
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
    const { password, userName } = values;
    if (userName.length === "") {
      toast.error("Username Require", toastOptions);
      return false;
    } else if (password.length === "") {
      toast.error("Password Require", toastOptions);
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
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Login</button>
          <span>
            New User ?{" "}
            <Link to="/register" className="loginlink">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
