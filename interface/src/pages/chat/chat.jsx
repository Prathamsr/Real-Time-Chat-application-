import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../common.css";
import "./style.css";
import Contact from "../../components/contactContainer/contact";
import Welcome from "../../components/chatContainer/welcome";
import Chatfriend from "../../components/chatContainer/chatfriend/chatfriend";
import FindFriends from "../../components/chatContainer/searchContainer/findFriends";
import axios from "axios";
import Loader from "../../assets/loader.gif";
import { io } from "socket.io-client";
import { allUserRoute, host } from "../../utils/apiRoutes";
export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ id: "" });
  const [contacts, setContacts] = useState([]);
  const [currrentChat, setCurrentChat] = useState({ id: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("app-user")));
      if (currentUser.isAvatarset === false) {
        navigate("/setavatar");
      }
    }
  }, []);
  const getAllContacts = async () => {
    if (currentUser.id != "") {
      const { data } = await axios.post(allUserRoute, {
        id: currentUser._id,
      });
      setContacts(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    getAllContacts();
  }, [currentUser]);
  const handleChatChange = async (chat) => {
    setCurrentChat(await chat);
  };
  if (isLoading) {
    return (
      <div className="avatar-window-loader">
        <img src={Loader} alt="loader" className="loader" />
      </div>
    );
  } else {
    return (
      <div className="container">
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currrentChat.id == "" ? (
          <Welcome currentUser={currentUser} />
        ) : currrentChat.id == "friend" ? (
          <FindFriends currentUser={currentUser} 
          changeChat={handleChatChange} />
        ) : (
          <Chatfriend
            currentUser={currentUser}
            friendAccount={currrentChat}
            socket={socket}
          />
        )}
      </div>
    );
  }
}
