import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import './Tag.css'

const Tag = () => {
  return (
    <div className='main'>
        <div className='left'>
        <MdOutlineKeyboardArrowDown  className='emoji'/>
            <h3>Boil Water Alert</h3>
        </div>

        <div className='right'>
        <FaPhoneAlt className='emoji' />
        <BsThreeDotsVertical  className='emoji'/>
        </div>
      
    </div>
  )
}

export default Tag
