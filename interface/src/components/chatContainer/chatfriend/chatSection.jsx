import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { getAllMessagsRoute } from "../../../utils/apiRoutes";

export default function ChatSection({
  currentUser,
  friendAccount,
  messagetoSelf,
  socket,
}) {
  const [allMessages, setAllMessages] = useState([]);
  const getAllMessage = async () => {
    const { data } = await axios.post(getAllMessagsRoute, {
      from: currentUser._id,
      to: friendAccount._id,
    });
    setAllMessages(data.messages);
  };
  useEffect(() => {
    getAllMessage();
  }, [friendAccount]);

  useEffect(() => {
    if (messagetoSelf.message != "") {
      setAllMessages([messagetoSelf].concat(allMessages));
    }
  }, [messagetoSelf]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "msg-recive",
        (msg) => {
          setAllMessages([{
            message: msg,
            fromSelf: false,
          }].concat(allMessages));}
      );
      console.log(allMessages);
    }
  },[]);
  return (
    <div className="real-chat-section">
      {allMessages.map((msg, index) => {
        return (
          <div
            className={`message ${msg.fromSelf ? "sender" : "reciver"}`}
            key={index}
          >
            <img
              src={`${
                msg.fromSelf ? currentUser.avatar : friendAccount.avatar
              }`}
              className="message-img"
              alt=""
            />
            <div
              className={`message-div ${
                msg.fromSelf ? "sender-div" : "reciver-div"
              }`}
            >
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}
