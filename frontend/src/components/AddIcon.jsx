import {useState} from 'react'
import { IoIosAddCircle } from "react-icons/io";
export function AddIcon(props){
return(
     <>

        <IoIosAddCircle
        onClick={()=>props.setModal(true)}style={{fontSize:'80px',color:'skyblue',cursor:'pointer'}}/>
    </>

)
}
