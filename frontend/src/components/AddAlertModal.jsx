import { Form, Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import AxiosInstance from "../axiosInstance";
import { Row, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
export function AddAlertModal(props) {

  const navigate = useNavigate();
  const intialAlertState = {
    alert_name: '',
    alert_message: '',
    alert_service_area: []
  };
  const [alertData, setAlert] = useState(intialAlertState);
  const [loading, setLoading] = useState(false);
  const [serviceArea, setServiceArea] = useState([])

  useEffect(() => {
    async function getAllServiceArea() {
      try {
        const response = await AxiosInstance.get("api/map/getAllPolygons/");
        setServiceArea(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getAllServiceArea()
  }, [])

  //get all the input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setAlert((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  function handleChangeCheckbox(value) {
    console.log(value)
    const updatedCheckboxes = [...(alertData.alert_service_area)];

    if (alertData.alert_service_area.includes(value)) {
      // Remove the checkbox value if already present
      const index = updatedCheckboxes.indexOf(value);
      updatedCheckboxes.splice(index, 1);
    } else {
      // Add the checkbox value if not present
      updatedCheckboxes.push(value);
    }

    setAlert((prev) => ({
      ...prev,
      alert_service_area: updatedCheckboxes
    }));
  }

  //handle submit send customer data
  async function handleSubmit() {

     if (Object.values(alertData).some(value => value=="")) {
       alert('some data are missing.fill all')
       return
    }

    if (loading) {
      return;
    }
    setLoading(true);
    const checker = Object.values(alert).some((val) => val == "");
    if (checker) {
      alert("insert all the values properly");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "api/alert/addAlert/",
        alertData
      );
      alert(response.data.message);
      setLoading(false);
      setAlert(intialAlertState);
      props.alertUpdater()
    } catch (error) {
      console.log(error);

      setLoading(false);
      alert(error.response.data.error)
      setAlert(intialAlertState);
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
                  Add New Alert
                </h5>
                <Col
                >
                  <Form style={{}}>
                    <Form.Control
                      value={alertData.alert_name}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      name="alert_name"
                      placeholder="Alert Name"
                    />
                    <Form.Control
                      value={alertData.alert_message}
                      style={{ marginBottom: "15px" }}
                      onChange={handleChange}
                      type="text"
                      name="alert_message"
                      placeholder="Alert Message "
                    />

                    <div style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap' }}>
                      {serviceArea && serviceArea.map((area) => {

                        return (
                          <Form.Check
                            style={{ marginRight: '20px' }}
                            key={area.id}
                            type="checkbox"
                            id="area.id"
                            onChange={() => handleChangeCheckbox(area.id)}
                            label={`Service Area:${area.id}`}
                          />
                        )

                      })}

                    </div>

                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                      <Button
                        disabled={loading}
                        style={{ width: "75%" }}
                        variant="outline-success"
                        onClick={handleSubmit}
                      >
                        {loading ? "Loading" : "Submit Alert"}
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
