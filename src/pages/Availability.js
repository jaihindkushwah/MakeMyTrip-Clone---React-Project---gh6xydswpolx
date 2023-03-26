import React, { useState } from 'react'
// import Checkout from './Checkout.js'
import { Link , useNavigate} from 'react-router-dom';



function Availability({data,inputData}) {


  const style={'display':'flex','alignItems':'center',flexFlow:'wrap','width':'100%','justifyContent':'center'};


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  function getValuesAsStringFromObject(object){
   let d= Object.values(object).join(' | ');
   return <h4>{capitalizeFirstLetter(d)}</h4>
  }

  // const[price,setPrice]=useState(0);
  const navigate=useNavigate();

  return (
    <div style={style}>
      {data.length===0 && <span class="loader"></span>}
        {
          data.map((item)=>{
              // console.log(item);
              return (<form style={{display:'flex','margin':'20px','alignItems':'center',justifyContent:'space-around',border:'1px solid black','width':'90%','flexFlow':'wrap','flexDirection':'row'}}
                          onSubmit={(e)=>{
                            e.preventDefault();
                            // const data=new FormData(e.target);
                            let p=e.target.querySelector('.price').innerHTML;
                            
                            navigate('../checkout',{state:{'price':p}})
                            
                          }}
                        >
                      {
                      Object.entries(item).map(([key,value],i)=>{
                        return(
                          <div style={{'margin':'10px','width':'200px'}}>
                            <p style={{'fontSize':'13px','marginBottom':'10px'}}>{key.split('_').join(' - ').toUpperCase()}:</p>
                            {
                              (typeof value).toLowerCase()=='object'?getValuesAsStringFromObject(value):<h4 className={key.toLowerCase().includes('price')?"price":''}>{capitalizeFirstLetter(value.toString())}</h4>
                            }
                            
                          </div>
                        )
                      })
                    }
                    <button style={{padding:'5px 25px',cursor:'pointer','height':'30px','margin':'20px'}}>Book</button>
                    {/* <Link to='/checkout' state={{"price":price}}><button style={{padding:'5px 25px',cursor:'pointer','height':'30px','margin':'20px'}}>Book</button></Link> */}
                </form>)
            })
        }
        {/* {console.log(data)}
        {console.log(inputData)} */}
        
    </div>
  )
}

export default Availability;