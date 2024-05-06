import React, { useEffect, useState } from 'react'
import Robo from "../../assets/robot.gif";
import "./style.css";
export default function Welcome({currentUser}) {
  const [currentUserName, setCurrentUserName] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      console.log(currentUser)
    }
  }, []);
  return (
    <div className='robo-container'>
      <img src={Robo} alt="" className='robo-image' />
      <div className='current-user-name'>
        Welcome, {currentUserName}
      </div>
    </div>
  )
}
