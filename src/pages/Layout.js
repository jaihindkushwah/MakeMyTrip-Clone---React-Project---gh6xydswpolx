import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../logo.jpg";
import "../styles/App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function Layout() {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // flexFlow:'wrap'
  };
  function isLoggedInComponent(){
    const isLoggedIn=JSON.parse(localStorage.getItem("isLoggedIn"));
    const navigate=useNavigate();
    

    if(isLoggedIn){
      // const[changeUser,setChangeUser]=useState(true);
      // setInterval(function(){setChangeUser(!changeUser)},5000);
      return(
          <button 
          onClick={(e)=>{
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
          <button  
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

  return (
    <>
    {/* style={style} */}
      <nav >
        <ul>
          <li>
            <Link to="/">
              <img
                src={logo}
                width="120px"
                alt="makemytrip.logo"
              ></img>
            </Link>
          </li>
        </ul>
        {/* style={{...style,flexFlow:'wrap'}} */}
        <ul className="links" >
          <li>
            <Link to="/flight" className="link">
              Flights
            </Link>
          </li>
          <li>
            <Link to="/stay" className="link">
              Stays
            </Link>
          </li>
          <li>
            <Link to="/train" className="link">
              Trains
            </Link>
          </li>

          <li>
            {isLoggedInComponent()}
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
export default Layout;
