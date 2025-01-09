import React, { useState } from 'react'
import "./style.scss"
import { Navigate, useNavigate } from 'react-router-dom'
import LinkSidebar from '../LinkSidebar'
import { Link } from 'react-router-dom'
import { faBell, faDatabase, faHome, faStethoscope, faWrench } from '@fortawesome/free-solid-svg-icons'

// import {useAuthContext} from "../hooks/useAuthContext"
import { useAuthContext } from '../../hooks/useAuthContext'

import {  signOut , getAuth } from "firebase/auth";

const links = [
  {
    name: "Tổng quan",
    to: "/home",
    icon: faHome,
    isNofity: false,
  },
  {
    name: "Điều khiển",
    to: "/home/control",
    isNofity: false,
    icon: faWrench
  }, {
    name: "Dữ liệu",
    isNofity: false,
    to: "/home/datalog",
    icon: faDatabase
  }, 
  // {
  //   name: "Chẩn đoán",
  //   to: "/home/diagnose",
  //   isNofity: true,
  //   icon: faStethoscope
  // }, 
  
  {
    name: "Thông báo",
    to: "/home/notification",
    isNofity: true,
    icon: faBell
  }
]
export default function Sidebar() {
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error);
    });
    // navigate('/');
  }
  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT", payload: null })
  // }
  // const [active, setActive] = useState(123);
  return (
    <>
      <div className='sidebar-header'>
        <div className='sidebar-header-header'>
          <img src='./straberry.png' />
          <h2>Strawberry</h2>
        </div>
        <div className='sidebar-header-bottom'>
          {
            links.map((link, index) => {
              return <LinkSidebar key={index} link={link} />
            })
          }
        </div>
      </div>
      <div className='sidebar-bottom'>
        <button onClick={handleLogout}
        >Đăng xuất</button>
      </div>
    </>
  )
}
