import React, { useEffect, useState } from "react";
import Search from "../components/Search.js";
import Availability from "../components/Availability.js";
import Bottom from "../components/Bottom.js";
import SearchIcon from "../components/SearchIcon.js";
import logo from '../flightLogo.png'

// Input types data
const list = [
  { name: "From", type: "text" },
  { name: "To", type: "text" },
  { name: "Departure", type: "date" },
  { name: "Return", type: "date" },
];
const dropDown = ["Trip-Type", "OneWay", "BothWay"];

function Flight() {
  const [storedData, setStoredData] = useState([]);
  const [apiData,setApiData]=useState([]);

  const [selectedDropdown, setSelectedDropdown] = useState("oneway");

  const [flightInput, setInputs] = useState({});
  useEffect(() => {
    fetch(
      "https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // filteredData(res);
        setApiData([...res]);
        // setStoredData([...res]);
      });
  },[]);
  // console.log(storedData);

  useEffect(()=>{
    filteredData(apiData);
  },[flightInput,selectedDropdown,apiData]);

  //   Filter data according to user input
  const filteredData = (data) => {
    // console.log(flightInput);
    let filterFlightData = [];

    if (Object.entries(flightInput).length > 0) {
      if (selectedDropdown === "bothway") {
        if (!Object.keys(flightInput).includes("return")) {
          alert("Please enter return date and then search.");
          return;
        }
        filterFlightData = [
          ...data.filter(
            (data) =>
              data["from"].toLowerCase() === flightInput["from"] &&
              data.to.toLowerCase() === flightInput["to"] &&
              data.departure.departureDate === flightInput["departure"] &&
              data.return.returnDate === flightInput["return"]
          ),
        ];
      } else {
        filterFlightData = [
          ...data.filter(
            (data) =>
              data["from"].toLowerCase() === flightInput["from"] &&
              data.to.toLowerCase() === flightInput["to"] &&
              data.departure.departureDate === flightInput["departure"]
          ),
        ];
      }
    }

    if (
      filterFlightData.length === 0 &&
      Object.entries(flightInput).length === 0
    ) {
      // console.log(data);
      setStoredData([...data]);
    } else {
      // console.log(filterFlightData);
      setStoredData([...filterFlightData]);
    }
  };
  return (
    <>
      <SearchIcon img={logo}/>
      <Search
        list={list}
        onSubmit={setInputs}
        dropDown={dropDown}
        selectedDropdown={setSelectedDropdown}
        title={'Available Tickets'}
      ></Search>
        
        <Availability data={storedData}></Availability>
        <Bottom></Bottom>
    </>
  );
}

export default Flight;
