import { Form, Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import AxiosInstance from "../axiosInstance";
import { Row, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
export function EditCustomerModal(props) {

  const navigate = useNavigate();
  const intialCustomerState = {
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    city: "",
    state: "",
    phone_number: "",
    zip_code: "",
    address: "",
  };
  const [customer, setCustomer] = useState(intialCustomerState);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(-1)

  //get all the input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function getUser() {
      const response = await AxiosInstance.get(`api/customer/getCustomer/${props.customerId}`)
      const data = response.data
      setCustomer({
        first_name: data.customer.first_name,
        last_name: data.customer.last_name,
        email: data.customer.email,
        phone_number: data.customer.phone_number,
        country: data.country,
        zip_code: data.zip_code,
        city: data.city,
        state: data.state,
        address: data.address,

      })
    }
    getUser()
  }, [])

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
      const response = await AxiosInstance.put(
        `api/customer/updateCustomer/${props.customerId}/`,
        customer
      );
      alert(response.data.message);
      setLoading(false);
      const data = response.data.data
      setCustomer({
        first_name: data.customer.first_name,
        last_name: data.customer.last_name,
        email: data.customer.email,
        phone_number: data.customer.phone_number,
        country: data.country,
        zip_code: data.zip_code,
        city: data.city,
        state: data.state,
        address: data.address
      })
      props.updater()
    } catch (error) {
      alert(error.error);
      setCustomer(intialCustomerState);
      setLoading(false);
    }
  }

  const handleClose = () => { props.setModal(false) };


  return (
    <>
      <Modal show={true} onHide={handleClose} size="xl" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body style={{ padding: "0px" }}>

          <div
            style={{
              display: "flex",
              paddingTop: "1rem",
              paddingBottom: '1rem',
              justifyContent: "center",
            }}
          >
            <Col sm={9} md={5}>
              <div style={{ backgroundColor: "white" }}>
                <h5 style={{ textAlign: "center", paddingBottom: "20px" }}>
                  Edit Customer
                </h5>
                <Col
                >
                  <Form style={{}}>
                    <Form.Control
                      value={customer.email}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      disabled
                      name="email"
                      placeholder="Email"
                    />
                    <Form.Control
                      value={customer.first_name}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                    />
                    <Form.Control
                      value={customer.last_name}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      name="last_name"
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
                      value={customer.zip_code}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      name="zip_code"
                      placeholder="Zip Code"
                    />
                    <Form.Control
                      value={customer.phone_number}
                      style={{ marginBottom: "25px" }}
                      onChange={handleChange}
                      type="text"
                      name="phone_number"
                      disabled
                      placeholder="Phone Number (eg:+977-90000000)"
                    />
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                      <Button
                        disabled={loading}
                        style={{ width: "75%" }}
                        variant="outline-success"
                        onClick={handleSubmit}
                      >
                        {loading ? "Loading" : "Edit Customer"}
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
