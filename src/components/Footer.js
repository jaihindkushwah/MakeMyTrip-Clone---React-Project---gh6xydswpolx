import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const flex={display:'flex',alignItems:'center'};
  return (
    <div className='footer' style={{...flex,justifyContent:'space-around',minHeight:'30vh',flexDirection:'column'}}>
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
          <ul style={{...flex,justifyContent:'space-between',fontSize:'1rem'}}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/'>Help Center</Link></li>
            <li><Link to='/'>Careers</Link></li>
            <li><Link to='/'>About</Link></li>
            <li><Link to='/'>FAQ</Link></li>
          </ul>
        
    </div>
  )
}

export default Footer