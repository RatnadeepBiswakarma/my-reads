import React from "react";
import "./Styles.css";

const Notify = props => (
  <div className="all-notification-container">
    <div className="notification-container slideUp">
      <img className="thumbnail" src={props.smallThumbnail} />
      <div>
        <p>Added to shelf</p>
        {/* <small>{props.bookTitle}</small> */}
      </div>
    </div>
  </div>
);

export default Notify;
