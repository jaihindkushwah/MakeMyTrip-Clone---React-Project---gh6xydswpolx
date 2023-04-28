import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Availability({ data }) {
  const style = {
    display: "flex",
    alignItems: "center",
    flexFlow: "wrap",
    width: "100%",
    justifyContent: "center",
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getValuesAsStringFromObject(object) {
    let d = Object.values(object).join(" | ");
    return <h4>{capitalizeFirstLetter(d)}</h4>;
  }

  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  return (
    <div style={style} className="availability">
      {data.length === 0 && isLoading && (
        <div style={{ ...style, flexDirection: "column" }}>
          <div style={{ color: "red", marginTop: "10px", fontSize: "1.2rem" }}>
            No data found!!!!
          </div>
        </div>
      )}

      <div style={{ minHeight: "20vh", padding: "0 30px" }}>
        {data.map((item) => {
          // console.log(item);
          return (
            <form
              style={{
                ...style,
                width: "100%",
                margin: "20px 0",
                justifyContent: "space-around",
                border: "1px solid black",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                let p = e.target.querySelector(".price").innerHTML;
                const isLoggedIn = localStorage.getItem("isLoggedIn");
                if (isLoggedIn) {
                  navigate("../checkout", { state: { price: p } });
                } else {
                  navigate("../login");
                }
              }}
            >
              {Object.entries(item).map(([key, value], i) => {
                return (
                  <div style={{ margin: "10px", width: "200px" }}>
                    <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                      {key.split("_").join(" - ").toUpperCase()}:
                    </p>
                    {(typeof value).toLowerCase() == "object" ? (
                      getValuesAsStringFromObject(value)
                    ) : (
                      <h4
                        className={
                          key.toLowerCase().includes("price") ? "price" : ""
                        }
                      >
                        {capitalizeFirstLetter(value.toString())}
                      </h4>
                    )}
                  </div>
                );
              })}
              <button
                style={{
                  border: "none",
                  padding: "5px 25px",
                  cursor: "pointer",
                  color: "white",
                  height: "30px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  backgroundColor: "blue",
                  marginLeft:'10px',
                  
                  backgroundImage:'linear-gradient(93deg,#53b2fe,#065af3),linear-gradient(93deg,#53b2fe,#065af3)'
                }}
              >
                Book
              </button>
              {/* <Link to='/checkout' state={{"price":price}}><button style={{padding:'5px 25px',cursor:'pointer','height':'30px','margin':'20px'}}>Book</button></Link> */}
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default Availability;
