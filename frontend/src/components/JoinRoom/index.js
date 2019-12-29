import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Input } from "antd";

import { setRoom } from "../../actions/info";

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: ""
    };
  }

  setRoom = e => {
    this.setState({
      room: e.target.value
    });
  };

  getRoom = () => {
    let room = {
      roomName: this.state.room
    };
    this.props.setRoom(room);
    this.props.setModalVisible(false);
    this.props.setInRoom(true);
  };

  render() {
    return (
      <Modal
        title="Join Room"
        visible={this.props.modalVisible}
        onOk={() => this.getRoom()}
        onCancel={() => this.props.setModalVisible(false)}
      >
        <Input
          addonBefore="room"
          style={{ width: "100%" }}
          value={this.state.room}
          onChange={this.setRoom}
        />
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

export default connect(mapStateToProps, actions)(JoinRoom);
