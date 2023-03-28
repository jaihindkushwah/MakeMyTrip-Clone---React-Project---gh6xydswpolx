import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
      return string.charAt(0).toUpperCase()+string.slice(1)+'*';
    }
    const navigate=useNavigate();

    return (
      < >
        <Layout></Layout>
        <div className='loginContainer'>
          <form className='login' 

          // form data handler

          onSubmit={
            (e)=>{e.preventDefault();
              const data=new FormData(e.target);
              const name=data.get('name');
              const email=data.get('email').toLowerCase();
              const password=data.get('password');
              const password1=data.get('password again');
              const allUsers=JSON.parse(localStorage.getItem('allUsers'));
              if(name!=='' && password!=='' && password1!=='' && email!==''){
                if(password==password1){
                  if(allUsers!==null){
                      if(allUsers[email]==undefined || allUsers[email]==''){
                        let newData={[email]:{'name':name,'password':password}};
                        localStorage.setItem('allUsers',JSON.stringify({...allUsers,...newData}));
                        // console.log(newData);
                        alert('registered successfully');
                        e.target.reset();
                        navigate('/');
                        
                      }else{
                        alert('User is already exist.');
                        
                      }
                  }else{
                    let newData={[email]:{'name':name,'password':password}};
                    localStorage.setItem('allUsers',JSON.stringify({...allUsers,...newData}));
                    alert('registered successfully');
                    e.target.reset();
                    navigate('/');
                  }
                   
                }
                else{
                  alert('Password did not match!.')
                }
              }
              // console.log(name,email,password,password1);
            }}>
              
              {/* Logo and Name */}
            <div className='loginHead'>
              <img src={loginLogo} width='30'></img>
              <h2>Sign Up</h2>
            </div>

            {/* Input Fields */}


            {/* <div className='inputs'> */}
            <div className='inputFocus'>Name*</div>
            <input type="text" 
             name="name" 
             placeholder={"Name*"}
             onBlur={onBlurForInput}
            onFocus={onFocusForInput}
            />
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
              <div className='inputFocus'>Password again*</div>                
              <input type={'password'}
                name='password again' 
                placeholder={"Password again*"}
                onBlur={onBlurForInput}
              onFocus={onFocusForInput}
              />
      

            {/* </div>   */}


            {/* Button and Link */}

            <div className='btnContainer'>
              <button  type="Submit">Register</button>
              <Link to='/login' style={{fontSize:"15px",padding:'10px 0px 0px',color:'blue'}}>Login</Link>
            </div>
          </form>
        </div>
      </>
    )
  }

export default Login;
