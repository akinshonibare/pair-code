import React, { Component } from "react";
import { Modal, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import randomstring from "randomstring";
import { setRoom } from "../../actions/info";
import { postFile } from "../../actions/postFileAction";

// import { RoomButton, RoomButtonInput } from "./styles";

const InputGroup = Input.Group;
const Option = Select.Option;

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "python",
      room: randomstring.generate({ length: 12, charset: "alphabetic" })
    };
  }

  setLanguage = value => {
    this.setState({
      language: value
    });
  };

  setRoom = () => {
    let room = {
      language: this.state.language,
      roomName: this.state.room
    };

    this.props.setRoom(room);
    this.props.setModalVisible(false);
    this.props.setInRoom(true);
  };

  handleUploadFile = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    // '/files' is your node.js route that triggers middleware
    postFile(data).then(res => {
      this.props.setCodeFromFile(res.data.result);
    });
  };

  render() {
    const LANGUAGES = ["python", "javascript"];
    return (
      <Modal
        title="Create Room"
        visible={this.props.modalVisible}
        onOk={() => this.setRoom()}
        onCancel={() => this.props.setModalVisible(false)}
      >
        <Input
          addonBefore="room"
          style={{ width: "100%" }}
          defaultValue={this.state.room}
          disabled
        />
        <br />
        <br />
        <InputGroup compact>
          <Select
            style={{ width: "50%" }}
            defaultValue={this.state.language}
            onChange={this.setLanguage}
          >
            {LANGUAGES.map((item, i) => (
              <Option key={i} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Button style={{ width: "50%" }} className="croom-button">
            Upload Starter Code File
            <input
              type="file"
              name="file"
              id="code-file"
              className="inputfile"
              onChange={this.handleUploadFile}
            />
          </Button>
        </InputGroup>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.data.user,
    room: state.data.room
  };
}

const actions = {
  setRoom
};

export default connect(mapStateToProps, actions)(CreateRoom);
