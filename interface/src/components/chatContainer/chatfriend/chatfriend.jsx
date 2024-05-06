import React, { useEffect, useState } from "react";
import "./style.css";
import Call from "../../../assets/video-chat (4).png";
import ChatSection from "./chatSection";
import ChatInput from "./chatInput";
export default function Chatfriend({ currentUser, friendAccount, socket }) {
  const [selfMessage, setSelfMessage] = useState({
    message: "",
    fromSelf: true,
  });
  const selfMessageSend = (msg) => {
    setSelfMessage({
      message: msg,
      fromSelf: true,
    });
  };
  useEffect(() => {
    console.log(selfMessage);
  }, [selfMessage]);
  return (
    <div className="chat-container">
      <div className="friend-part">
        <div className="img-name-friend">
          <img src={friendAccount.avatar} alt="" className="friend-img" />
          <div className="friend-name">{friendAccount.username}</div>
        </div>
        <div className="friend-call">
          <img src={Call} alt="" className="call-img" />
        </div>
      </div>
      <ChatSection
        currentUser={currentUser}
        friendAccount={friendAccount}
        messagetoSelf={selfMessage}
        socket={socket}
      />
      <ChatInput
        currentUser={currentUser}
        friendAccount={friendAccount}
        messageForSelf={selfMessageSend}
        socket={socket}
      />
    </div>
  );
}
