import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../logo.jpg";
import "../styles/App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";



function IsLoggedInComponent({activate,setActivate}){
  const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate=useNavigate();
  

  if(isLoggedIn){
    return(
        <button 
        onClick={(e)=>{
          setActivate('flight');
          alert('Log out successfully');
          localStorage.removeItem('isLoggedIn');
          navigate('/');
        }} 
        className="link">
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        &nbsp; {isLoggedIn.name.split(" ")[0]}
        {/* {changeUser?isLoggedIn.name.split(" ")[0]:'Logout'} */}
      </button>
    )
  }else{
    return(
        <button  style={ activate==='login' ? {backgroundColor:"#ccc"}:{}}
          onClick={(e)=>{
            setActivate('login');
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
  const [activate,setActivate]=useState('flight');
  

  return (
    <>
    {/* style={style} */}
      <nav >
        <ul>
          <li>
            <Link to="/" onClick={()=>{setActivate('flight')}}>
              <img
                src={logo}
                width="120px"
                alt="makemytrip.logo"
              ></img>
            </Link>
          </li>
        </ul>
        {/* style={{...style,flexFlow:'wrap'}} */}
        {console.log(activate)}
        <ul className="links" >
          <li>
            <Link style={activate==='flight' || activate===''? {backgroundColor:"#ccc"}:{}} onClick={()=>{setActivate('flight')}}  to="/flight" className="link">
              Flights
            </Link>
          </li>
          <li>
            <Link to="/stay" style={activate==='stay' ? {backgroundColor:"#ccc"}:{}} onClick={()=>{setActivate('stay')}} className="link">
              Hotels
            </Link>
          </li>
          <li>
            <Link to="/train" style={activate==='train' ? {backgroundColor:"#ccc"}:{}} onClick={()=>{setActivate('train')}} className="link">
              Trains
            </Link>
          </li>

          <li >
            <IsLoggedInComponent activate={activate} setActivate ={setActivate}/>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
export default Layout;
