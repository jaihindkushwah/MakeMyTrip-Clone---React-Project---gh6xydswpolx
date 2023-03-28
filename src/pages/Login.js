import React from 'react'
import { json, Link, useNavigate } from 'react-router-dom';
import Layout from './Layout'
import '../styles/Login.css'
import loginLogo from '../loginLogo.jpg'

const Login = () => {
  const onFocusForInput=(e)=>{
    e.target.placeholder='';
    e.target.previousElementSibling.style.visibility='visible';
    
    
  }
  const onBlurForInput=(e)=>{
      e.target.placeholder=capitalizeFirstLetter(e.target.name);
      e.target.previousElementSibling.style.visibility='hidden';
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)+'*';
  }
  const navigate=useNavigate();

    return (
      < >
        <Layout></Layout>
        <div className='loginContainer'>
          <form className='login'
           onSubmit={
            (e)=>{e.preventDefault();
              const data=new FormData(e.target);
              const email=data.get('email').toLowerCase();
              const password=data.get('password');
              const allUsers=JSON.parse(localStorage.getItem('allUsers'));
              if(email!==''&& password!==''){
                  if(allUsers!==null && allUsers[email]!==undefined){
                    const userData=allUsers[email];
                    if(password===userData['password']){
                      const name=userData['name'];
                      localStorage.setItem('isLoggedIn',JSON.stringify({name:name,email:email}));
                      alert('Logged in successfully');
                      navigate(-1)
                    }
                    else{
                      alert('Invalid password');
                    }
                  }else{
                    e.target.reset();

                    alert('User is not exists.')
                  }
              }
              else{
                alert('Please enter all input Field')
              }
              

            }}>
            <div className='loginHead'>
              <img src={loginLogo} width='30'></img>
              <h2>Log In</h2>
            </div>
            {/* <div className='inputs'> */}
                
            <div className='inputFocus'>Email*</div>
                <input type="email"  name="email"
                  onBlur={onBlurForInput}
                  onFocus={onFocusForInput}
                  placeholder={"Email*"}
                />
            <div className='inputFocus'>Password*</div>                
              <input type={'password'}
                name='password' 
                placeholder={"Password*"}
                onBlur={onBlurForInput}
              onFocus={onFocusForInput}
              /> 

            {/* </div>   */}
            <div className='btnContainer'>
              <button  type="Submit">Login</button>
              <Link to='/Register' style={{fontSize:"15px",padding:'10px 0px 0px',color:'blue'}}>New user? Sign Up</Link>
            </div>
          </form>
        </div>
      </>
    )
  }

export default Login;
