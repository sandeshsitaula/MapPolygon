import { Form, Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import AxiosInstance from "../axiosInstance";
import { Row, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
export function CustomerAddModal(props) {

  const navigate = useNavigate();
  const intialCustomerState = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    state: "",
    phoneNumber: "",
    zipCode: "",
    address: "",
  };
  const [customer, setCustomer] = useState(intialCustomerState);
  const [loading, setLoading] = useState(false);


  //get all the input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handle submit send customer data
  async function handleSubmit() {
    if (loading) {
      return;
    }
    setLoading(true);
    const checker = Object.values(customer).some((val) => val == "");
    if (checker) {
      alert("insert all the values properly");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "api/customer/addCustomer/",
        customer
      );
      alert(response.data.message);
      setLoading(false);
      setCustomer(intialCustomerState);
      props.customerUpdater()
    } catch (error) {
      console.log(error);
      alert(error.error);
      setCustomer(intialCustomerState);
      setLoading(false);
    }
  }

    const handleClose = () => {props.setModal(false)};

  return (
    <>
      <Modal show={true}  onHide={handleClose} size="xl" centered   backdrop="static" keyboard={false}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body style={{ padding: "0px" }}>

      <div
        style={{
          display: "flex",
          paddingTop: "1rem",
          paddingBottom:'1rem',
          justifyContent: "center",
        }}
      >
        <Col sm={9} md={5}>
          <div style={{ backgroundColor: "white" }}>
            <h5 style={{ textAlign: "center", paddingBottom: "20px" }}>
              Add New Customer
            </h5>
            <Col
            >
              <Form style={{  }}>
                <Form.Control
                  value={customer.email}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <Form.Control
                  value={customer.firstName}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <Form.Control
                  value={customer.lastName}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                <Form.Control
                  value={customer.country}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="country"
                  placeholder="Country"
                />
                <Form.Control
                  value={customer.city}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="city"
                  placeholder="City"
                />
                <Form.Control
                  value={customer.state}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="state"
                  placeholder="State"
                />
                <Form.Control
                  value={customer.address}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <Form.Control
                  value={customer.zipCode}
                  style={{ marginBottom: "15px" }}
                  onChange={handleChange}
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                />
                <Form.Control
                  value={customer.phoneNumber}
                  style={{ marginBottom: "25px" }}
                  onChange={handleChange}
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number (eg:+977-90000000)"
                />
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <Button
                    disabled={loading}
                    style={{ width: "75%" }}
                    variant="outline-success"
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading" : "Submit Customer"}
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    style={{ width: "75%", marginTop: "25px" }}
                    variant="outline-danger"
                  >
                    Go Back(Home)
                  </Button>
                </div>
              </Form>
            </Col>
          </div>
        </Col>
      </div>
      </Modal.Body>
      </Modal>
    </>
  );
}
