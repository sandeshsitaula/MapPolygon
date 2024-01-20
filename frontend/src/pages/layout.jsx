import {Col} from 'react-bootstrap'
import { FaRegUser } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { FaMap } from "react-icons/fa";
import {Link} from 'react-router-dom';
import './css/layout.css'

function SideBar(){
const current=window.location.pathname
    return(
       <>
       <div
       style={{display:'flex',fontSize:'2rem',flexDirection:'column',alignItems:'center',paddingTop:'2rem'}}>
    <Link to="/customerInterface">
       <FaRegUser
        className={current=='/customerInterface'&&'activeLogo'}style={{color:'white',cursor:'pointer'}}/>
        </Link>
        <Link to="/alertInterface">
       <GoAlertFill className={current=='/alertInterface'&&'activeLogo'}style={{color:'white',cursor:'pointer',marginTop:'3rem'}}/>
       </Link>
       <Link to="/serviceAreaInterface">
       <FaMap  className={current=='/serviceAreaInterface'&&'activeLogo'}style={{color:'white',cursor:'pointer',marginTop:'3rem'}}/>
       </Link>
       </div>
      </>

    )
}
export function MainLayout(props){
    return(
        <>
        <div style={{backgroundColor:'black',display:'flex'}}>
        <Col  style={{borderRight:'solid 1px white',width:'5%'}}md={1}><SideBar /></Col>
        <Col md={12}>
        {props.children}
        </Col>
        </div>
        </>
    )
}
