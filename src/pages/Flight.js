import React, { useEffect, useState } from 'react'
import Layout from './Layout.js'
import Search from './Search.js';
import Availability from './Availability.js';

const list = [
    {"name":"From",'type':'text'},
    {"name":"To",'type':'text'},
    {"name":"Departure",'type':'date'},
    {"name":"Return",'type':'date'},
];
const dropDown=["Trip-Type",'OneWay','BothWay'];



function Flight(){
    const[data,setData]=useState([]);
    const[inputs,setInputs]=useState({});
    useEffect(()=>{
        fetch('https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights')
            .then((res)=>{return res.json()})
            .then((res)=>{
                let lis=[];
                res.forEach(element => {
                    lis.push(element);
                });
               setData(lis);
            })
    },[inputs]);

    return (
        <> 
            <Layout></Layout>
            <Search list={list} onSubmit={setInputs} dropDown={dropDown}></Search>
            <h2 style={{marginTop:'50px'}}>Available Tickets</h2>
            <Availability data={data} inputData={inputs} ></Availability>
            {console.log(data)}
            {console.log(inputs)}
            
        </>
    )
}

export default Flight;



