function CustomerList(props){
    console.log('hell')
      const data=props.data
      console.log(data)
    const customer=data.customer
    return(
           <div
              key={customer.id}
              style={{
                backgroundColor: "white",
                marginLeft: "20px",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
                width: "300px",
              }}
            >
              <h5>
                FullName:{customer.first_name} {customer.last_name}
              </h5>
              <h5>Email:{customer.email}</h5>
              <h5>PhoneNumber:{customer.phone_number}</h5>
              <h5>Country:{data.country}</h5>
              <h5>State:{data.state}</h5>
              <h5>City:{data.city}</h5>
              <h5>Address:{data.address}</h5>
              <h5>ZipCode:{data.zip_code}</h5>
            </div>
    )
}

export function CustomerDetail(props){
    const data=props.customers
    console.log(data)
    return(
        <>
            <h5
              style={{
                color: "white",
                paddingBottom: "0px",
                margin: "0",
                backgroundColor: "#242424",
              }}
            >
              All Users Within This Area:{" "}
            </h5>
          <div
            style={{
              display: "flex",
              paddingTop: "20px",
              backgroundColor: "#242424",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {data.map((customers) => (
              <CustomerList key={customers.customer.id} data={customers} />
                  ))}
          </div>
          </>
    )
}
