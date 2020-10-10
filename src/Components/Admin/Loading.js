import React, { Component } from "react";

import "../asserts/loading.css";

// spinner
import Spinner from "../asserts/loading2.svg";

class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (this.props.show) {
      return (
        <div className="IS_Loader">
          <img src={Spinner} alt="" />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loader;
