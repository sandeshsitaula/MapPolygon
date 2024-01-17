import {Col} from 'react-bootstrap'
import { FaRegUser } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { FaMap } from "react-icons/fa";
import './css/layout.css'

function SideBar(){
const current=window.location.pathname
    return(
       <>
       <div
       style={{display:'flex',fontSize:'2rem',flexDirection:'column',alignItems:'center',paddingTop:'2rem'}}>
       <FaRegUser
        className={current==''&&'activeLogo'}style={{color:'white',cursor:'pointer'}}/>
       <GoAlertFill className={current=='/'&&'activeLogo'}style={{color:'white',cursor:'pointer',marginTop:'3rem'}}/>
       <FaMap  className={current=='/'&&'activeLogo'}style={{color:'white',cursor:'pointer',marginTop:'3rem'}}/>
       </div>
      </>

    )
}
export function MainLayout(props){
    return(
        <>
        <div style={{backgroundColor:'black',display:'flex'}}>
        <Col  style={{borderRight:'solid 1px white',width:'5%'}}md={1}><SideBar /></Col>
        <Col md={11}>
        {props.children}
        </Col>
        </div>
        </>
    )
}
