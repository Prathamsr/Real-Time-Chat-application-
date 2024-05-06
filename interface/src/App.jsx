import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/usermanager/registerUser";
import Chat from "./pages/chat/chat";
import Login from "./pages/usermanager/login";
import Setavatar from "./pages/setavatar/setavatar";
import UploadImage from "./pages/uploadimg/uploadImage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Chat/>} />
        <Route path="/setavatar" element={<Setavatar/>} />
        <Route path="/upload" element={<UploadImage/>} />
      </Routes>
    </BrowserRouter>
  );
}
