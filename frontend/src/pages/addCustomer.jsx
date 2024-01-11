import axios from 'axios'
import {Form,Button,Col} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import AxiosInstance from '../axiosInstance'
/*
 * lass Customer(models.Model):
    # use geocoding API to convert street address to lat/long to store in database
    point = gis_models.PointField()
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    polygon = models.ForeignKey(Polygon, on_delete=models.CASCADE)*/

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

   //get all the input changes
   function handleChange(e){
       const {name,value}=e.target
       SetCustomer((prev)=>({

           ...prev,[name]:value
       }))
}
    //handle submit send customer data
    async function handleSubmit(){
       const checker=Object.values(customer).some((val)=>val=='')
      if (checker){
          alert("insert all the values properly")
          return
    }
    const response=await AxiosInstance.post('api/customer/postCustomer',customer)

       console.log(response)
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
            <Form.Control style={{marginBottom:'15px'}} onChange={handleChange} type="text" name="firstName" placeholder="First Name" />
            <Form.Control style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="lastName" placeholder="Last Name" />
            <Form.Control style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="country" placeholder="Country" />
            <Form.Control style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="city" placeholder="City" />
            <Form.Control style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="state" placeholder="State" />
            <Form.Control style={{marginBottom:'15px'}}  onChange={handleChange}type="text" name="zipCode" placeholder="Zip Code" />
            <Form.Control style={{marginBottom:'25px'}}  onChange={handleChange}type="text" name="phoneNumber" placeholder="Phone Number (eg:+977-90000000)" />
            <div style={{textAlign:'center',marginBottom:'30px'}}>
            <Button  style={{width:'75%'}}variant="outline-success">Submit Customer </Button>
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
