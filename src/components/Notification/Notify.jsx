import React from "react";
import "./Styles.css";

const Notify = props => (
  <div className="notification-container slideUp">
    <img
      className="thumbnail"
      src={props.smallThumbnail}
    />
    <div className="info-container">
      <p className="notification-heading">Added to Shelf 🗸</p>
      <p className="notification-content">{props.description}</p>
    </div>
  </div>
);

export default Notify;
