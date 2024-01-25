import { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
export function AddIcon(props) {
    return (
        <>

            <IoIosAddCircle
                onClick={() => props.setTextContent(true)} style={{ fontSize: '80px', color: 'skyblue', cursor: 'pointer' }} />
        </>

    )
}
