import React from "react";
import Filter from "./Filter";
import "./Service.css";
import Tag from "./Tag";

const Service = () => {
  return (
    <>
    <Filter/>
    <Tag/>
      <div className="service">
        <div className="heading">
          <h3>Servie Area 1</h3>
        </div>

        <div className="left_container">
          <button className="btn1">Send Message</button>
          <button className="btn2">Resolve Alert</button>
        </div>
      </div>
    </>
  );
};

export default Service;
