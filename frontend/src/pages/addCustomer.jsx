import axios from 'axios'
import {Form,Button,Col} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import AxiosInstance from '../axiosInstance'


export function AddCustomer(){
   const [customer,SetCustomer]=useState({
       firstName:'',
       lastName:'',
       country:'',
       city:'',
       state:'',
       phoneNumber:'',
       zipCode:'',
   })

const [loading,setLoading]=useState(false)

   //get all the input changes
   function handleChange(e){
       const {name,value}=e.target
       SetCustomer((prev)=>({

           ...prev,[name]:value
       }))
}
    //handle submit send customer data
async function handleSubmit(){
    if  (loading){
        return
    }
    setLoading(true)
       const checker=Object.values(customer).some((val)=>val=='')
      if (checker){
          alert("insert all the values properly")
          return
    }
    try{
    const response=await AxiosInstance.post('api/customer/addCustomer/',customer)
    alert(response.data.message)

        console.log(response)
    setLoading(false)
    }
       catch(error){
           console.log(error)
           alert(error.response.error)
    }
    }
useEffect(()=>{
    console.log(customer)
})
    return (
        <>
        <div style={{backgroundColor:'#2e8a99',display:'flex',height:'100vh',paddingTop:'5rem',justifyContent:'center'}}>
        <Col sm={9} md={5}>
            <div style={{backgroundColor:'white'}}>
            <h5 style={{textAlign:'center',paddingBottom:'20px'}}>Add New Customer</h5>
            <Col sm={9} md={12} style={{display:'flex',justifyContent:'center'}}>
            <Form style={{width:'80%'}}>
            <Form.Control value={customer.firstName} style={{marginBottom:'15px'}} onChange={handleChange} type="text" name="firstName" placeholder="First Name" />
            <Form.Control value={customer.lastName} style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="lastName" placeholder="Last Name" />
            <Form.Control value={customer.country} style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="country" placeholder="Country" />
            <Form.Control value={customer.city}style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="city" placeholder="City" />
            <Form.Control value={customer.state} style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="state" placeholder="State" />
            <Form.Control value={customer.zipCode} style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="zipCode" placeholder="Zip Code" />
            <Form.Control value={customer.phoneNumber} style={{marginBottom:'25px'}}  onChange={handleChange}type="text" name="phoneNumber" placeholder="Phone Number (eg:+977-90000000)" />
            <div style={{textAlign:'center',marginBottom:'30px'}}>
                <Button  style={{width:'75%'}}variant="outline-success" onClick={handleSubmit}>{loading?"Loading":"Submit Customer"}</Button>
            <Button  style={{width:'75%',marginTop:'25px'}}variant="outline-danger">Go Back(Home)</Button>
            </div>
            </Form>
            </Col>
            </div>
        </Col>
        </div>

        </>
    )
}
