import React, { Component } from "react";
import { connect } from "react-redux";

// Import Brace and the AceEditor Component
// eslint-disable-next-line
import brace from "brace";
import AceEditor from "react-ace";
import { Input, Select, Button } from "antd";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

import io from "socket.io-client";

// Import a Mode (language)
import "brace/mode/javascript";
import "brace/mode/python";

// Import a Theme (okadia, github, xcode etc)
import "brace/theme/solarized_dark";
import "brace/theme/github";
import "brace/theme/tomorrow";
import "brace/theme/monokai";

import "./styles.scss";

const Option = Select.Option;
const InputGroup = Input.Group;

const socket = io();

class Editor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      language: "javascript",
      theme: "tomorrow",
      code: "",
      room: "",
      senderPhoto: ""
    };

    socket.on("receive code", payload => this.updateCodeFromSockets(payload));
    socket.on("load users and code", () => this.sendUsersAndCode());
    socket.on("receive users and code", payload =>
      this.updateUsersAndCodeInState(payload)
    );
    socket.on("new user join", users => this.joinUser(users));
    socket.on("user left room", user => this.removeUser(user));
    socket.on("received message", payload => this.receivedMessage(payload));
  }

  componentWillMount() {
    if (this.props.codeFromFile) {
      this.setState({
        code: this.props.codeFromFile
      });
    }
  }

  onChange = newValue => {
    this.setState({
      code: newValue
    });
    this.props.setCurrentlyTyping(
      `${this.props.user.name}-${this.props.user.id}`
    );
    socket.emit("coding event", {
      code: newValue,
      room: this.state.room,
      currentlyTyping: `${this.props.user.name}-${this.props.user.id}`
    });
  };

  setTheme = newTheme => {
    this.setState({
      theme: newTheme
    });
  };

  joinUser = user => {
    const combinedUsers = [...this.props.users, user];
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {
      return user.length > 1;
    });
    this.props.setUsers(cleanUsers);
  };

  removeUser(user) {
    const newUsers = Object.assign([], this.props.users);
    const indexOfUserToDelete = this.props.users.findIndex(Olduser => {
      return Olduser === user.user;
    });
    newUsers.splice(indexOfUserToDelete, 1);
    this.props.setUsers(newUsers);
  }

  receivedMessage(payload) {
    console.log(payload);
    this.setState({
      senderPhoto: payload.photo
    });
    addResponseMessage(payload.message);
  }

  handleNewUserMessage = newMessage => {
    socket.emit("sent message", {
      message: newMessage,
      room: this.props.room.roomName,
      user: `${this.props.user.name}-${this.props.user.id}`,
      photo: this.props.user.photo
    });
  };

  componentDidMount() {
    const users = [
      ...this.props.users,
      `${this.props.user.name}-${this.props.user.id}`
    ];
    const user = `${this.props.user.name}-${this.props.user.id}`;
    this.props.setUsers(users);
    this.setState(
      {
        room: this.props.room.roomName,
        language: this.props.room.language
      },
      () => socket.emit("room", { room: this.state.room, user: user })
    );
  }

  componentWillUnmount() {
    socket.emit("leave room", {
      room: this.state.room,
      user: `${this.props.user.name}-${this.props.user.id}`
    });
  }

  updateCodeFromSockets = payload => {
    this.setState({
      code: payload.code
    });
    this.props.setCurrentlyTyping(payload.currentlyTyping);
  };

  updateUsersAndCodeInState = payload => {
    this.setState({
      code: payload.code,
      language: payload.language
    });
    let newUsers = [
      ...payload.users,
      `${this.props.user.name}-${this.props.user.id}`
    ];
    this.props.setUsers(newUsers);
  };

  sendUsersAndCode = () => {
    socket.emit("send users and code", {
      room: this.state.room,
      code: this.state.code,
      language: this.state.language,
      users: this.props.users
    });
  };

  downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    if (this.state.language === "javascript") {
      element.download = "file.js";
    } else if (this.state.language === "python") {
      element.download = "file.py";
    }
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    const { language, theme, code } = this.state;
    const THEMES = ["tomorrow", "solarized_dark", "monokai", "github"];

    return (
      <div className="editor">
        <div className="option">
          <InputGroup compact>
            <Input style={{ width: "75px" }} defaultValue="theme" disabled />
            <Select
              style={{ width: "125px" }}
              defaultValue={this.state.theme}
              onChange={this.setTheme}
            >
              {THEMES.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </InputGroup>
          <Button onClick={() => this.downloadFile()}>download code</Button>
          <Button
            onClick={() => this.props.run(this.state.code, this.state.language)}
          >
            run
          </Button>
        </div>
        <AceEditor
          mode={language}
          theme={theme}
          name="myeditor"
          onChange={this.onChange}
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            showPrintMargin: false
          }}
        />
        <Widget
          className="chat-widget"
          handleNewUserMessage={this.handleNewUserMessage}
          title="chat room"
          subtitle=""
          profileAvatar={this.state.senderPhoto}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.data.user,
    room: state.data.room
  };
}

const actions = {};

export default connect(mapStateToProps, actions)(Editor);
