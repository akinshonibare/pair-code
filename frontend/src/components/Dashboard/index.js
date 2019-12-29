import React, { Component } from "react";
import { connect } from "react-redux";

import PanelGroup from "react-panelgroup";
import Editor from "../Editor";
import JoinRoom from "../JoinRoom";
import CreateRoom from "../CreateRoom";
import RightSection from "../RightSection";
import VideoComponent from "../VideoComponent";
import {
  Layout,
  Button,
  Avatar,
  Empty,
  Popconfirm,
  Tag,
  Timeline,
  Spin
} from "antd";

import { runPythonCode } from "../../actions/runCode";
import { setRoom } from "../../actions/info";

import { isEmpty } from "lodash";
import {
  DashboardWrapper,
  LogoWrapper,
  RoomWrapper,
  UsersWrapper,
  DashboardEmptyWrapper
} from "./styles";

const { Header, Footer, Sider, Content } = Layout;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      Inroom: false,
      createroommodal: false,
      joinroommodal: false,
      result: undefined,
      codeFromFile: undefined,
      users: [],
      currentlyTyping: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      console.log(this.props.user);
    }
  }

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };

  setUsers = users => {
    this.setState({
      users: users
    });
  };

  setCurrentlyTyping = user => {
    this.setState({
      currentlyTyping: user
    });
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  createRoomVisible = visible => {
    this.setState({ createroommodal: visible });
  };

  joinRoomVisible = visible => {
    this.setState({ joinroommodal: visible });
  };

  setInRoom = value => {
    this.setState({
      Inroom: value
    });
  };

  confirm = e => {
    this.props.onLogoutClick();
  };

  run = (code, language) => {
    let value = code;
    if (language === "python") {
      runPythonCode(value).then(result => {
        this.setState({
          result: result.data.result
        });
      });
    } else {
      this.setState({
        result: "language not supported yet"
      });
    }
  };

  setCodeFromFile = code => {
    this.setState({
      codeFromFile: code
    });
  };

  render() {
    if (isEmpty(this.props.user)) {
      return (
        <DashboardEmptyWrapper>
          <Spin size="large" />
        </DashboardEmptyWrapper>
      );
    } else {
      return (
        <DashboardWrapper>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <LogoWrapper>
                <Avatar size="large" src={this.props.user.photo} />
              </LogoWrapper>
              <div style={{ textAlign: "center" }}>
                {this.state.Inroom && <Tag> {this.props.room.roomName}</Tag>}
                <UsersWrapper>
                  <Timeline>
                    {this.state.users.map(user => (
                      <Timeline.Item
                        color={
                          this.state.currentlyTyping === user ? "green" : "blue"
                        }
                        key={user}
                      >
                        {user.split("-")[0]}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </UsersWrapper>
              </div>
              <Popconfirm
                title="Are you sure you want to log out?"
                placement="right"
                onConfirm={this.confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  style={{
                    width: "50%",
                    position: "absolute",
                    bottom: "50px",
                    left: "25%"
                  }}
                >
                  log out
                </Button>
              </Popconfirm>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }}>
                {this.state.Inroom && <VideoComponent />}
              </Header>
              <Content style={{ margin: "0 16px" }}>
                {this.state.Inroom ? (
                  <PanelGroup style={{ background: "#fff", minHeight: "100%" }}>
                    <Editor
                      run={this.run}
                      codeFromFile={this.state.codeFromFile}
                      users={this.state.users}
                      setUsers={this.setUsers}
                      currentlyTyping={this.state.currentlyTyping}
                      setCurrentlyTyping={this.setCurrentlyTyping}
                    />
                    {this.state.result ? (
                      <RightSection result={this.state.result} />
                    ) : (
                      <div />
                    )}
                  </PanelGroup>
                ) : (
                  <RoomWrapper>
                    <Empty
                      description={<span>no workspace :(</span>}
                      style={{ marginBottom: "10px" }}
                    ></Empty>
                    <div>
                      <Button
                        type="primary"
                        onClick={() => this.createRoomVisible(true)}
                      >
                        Create Room
                      </Button>{" "}
                      /{" "}
                      <Button
                        type="primary"
                        onClick={() => this.joinRoomVisible(true)}
                      >
                        Join Room
                      </Button>
                    </div>
                  </RoomWrapper>
                )}
              </Content>
              <Footer style={{ textAlign: "center" }}>
                akin develops ©2019 Created by Akin Shonibare
              </Footer>
            </Layout>
          </Layout>
          <CreateRoom
            modalVisible={this.state.createroommodal}
            setModalVisible={this.createRoomVisible}
            setInRoom={this.setInRoom}
            setCodeFromFile={this.setCodeFromFile}
          />
          <JoinRoom
            modalVisible={this.state.joinroommodal}
            setModalVisible={this.joinRoomVisible}
            setInRoom={this.setInRoom}
          />
        </DashboardWrapper>
      );
    }
  }
}
//screencast, video, message, audio

function mapStateToProps(state) {
  return {
    user: state.data.user,
    room: state.data.room
  };
}

const actions = {
  setRoom
};

export default connect(mapStateToProps, actions)(Dashboard);
