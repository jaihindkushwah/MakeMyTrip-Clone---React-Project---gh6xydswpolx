import React, { useState,useEffect } from 'react'
import Layout from './Layout.js'
import Search from './Search.js';
import Availability from './Availability.js';

const list = [
    {"name":"From",'type':'text'},
    {"name":"To",'type':'text'},
    {"name":"Travel-date",'type':'date'},
    {"name":"Class",'type':'text'},
];
const dropDown=["Trip-Type",'OneWay','BothWay'];


function Train(){
    const[data,setData]=useState([]);
    const[inputs,setInputs]=useState({});
    useEffect(()=>{
        fetch('https://content.newtonschool.co/v1/pr/63b85e152cabb8fdea2673ee/trains')
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
        </>
    )
}

export default Train;