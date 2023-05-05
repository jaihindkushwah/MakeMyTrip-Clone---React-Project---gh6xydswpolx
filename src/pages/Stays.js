import React, { useState, useEffect } from "react";
import Search from "../components/Search.js";
import Availability from "../components/Availability.js";
import SearchIcon from "../components/SearchIcon.js";
import Bottom from "../components/Bottom.js";

const list = [
  { name: "City,OR Location", type: "text" },
  { name: "check-in", type: "date" },
  { name: "check-out", type: "date" },
  { name: "guests", type: "number" },
];
const dropDown = ["Room-Type", "Single", "Double"];

function Stay() {
  //   const [data, setData] = useState([]);
  // const [storedData, setStoredData] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [apiData,setApiData]=useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("single");

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    fetch(
      "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setApiData([...res]);
      });
  }, []);

  useEffect(()=>{
    filteredData(apiData);
  },[inputs,selectedDropdown,apiData]);


  const filteredData = (data) => {
    console.log(inputs);
    console.log(selectedDropdown);
    
    let filterData = [];

    if (Object.entries(inputs).length > 0) {
      if(Object.keys(inputs).includes('guests')){
        filterData = [
          ...data.filter(
            (data) =>
              data["city"].toLowerCase() === inputs["city,or location"] &&
              data["check_in"] === inputs["check-in"] &&
              data["check_out"] === inputs["check-out"] &&
              data["guests"].includes(inputs["guests"]) &&
              data["room_type"].toLowerCase() === selectedDropdown
          ),
        ];
          
      }
      else{
        alert('Please enter guests input.');
        setStoredData([...data]);
        return;
      }
      
    }

    if (filterData.length === 0 && Object.entries(inputs).length === 0) {
      console.log(data);
      setStoredData([...data]);
    } else {
      console.log(filterData);
      setStoredData([...filterData]);
    }
  };

  return (
    <>
        <SearchIcon img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqd6FrbyQpV_p_ZMCGuofQcRhttOmStYt6w&usqp=CAU"}/>
      <Search
        list={list}
        onSubmit={setInputs}
        dropDown={dropDown}
        selectedDropdown={setSelectedDropdown}
        title={'Available Hotels'}
      ></Search>
      <Availability data={storedData}></Availability>
      <Bottom/>
    </>
  )
}

export default Stay
