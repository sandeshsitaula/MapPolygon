import React, { useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

import AxiosInstance from '../axiosInstance'
function AlertList(props) {
  console.log(props.alert)
  async function SendMessage(alertId){
    try{
        const response=await AxiosInstance.get(`api/alert/sendMessage/${alertId}/`)
        console.log(response)
        alert(response.data.message)

    }catch(error){
      console.log(error)
    }
  }

    async function ResolveAlert(alertId){
    try{
        const response=await AxiosInstance.get(`api/alert/resolveAlert/${alertId}/`)
        console.log(response)
        alert(response.data.message)

    }catch(error){
      console.log(error)
    }
  }
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
      <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", paddingLeft: "2rem", color: "white" }}>
        <p>{`Service Area: ${props.service_area.id}`}</p>
      </div>
      <div>
    {props.alert.status=='ACTIVE'?(
      <>
       <Button
          style={{
            backgroundColor: "#d9d9d9",
            padding: "15px 20px",
            color: "black",
            border: "none",
            borderRadius: "0px",
            marginRight: "20px",
          }}
          onClick={()=>SendMessage(props.alert.id)}
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
          onClick={()=>ResolveAlert(props.alert.id)}
        >
          Resolve Alert
        </Button>
        </>
    ):(
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
           Alert Already Resolved
        </Button>
    )}

      </div>
    </div>
  );
}

export const FilterAlertHeader = (props) => {

const [searchData,setSearchData]=useState('')
const [currResult,setCurrResult]=useState([])
  // Function to filter data based on text
  const filterData = (text) => {
    return props.originalData && props.originalData.filter(item => {
      // Check if the text starts with "service"

      if (text.toLowerCase().startsWith('service area')) {
        // Search based on service ID
        return item.service_area.some(address =>
          address.service_area.id.toString()===text.toLowerCase().replace('service area ', '')
        );
      } else {
        // Search based on customer details
        const alert = item.alert;
        return (
          alert.alert_name.toLowerCase().includes(text.toLowerCase())
          // Adjust the condition based on your address properties
          )
      }
    });
  };



useEffect(()=>{
 function setAlert(){

   props.setAlertData(currResult)}

 setAlert()
},[currResult])

function handleSubmit(){
  if (props.searchData.some((data)=>data==searchData)){ //duplicate search entry
    return
  }
  if (searchData==''){
    return
  }
  props.setSearchData((prev)=>[
    ...prev,searchData])


}



useEffect(()=>{
 function iterator(){
   if (props.searchData.length==0){
     return
  }

  setCurrResult([])
  props.searchData.forEach((data)=>{

     var result=filterData(data)

if (result.length > 0) {

  setCurrResult(prevArray => {
    // Create a Set from the current result to check for duplicates
    const uniqueSet = new Set(prevArray.map(item => item.alert.id));

    // Filter out elements from the result that already exist in the set
    const filteredResult = result.filter(item => !uniqueSet.has(item.alert.id));

    // Concatenate the filtered result with the previous array
    return prevArray.concat(filteredResult);
  });
}

  })}

iterator()
},[props.searchData])

function handleCancel(index){
   props.setSearchData((prevArray) => {
      // Use slice to create a new array without the element at the specified index
      const newArray = [...prevArray.slice(0, index), ...prevArray.slice(index + 1)];
      return newArray;
    });

if (props.searchData.length==1){
  props.setAlertData(props.originalData)
}}

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

export function AlertInfo(props) {
  const [isServiceListVisible, setIsServiceListVisible] = useState(false);

  const toggleServiceList = () => {
    setIsServiceListVisible(!isServiceListVisible);
  };
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
        <div style={{
          display: "flex", flexWrap: 'wrap',
          alignItems: "center", alignContent: "center"
        }}>
          {isServiceListVisible ? <RiArrowDropDownLine
            onClick={toggleServiceList}
            style={{ fontSize: "3rem", marginRight: '1rem', cursor: 'pointer' }}
          /> :
            <IoIosArrowUp onClick={toggleServiceList}
              style={{ fontSize: "2rem", marginRight: '1rem', cursor: 'pointer' }} />}
          <p style={{ fontSize: "1.3rem" }}>{props.alert.alert_name}</p>
        </div>
        <div style={{ paddingRight: '3rem' }}>
          <IoCallOutline style={{ fontSize: "2rem" }} />
          <BsThreeDotsVertical style={{ fontSize: "2rem" }} />
        </div>
      </div>

      {isServiceListVisible && props.service_area && props.service_area.map((service) => {

        return (<AlertList alert={props.alert} service_area={service.service_area} key={service.id} />)
      })}
    </>
  );
}
