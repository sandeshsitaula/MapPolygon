import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

function AlertList(props) {
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        padding: "20px 0px",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display:'flex',flexWrap:"wrap",alignItems:"center",paddingLeft: "2rem", color: "white" }}>
        <p>{`Service Area: ${props.service_area.id}`}</p>
      </div>
      <div>
        <Button
          style={{
            backgroundColor: "#d9d9d9",
            padding: "15px 20px",
            color: "black",
            border: "none",
            borderRadius: "0px",
            marginRight: "20px",
          }}
        >
          Send Message
        </Button>
        <Button
          style={{
            backgroundColor: "#d9d9d9",
            padding: "15px 20px",
            color: "black",
            border: "none",
            borderRadius: "0px",
            marginRight: "20px",
          }}
        >
          Resolve Alert
        </Button>
      </div>
    </div>
  );
}

export const FilterAlertHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
        height: "100px",
      }}
    >
      <div>
        <h3>Filters</h3>
        <input
          type="search"
          style={{
            marginLeft: "35px",
            padding: "8px",
            width: "190px",
            borderRadius: "20px",
            outline: "none",
          }}
        />
      </div>
      <div></div>
      <Button
        style={{
          backgroundColor: "white",
          color: "gray",
          padding: "10px 60px",
          marginRight: "2rem",
        }}
      >
        Search
      </Button>
    </div>
  );
};

export function AlertInfo(props) {
  const [isServiceListVisible, setIsServiceListVisible] = useState(false);

  const toggleServiceList = () => {
    setIsServiceListVisible(!isServiceListVisible);
  };
  console.log(props.service_area)
  return (
    <>
      <div
        style={{
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
         
        }}
      >
        <div style={{ display: "flex",  flexWrap:'wrap',
          alignItems: "center",alignContent: "center" }}>
        {isServiceListVisible? <RiArrowDropDownLine
            onClick={toggleServiceList}
            style={{ fontSize: "3rem",marginRight:'1rem' ,cursor:'pointer' }}
          />:
          <IoIosArrowUp onClick={toggleServiceList}
            style={{ fontSize: "2rem",marginRight:'1rem',cursor:'pointer'  }}/>}
          <p style={{ fontSize: "1.3rem"}}>{props.alert.alert_name}</p>
        </div>
        <div style={{paddingRight:'3rem'}}>
          <IoCallOutline style={{ fontSize: "2rem" }} />
          <BsThreeDotsVertical style={{ fontSize: "2rem" }} />
        </div>
      </div>

      {isServiceListVisible && props.service_area &&props.service_area.map((service)=>{

        return(<AlertList service_area={service.service_area} key={service.id}/>)
      })}
    </>
  );
}
