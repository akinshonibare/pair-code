// imports

import React, { Component } from "react";
import { Button, Icon, Spin } from "antd";
// import FactCard from "../FactCard";
import { getsnippets } from "../../actions/snippets";
import {
  LandingWrapper,
  LeftContainer,
  RightContainer,
  Footer,
  Header,
  Description
} from "./styles";
import IMAGE from "../../assets/undraw_code.svg";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentDidMount() {
    getsnippets().then(res => {
      this.setState({
        data: res.data.result
      });
    });
  }

  render() {
    // const data = this.state.data;

    return (
      <LandingWrapper>
        {/* {data ? <FactCard snippet={data} /> : <Spin size="large" />} */}
        <LeftContainer>
          <Header>Pair Code</Header>
          <Description>
            Real-time online collaborative coding platorm with video call
            functionality
          </Description>
          <Button
            style={{ width: "100%" }}
            onClick={this.props.onGithubLoginClick}
          >
            <Icon type="github" />
            Enter Using Github
          </Button>
          <Button
            style={{ width: "100%", marginTop: "5%" }}
            onClick={this.props.onAnonLoginClick}
          >
            <Icon type="user" />
            Enter Anonymously
          </Button>
        </LeftContainer>
        <RightContainer>
          <img src={IMAGE} alt="collaborative coding" />
          <Footer>akin develops ©2019 Created by Akin Shonibare</Footer>
        </RightContainer>
      </LandingWrapper>
    );
  }
}

export default Landing;
