import React from 'react'

function SearchIcon({img}) {
  return (
    // border-radius: 50%;
    // margin-bottom: -135%;
    // width: 80px;
    <div className='searchImgIcon'>
    <img  src={img} 
    alt="" width='80px' style={{borderRadius:'52%'}}  />
    </div>
  )
}

export default SearchIcon