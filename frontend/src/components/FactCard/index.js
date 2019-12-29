import React, { Component } from "react";
import { Card } from "antd";
import Highlight from "react-highlight";

import { FactCardWrapper } from "./styles";

class FactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FactCardWrapper>
        <Card
          title={this.props.snippet.card_title}
          bordered={true}
          style={{ width: 600 }}
        >
          <p>{this.props.snippet.card_description}</p>
          <Highlight language="javascript">
            {this.props.snippet.card_code}
          </Highlight>
        </Card>
      </FactCardWrapper>
    );
  }
}

export default FactCard;
