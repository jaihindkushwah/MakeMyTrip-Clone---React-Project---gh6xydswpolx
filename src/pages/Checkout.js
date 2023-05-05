import React from 'react';
import '../styles/App.css';
import {useLocation, useNavigate} from 'react-router-dom';


function Div({title,price}){
    return(
        <div className='summaryContent'>
            <div style={{fontSize:"1.1rem",fontWeight:"600"}}>{title}</div>
            <div>Rs {price}</div>
        </div>
    )
}

function Checkout(props) {

    const price=useLocation().state.price;
    console.log(price);
    const navigate=useNavigate();
    const numberValidator=(e)=>{
        if(isNaN(e.target.value)){
            alert("please enter number");
            e.target.value="";
        }
    }

  return (
    <div style={{width:'100%'}}>  
        <div className='checkout'>
            <div className='summary' style={{backgroundColor:'white',borderRadius:'20px'}}>
                <h2>Fare Summary</h2>
                <Div title={"Base Fare"} price={Number(price)*.9}></Div>
                <Div title={"Fee & Surcharges"} price={(Number(price)*.1)+' (10%)'}></Div>
                <Div title={"Total Amounts"} price={price}></Div>
            </div>
            <div className='paymentMethod' style={{backgroundColor:'white',borderRadius:'20px'}}>
                <form onSubmit={
                    (e)=>{e.preventDefault();
                        const data=new FormData(e.target);
                        const name=data.get('nameoncard');
                        const cardno=data.get('cardno');
                        const expirydate=data.get('expirydate');
                        const cvv=data.get('cvv');
                        if(name!=='' && cardno !=='' && cvv!=='' && expirydate!==''){
                            if(!localStorage.getItem('isLoggedIn')){
                                navigate('/login',{state:{'path':'checkout'}})
                            }
                            else{
                                alert("Payment has done successfully.");
                                e.target.value='';
                                navigate('/');
                            }
                        }
                        else{
                            alert('Please fill all inputs field');
                        }
                    }
                    }>
                    <h2>Payment Method</h2>
                    <input type="text" name="nameoncard" placeholder='Name on Card' />
                    <input type="text" maxLength={16} onChange={numberValidator}  name="cardno" placeholder='Card Number' />
                    <input type="text" maxLength={4}  onChange={numberValidator} name="expirydate" placeholder='Expiry Date' />
                    <input type="text" maxLength={3}  onChange={numberValidator} name="cvv" placeholder='CVV' />
                    <button type="submit" 
                    style={{
                            backgroundImage:'linear-gradient(93deg,#53b2fe,#065af3),linear-gradient(93deg,#53b2fe,#065af3)',
                            borderRadius:'20px',
                            border:'none',
                            color:'white'
                  }}>Pay</button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Checkout