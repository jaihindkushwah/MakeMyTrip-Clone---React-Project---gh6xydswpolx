import React, { useState, useEffect } from "react";
import Search from "../components/Search.js";
import Availability from "../components/Availability.js";

const list = [
  { name: "From", type: "text" },
  { name: "To", type: "text" },
  { name: "Travel-date", type: "date" },
  { name: "Class", type: "text" },
];
const dropDown = ["Trip-Type", "OneWay", "BothWay"];

function Train() {
  const [storedData, setStoredData] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("oneway");

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    fetch(
      "https://content.newtonschool.co/v1/pr/63b85e152cabb8fdea2673ee/trains"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        filteredData(res);
      });
  }, [inputs, selectedDropdown]);

  const filteredData = (data) => {
    console.log(selectedDropdown);
    console.log(data);
    let filterData = [];

    if (Object.entries(inputs).length > 0) {
      if (selectedDropdown === "bothway") {
        filterData = [
          ...data.filter(
            (data) =>
              (data["from"].toLowerCase() === inputs["from"] &&
                data.to.toLowerCase() === inputs["to"] &&
                data.departure.departureDate === inputs["travel-date"]) ||
              (data["from"].toLowerCase() === inputs["to"] &&
                data.to.toLowerCase() === inputs["from"] &&
                data.departure.departureDate === inputs["travel-date"])
          ),
        ];
      } else {
        filterData = [
          ...data.filter(
            (data) =>
              data["from"].toLowerCase() === inputs["from"] &&
              data.to.toLowerCase() === inputs["to"] &&
              data.departure.departureDate === inputs["travel-date"]
          ),
        ];
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
      <Search
        list={list}
        onSubmit={setInputs}
        dropDown={dropDown}
        selectedDropdown={setSelectedDropdown}
      ></Search>
      <h2 style={{ marginTop: "50px" }}>Available Tickets</h2>
      <Availability data={storedData}></Availability>

      {console.log(inputs)}
    </>
  );
}

export default Train;
