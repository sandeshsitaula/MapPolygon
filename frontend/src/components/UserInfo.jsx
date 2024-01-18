import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

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
        <p style={{ marginRight: "20rem" }}>demo</p>
        <p>Service 1</p>
      </div>
    </div>
  );
}

export function UserInfo() {
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const toggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };  
  const [isEditVisible, setIsEditVisible] = useState(false);

  const toggleEditCustomer = () => {
    setIsEditVisible(!isEditVisible);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
       {isEditVisible&&<div style={{ backgroundColor:'white',padding:'20px',position: "absolute", top: "3rem", right: "0" }}>
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
          <p style={{ fontSize: "1.3rem" }}>Mo balaa</p>
        </div>
        <div style={{ paddingRight: "3rem" }}>
          <IoCallOutline style={{ fontSize: "2rem" }} />
          <BsThreeDotsVertical onClick={()=>{setIsUserListVisible(true);toggleEditCustomer()} }style={{ fontSize: "2rem" }} />
        </div>
      </div>
      {isUserListVisible && <UserList />}
    </>
  );
}
