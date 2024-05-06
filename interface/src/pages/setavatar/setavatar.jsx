import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import Loader from "../../assets/loader.gif";
import Reload from "../../assets/refresh.png";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../common.css";
import "./style.css";
import { avatarRoute } from "../../utils/apiRoutes";
export default function Setavatar() {
  const imgApi = "https://api.multiavatar.com/";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
  };
  const navigate = useNavigate();
  const reloadAvatars = () => {
    setIsLoading(true);
    getAvatarsfromweb();
  };
  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === "") {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("app-user"));
      console.log(user,avatars[selectedAvatar]);
      const { data } = await axios.post(`${avatarRoute}`, {
        id: user._id,
        image: avatars[selectedAvatar],
      });
      if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error("Something went wrong, try again", toastOptions);
      }
    }
  };
  const getAvatarsfromweb = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      try {
        const image = await axios.get(
          `${imgApi}${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(`data:image/svg+xml;base64,${buffer.toString("base64")}`);
      } catch (ex) {
        i--;
      }
    }
    setAvatars(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAvatarsfromweb();
  }, []);
  if (isLoading) {
    return (
      <div className="avatar-window-loader">
        <img src={Loader} alt="loader" className="loader" />
      </div>
    );
  } else {
    return (
      <div className="avatar-window">
        <div className="title-container">
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="avatar-img"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <div className="new-avatars-div">
          <button className="reload" onClick={reloadAvatars}>
            <img src={Reload} className="new-avatars" alt="" />
          </button>
        </div>
        <div className="btn-bar">
          <button
            className="submit-btn"
            onClick={() => {
              navigate("/upload");
            }}
          >
            Upload Picture
          </button>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
