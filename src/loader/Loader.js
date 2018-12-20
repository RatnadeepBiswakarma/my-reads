import React, { Component } from "react";
import "./loader.css";
class Loader extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="loader-circle">
          <div className="one" />
          <div className="two" />
          <div className="three" />
          <div className="four" />
        </div>
        <div>
          <p className="status">Loading Library..</p>
        </div>
      </div>
    );
  }
}

export default Loader;
