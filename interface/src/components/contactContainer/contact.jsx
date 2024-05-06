import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfCall from "../../assets/conference-call.png";
import "./style.css";
export default function Contact({ contacts, currentUser, changeChat }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserPhoto, setCurrentUserPhoto] = useState(null);
  const [currentSelected, setCurrrentSelected] = useState(undefined);
  const [currentContacts, setCurrentcontacts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const changeCurrentContacts = (event) => {
    const search = event.target.value;
    const search_len = search.length;
    const data = [];
    if (search.length != 0) {
      for (let i of contacts.users) {
        if (
          i.username.slice(0, search_len).toLowerCase() == search.toLowerCase()
        ) {
          data.push(i);
        }
      }
      setCurrentcontacts(data);
    } else {
      setCurrentcontacts(contacts.users);
    }
  };
  useEffect(() => {
    setCurrentcontacts(contacts.users);
  }, []);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserPhoto(currentUser.avatar);
    }
  }, []);
  const handleChangeInSelection = async (index) => {
    changeChat(currentContacts[index]);
    setCurrrentSelected(currentContacts[index]);
  };
  const handleMenuChange = () => {
    setMenuOpen(!menuOpen);
  };
  const handleNewFriends = () => {
    changeChat({ id: "friend" });
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="contact-window">
      <div className="search-name">
        <div className="search-name-chat">
          <input
            type="text"
            className="search-input"
            onChange={(event) => changeCurrentContacts(event)}
          />
        </div>
        <img src={ConfCall} alt="" className="search-img-chat" />
      </div>
      <div className="contacts-section">
        {currentContacts.map((person, index) => {
          return (
            <div
              key={index}
              className={`contact ${
                currentSelected === currentContacts[index]
                  ? "selected-contact"
                  : ""
              }`}
              onClick={() => handleChangeInSelection(index)}
            >
              <div className="contact-img">
                <img src={person.avatar} alt="" className="contact-pic" />
              </div>
              <div className="contact-name">{person.username}</div>
            </div>
          );
        })}
      </div>
      <div className="profile-section">
        <img src={currentUserPhoto} alt="" className="profile-pic" />
        <div className="profile-name">{currentUserName}</div>
        <div className="menu">
          <div className="dots" onClick={() => handleMenuChange()}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className={`menu-buttons ${menuOpen ? "set-menu-change" : ""}`}>
            <button
              className="menu-button"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
            <button
              className="menu-button"
              onClick={() => {
                navigate("/setavatar");
              }}
            >
              New Avatar
            </button>
            <button
              className="menu-button"
              onClick={() => {
                handleNewFriends();
              }}
            >
              Add Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
