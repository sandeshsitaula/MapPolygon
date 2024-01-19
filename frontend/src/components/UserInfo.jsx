import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import {Button} from 'react-bootstrap'
import {EditCustomerModal} from './EditCustomer'

function UserList(props) {
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "1.5rem",
        padding: "20px 0px",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontWeight: "500",
          fontSize: "1.4rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          paddingLeft: "2rem",
          color: "white",
        }}
      >
        <p style={{ marginRight: "20rem" }}>{props.data.address}<br />{props.data.state}{props.data.country}</p>
        <p>Service {props.data.id}</p>
      </div>
    </div>
  );
}
export const FilterUserHeader = () => {
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

export function UserInfo(props) {
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const toggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };  
  const [isEditVisible, setIsEditVisible] = useState(false);

  const toggleEditCustomer = () => {
    setIsEditVisible(!isEditVisible);
  };
  const [editCustomerModal,setEditCustomerModal]=useState(false)

  return (
    <>
    {editCustomerModal &&<EditCustomerModal setModal={setEditCustomerModal} customerId={props.data.customer.id} updater={props.customerUpdaterToggler}/>}
      <div
        style={{
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
       {isEditVisible&&<div style={{ backgroundColor:'white',padding:'20px',position: "absolute", top: "3rem", right: "0",cursor:'pointer' }} onClick={()=>setEditCustomerModal(true)}>
          Edit Customer
        </div>}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {isUserListVisible ? (
            <RiArrowDropDownLine
              onClick={toggleUserList}
              style={{
                fontSize: "3rem",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            />
          ) : (
            <IoIosArrowUp
              onClick={toggleUserList}
              style={{
                fontSize: "2rem",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            />
          )}
          <p style={{ fontSize: "1.3rem" }}>{props.data.customer.first_name} {props.data.customer.last_name}</p>
        </div>
        <div style={{ paddingRight: "3rem" }}>
          <IoCallOutline style={{ fontSize: "2rem" }} />
          <BsThreeDotsVertical onClick={()=>{setIsUserListVisible(true);toggleEditCustomer()} }style={{ fontSize: "2rem",cursor:'pointer' }} />
        </div>
      </div>
      {isUserListVisible && <UserList data={props.data}/>}
    </>
  );
}
