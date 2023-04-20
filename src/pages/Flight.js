import React, { useEffect, useState } from "react";
import Layout from "./Layout.js";
import Search from "./Search.js";
import Availability from "./Availability.js";

const list = [
  { name: "From", type: "text" },
  { name: "To", type: "text" },
  { name: "Departure", type: "date" },
  { name: "Return", type: "date" },
];
const dropDown = ["Trip-Type", "OneWay", "BothWay"];

function Flight() {
  const [storedData, setStoredData] = useState([]);
  const[isLoading,setLoading]=useState(true);
//   const [data, setData] = useState([]);
  const [flightInput, setInputs] = useState({});
  useEffect(() => {
    fetch(
      "https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights"
    )
      .then((res) => {  
        return res.json();
      })
      .then((res) => {
        // setData([...res]);
        // console.log(res);
        // setStoredData([...res])
        filteredData(res);
      })
    //   .then(()=>{
        // if(!flightInput){
            // setData([...filteredData])
            // setStoredData([...data]);
            // console.log(data);
            
            
        // }
    //   );
  }, [flightInput]);

  const filteredData = (data) => {
    const filterFlightData = data.filter(
      (data) =>
        data['from'].toLowerCase()=== flightInput['from'] &&
        data.to.toLowerCase() === flightInput['to'] ||
        data.departure.departureDate === flightInput["travel-date"]
    );
    if(filterFlightData.length===0){
        console.log(data);
        // alert("No Data Found!")
        setStoredData([...data]);
        
    }
    else{
        console.log(filterFlightData);
        setStoredData([...filterFlightData]);
    }

  };
  return (
    <>
      <Layout></Layout>
      <Search list={list}  onSubmit={setInputs} dropDown={dropDown}></Search>
      <h2 style={{ marginTop: "50px" }}>Available Tickets</h2>
      <Availability data={storedData} inputData={flightInput}></Availability>
      {/* {console.log(data)} */}
      {/* {console.log(flightInput)} */}
    </>
  );
}

export default Flight;
