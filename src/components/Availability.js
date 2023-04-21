import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';



function Availability({data}) {

  

  const style={'display':'flex','alignItems':'center',flexFlow:'wrap','width':'100%','justifyContent':'center'};


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  function getValuesAsStringFromObject(object){
   let d= Object.values(object).join(' | ');
   return <h4>{capitalizeFirstLetter(d)}</h4>
  }

  const[isLoading,setLoading]=useState(true);
  
  const navigate=useNavigate();
  

  return (
    <div style={style}>
      {data.length===0 && isLoading && <div style={{...style,flexDirection:'column'}}>
        <div class="loader"></div>
        <div style={{color:'red',marginTop:'10px'}}>No data found!!!!</div>
        </div>}

        {
          data.map((item)=>{
              // console.log(item);
              return (<form style={{...style,'margin':'20px',justifyContent:'space-around',border:'1px solid black','width':'90%'}}
                          onSubmit={(e)=>{
                            e.preventDefault();
                            let p=e.target.querySelector('.price').innerHTML;
                            const isLoggedIn=localStorage.getItem('isLoggedIn');
                            if(isLoggedIn){
                              navigate('../checkout',{state:{'price':p}})
                            }
                            else{
                              navigate('../login');
                            }

                            
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
        
    </div>
  )
}

export default Availability;