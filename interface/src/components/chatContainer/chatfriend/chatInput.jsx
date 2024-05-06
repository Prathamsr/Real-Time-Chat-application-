import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { sendMessageRoute } from "../../../utils/apiRoutes";
import Send from "../../../assets/send (1).png";
export default function ChatInput({
  currentUser,
  friendAccount,
  socket,
  messageForSelf,
}) {
  const [message, setMessage] = useState("");
  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const onSendClick = async () => {
    if (message != "") {
      const { data } = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: friendAccount._id,
        message: message,
      });
      socket.current.emit("send-msg",{
        from: currentUser._id,
        to: friendAccount._id,
        message: message,
      });
      messageForSelf(message);
      if (data.status) {
        setMessage("");
      }
    }
  };
  return (
    <div className="send-section">
      <div className="input-div">
        <textarea
          name=""
          className="send-input"
          id=""
          cols="30"
          rows="1"
          value={message}
          onChange={(e) => {
            onMessageChange(e);
          }}
        ></textarea>
        <div
          className="send-button"
          onClick={() => {
            onSendClick();
          }}
        >
          <img src={Send} alt="" className="send-img" />
        </div>
      </div>
    </div>
  );
}
