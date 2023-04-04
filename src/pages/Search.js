import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  // const[inputs,setInputs]=useState({});
  const [data, setData] = useState({})

  const updateData = (e) => {
      setData({
          [props.dropDown[0].toLowerCase()]:props.dropDown[1],
          ...data,
          [e.target.name]: e.target.value
      })
  }
  return (
    <>
      <form className="search"
        onSubmit={(e)=>{
          // const data = new FormData(e.target);
            e.preventDefault();
            props.onSubmit(data);
          }}
            
        >
         <div className="searchInputs">
          <div className="dropDown">{props.dropDown[0]} :  &nbsp;
              <select style={{padding:'5px',borderRadius:'5px'}} name={props.dropDown[0].toLowerCase()} onChange={updateData}>
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
              <button type="submit">Search &nbsp;<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
          </div>
         </div>
        
      </form>
    </>
  );
}

export default Search;
