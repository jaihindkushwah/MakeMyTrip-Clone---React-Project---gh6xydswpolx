import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import logo from "../logo.jpg";
import "../styles/App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";



function IsLoggedInComponent({activate}){
  const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate=useNavigate();
  

  if(isLoggedIn){
    return(
        <button 
        onClick={(e)=>{
          if(window.confirm('Are you sure for log out.')){
            localStorage.removeItem('isLoggedIn');
            navigate('/');
          }
        }} 
        className="link">
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        &nbsp; {isLoggedIn.name.split(" ")[0]}
        {/* {changeUser?isLoggedIn.name.split(" ")[0]:'Logout'} */}
      </button>
    )
  }else{
    return(
        <button  style={ activate==='login'|| activate==='register' ? {backgroundColor:"white",color:'blue'}:{}}
          onClick={(e)=>{
            
            navigate('/login');
          }}
        className="link">
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>&nbsp;
        Login
      </button>
    )
  }
   
}

function Layout() {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // flexFlow:'wrap'
  };
  // const [activate,setActivate]=useState('flight');
  const location=useLocation();
  let activate=location.pathname.split("/")[1];
  return (
    <>
    {/* style={style} */}
      <nav style={{top:'0',left:'0',position:'sticky',width:'100%',zIndex:'100'}} >
        <ul>
          <li>
            <Link to="/" >
              <img
                src='https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png'
                width="120px"
                color="white"
                alt="makemytrip.logo"
              ></img>
            </Link>
          </li>
        </ul>
        {/* style={{...style,flexFlow:'wrap'}} */}
        <ul className="links" >
          <li style={{color:'white'}}>
            <Link style={activate==='flight' || activate===''? {backgroundColor:"white",color:'blue'}:{color:'white'}}  to="/flight" className="link">
              Flights
            </Link>
          </li>
          <li>
            <Link to="/stay" style={activate==='stay' ? {backgroundColor:"white",color:'blue'}:{color:'white'}} className="link">
              Hotels
            </Link>
          </li>
          <li>
            <Link to="/train" style={activate==='train' ? {backgroundColor:"white",color:'blue'}:{color:'white'}} className="link">
              Trains
            </Link>
          </li>

          <li >
            <IsLoggedInComponent activate={activate}/>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
export default Layout;
