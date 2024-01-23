import React, { useState,useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { Button } from 'react-bootstrap'
import { EditCustomerModal } from './EditCustomer'

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
        <p style={{ marginRight: "20rem" }}>{props.data.address}<br />{props.data.state} {props.data.country}</p>
        <p>Service Area: {props.data.id}</p>
      </div>
    </div>
  );
}


export const FilterUserHeader = (props) => {

const [searchData,setSearchData]=useState('')
const [currResult,setCurrResult]=useState([])
  // Function to filter data based on text
  const filterData = (text) => {
    return props.originalData && props.originalData.filter(item => {
      // Check if the text starts with "service"
      if (text.toLowerCase().startsWith('service area')) {
        // Search based on service ID
        return item.service_address.some(address =>
          address.id.toString().includes(text.toLowerCase().replace('service area ', ''))
        );
      } else {
        // Search based on customer details
        const customer = item.customer;
        return (
          customer.first_name.toLowerCase().includes(text.toLowerCase()) ||
          customer.last_name.toLowerCase().includes(text.toLowerCase()) ||
          // Adjust the condition based on your address properties
          item.service_address.some(address =>
            address.country.toLowerCase().includes(text.toLowerCase())||
            address.address.toLowerCase().includes(text.toLowerCase())||
            address.city.toLowerCase().includes(text.toLowerCase())
          )
        );
      }
    });
  };



useEffect(()=>{
 function setCustomer(){
   if (currResult==0){
     props.setCustomerData(props.originalData)
  }else{
   props.setCustomerData(currResult)}
 }
 setCustomer()
},[currResult])

function handleSubmit(){
  if (props.searchData.some((data)=>data==searchData)){
    return
  }

  if (searchData==''){
    return
  }
  props.setSearchData((prev)=>[
    ...prev,searchData])

  var result=filterData(searchData)

if (result.length > 0) {
  setCurrResult(prevArray => {
    // Create a Set from the current result to check for duplicates
    const uniqueSet = new Set(prevArray.map(item => item.customer.id));

    // Filter out elements from the result that already exist in the set
    const filteredResult = result.filter(item => !uniqueSet.has(item.customer.id));

    // Concatenate the filtered result with the previous array
    return prevArray.concat(filteredResult);
  });
}
}

function handleCancel(index){
setCurrResult([])

  props.searchData.forEach((data,idx)=>{
    console.log(data,index,idx)
    if (idx==index){

    }else{
     var result=filterData(data)

if (result.length > 0) {

  setCurrResult(prevArray => {
    // Create a Set from the current result to check for duplicates
    const uniqueSet = new Set(prevArray.map(item => item.customer.id));

    // Filter out elements from the result that already exist in the set
    const filteredResult = result.filter(item => !uniqueSet.has(item.customer.id));

    // Concatenate the filtered result with the previous array
    return prevArray.concat(filteredResult);
  });
}

    }
}

)
   props.setSearchData((prevArray) => {
      // Use slice to create a new array without the element at the specified index
      const newArray = [...prevArray.slice(0, index), ...prevArray.slice(index + 1)];
      return newArray;
    });

}

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
        <div style={{display:'flex'}}>
        {props.searchData.map((data,index)=>
            (
              <div key={index} style={{backgroundColor:'white',position:'relative',color:'black',marginLeft:'1rem',padding:'5px 20px',borderRadius:'20px'}}>
        {data}
        <span onClick={()=>handleCancel(index)} style={{cursor:'pointer',color:'gray',position:'absolute',right:'5px'}}>X</span>
        </div>

    )
)}
</div>

      </div>
      <div>
       <input
          type="text"
          id="search"
          style={{
            padding: "8px",
          marginRight:'8px',
            width: "190px",
            outline: "none",
          }}
          value={searchData}
          onChange={(e)=>setSearchData(e.target.value)}
          placeholder="Search"
        />


        <Button onClick={()=>handleSubmit()} variant="danger">Submit</Button>
        </div>
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
  const [editCustomerModal, setEditCustomerModal] = useState(false)

  return (
    <>
      {editCustomerModal && <EditCustomerModal setModal={setEditCustomerModal} customerId={props.data.customer.id} updater={props.customerUpdaterToggler} />}
      <div
        style={{
          backgroundColor: "#d9d9d9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {isEditVisible && <div style={{ backgroundColor: 'white', padding: '20px', position: "absolute", top: "3rem", right: "0", cursor: 'pointer' }} onClick={() => setEditCustomerModal(true)}>
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
          <BsThreeDotsVertical onClick={() => { setIsUserListVisible(true); toggleEditCustomer() }} style={{ fontSize: "2rem", cursor: 'pointer' }} />
        </div>
      </div>
      {isUserListVisible && props.data.service_address.map((service_area)=>(<UserList key={service_area.id} data={service_area} />))}
    </>
  );
}
