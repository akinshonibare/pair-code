import React, { Component } from "react";
import { RightSectionWrapper } from "./styles";

class FactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <RightSectionWrapper>
        <code>{this.props.result}</code>
      </RightSectionWrapper>
    );
  }
}

export default FactCard;
