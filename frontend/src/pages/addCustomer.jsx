import axios from 'axios'
import {Form,Button,Col} from 'react-bootstrap'
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
    return (
        <>
        <div style={{backgroundColor:'#2e8a99',display:'flex',height:'100vh',paddingTop:'5rem',justifyContent:'center'}}>
        <Col sm={9} md={5}>
            <div style={{backgroundColor:'white'}}>
            <h5 style={{textAlign:'center',paddingBottom:'20px'}}>Add New Customer</h5>
            <Col sm={9} md={12} style={{display:'flex',justifyContent:'center'}}>
            <Form style={{width:'80%'}}>
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="First Name" />
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="Last Name" />
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="Country" />
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="City" />
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="State" />
            <Form.Control style={{marginBottom:'15px'}} type="text" name="firstName" placeholder="Zip Code" />
            <Form.Control style={{marginBottom:'25px'}} type="text" name="firstName" placeholder="Phone Number" />
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
