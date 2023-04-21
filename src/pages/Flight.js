import React, { useEffect, useState } from "react";
import Search from "../components/Search.js";
import Availability from "../components/Availability.js";

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
        filteredData(res);
      });
  }, [flightInput, selectedDropdown]);

  //   Filter data according to user input
  const filteredData = (data) => {
    console.log(flightInput);
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
      console.log(data);
      setStoredData([...data]);
    } else {
      console.log(filterFlightData);
      setStoredData([...filterFlightData]);
    }
  };
  return (
    <>
      <Search
        list={list}
        onSubmit={setInputs}
        dropDown={dropDown}
        selectedDropdown={setSelectedDropdown}
      ></Search>
      <h2 style={{ marginTop: "50px" }}>Available Tickets</h2>
      <Availability data={storedData}></Availability>
      {console.log(selectedDropdown)};{/* {console.log(flightInput)} */}
    </>
  );
}

export default Flight;
