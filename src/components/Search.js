import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Search(props) {

  const [data, setData] = useState({})
  const updateData = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value.toLowerCase()
      })
  }
  const checkAllInputs=()=>{
      return !Object.values(data).includes('');
  }


  return (
    <><div  className="availability searchContainer">
      <form className="search"
      style={{backgroundColor:'white',borderRadius:'10px'}}
      
        onSubmit={(e)=>{
          // const data = new FormData(e.target);
            e.preventDefault();
            if(Object.keys(data).length>2 && checkAllInputs()){
              props.onSubmit(data);
            }
            else{
              alert('Please fill all inputs field');
            }
            
            
          }}  
        >

         <div className="searchInputs">
          <div className="dropDown">{props.dropDown[0]} :  &nbsp;
              <select style={{padding:'5px',borderRadius:'5px'}} name={props.dropDown[0].toLowerCase()} onChange={(e)=>{
                    props.selectedDropdown(e.target.value.toLowerCase());
      
                }}
                >
                <option  value={props.dropDown[1]}>{props.dropDown[1]}</option>
                <option value={props.dropDown[2]}> {props.dropDown[2]}</option>
              </select>
            </div> 
          <div className="inputContainer" >
          {
              props.list.map((item,i)=>{
                  return (<>
                      <label style={{margin:'10px'}}>{item.name.toUpperCase()}<input onChange={updateData} name={item.name.toLowerCase()} type={item.type}></input></label>
                  </>)
              })
          }
          </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
              {/* <button type="submit">Search &nbsp;<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button> */}
              <button type="submit">Search</button>

          </div>
         </div>
        
      </form>
        <div style={{ paddingTop: "50px" }}>
          <h2 style={{color:'white'}} >{props.title}</h2>
          </div>
      </div>
    </>
  );
}

export default Search;
