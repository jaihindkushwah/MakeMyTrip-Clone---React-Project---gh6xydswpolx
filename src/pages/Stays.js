import React, { useState,useEffect } from 'react'
import Layout from './Layout.js'
import Search from './Search.js';
import Availability from './Availability.js';

const list = [
    {"name":"City,OR Location",'type':'text'},
    {"name":"check-in",'type':'date'},
    {"name":"check-out",'type':'date'},
    {"name":"guests",'type':'number'},
];
const dropDown=["Room-Type",'Single','Double'];


function Stay(){
    const[data,setData]=useState([]);
    const[inputs,setInputs]=useState({});
    useEffect(()=>{
        fetch('https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels')
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
        <h2 style={{marginTop:'50px'}}>Available Hotels</h2>
        <Availability data={data} inputData={inputs} ></Availability>
        {console.log(data)}
            {console.log(inputs)}
        </>
    )
}

export default Stay;