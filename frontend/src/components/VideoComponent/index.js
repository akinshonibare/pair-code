import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { setRoom } from "../../actions/info";
import { getToken } from "../../actions/twilio";
import Video from "twilio-video";

import { VideoComponentWrapper } from "./styles";

class VideoComponent extends Component {
  constructor(props) {
    super();

    this.state = {
      identity: null,
      roomName: "" /* Will store the room name */,
      roomNameErr: false /* Track error for room name TextField. This will    enable us to show an error message when this variable is true */,
      previewTracks: null,
      localMediaAvailable: false /* Represents the availability of a LocalAudioTrack(microphone) and a LocalVideoTrack(camera) */,
      hasJoinedRoom: false,
      activeRoom: null // Track the current active room
    };
  }

  componentDidMount() {
    getToken(this.props.user).then(results => {
      const { identity, token } = results.data;
      this.setState({ identity, token });
    });
    this.setState({
      roomName: this.props.room.roomName
    });
    console.log(this.state.roomName);
  }

  componentWillUnmount() {
    if (this.state.hasJoinedRoom === true) {
      this.leaveRoom();
    }
  }

  joinRoom = () => {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      error => {
        console.log("Could not connect to Twilio: " + error.message);
      }
    );
  };

  // Attach the Tracks to the DOM.
  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }

  // Attach the Participant's Tracks to the DOM.
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  roomJoined = room => {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true // Removes ‘Join Room’ button and shows ‘Leave Room’
    });

    // Attach LocalParticipant's tracks to the DOM, if not already attached.
    var previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the room's participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on("participantConnected", participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on("trackAdded", (track, participant) => {
      console.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on("trackRemoved", (track, participant) => {
      this.detachTracks([track]);
    });

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);

      // eslint-disable-next-line
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  };

  detachTracks = tracks => {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  };

  detachParticipantTracks = participant => {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  };

  leaveRoom = () => {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  };

  render() {
    let showLocalTrack = this.state.localMediaAvailable ? (
      <VideoComponentWrapper>
        <div ref="localMedia" />
        <div ref="remoteMedia" id="remote-media" />
      </VideoComponentWrapper>
    ) : (
      ""
    );

    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <Button
        type="primary"
        shape="round"
        size="small"
        onClick={this.leaveRoom}
      >
        Leave Video Chat
      </Button>
    ) : (
      <Button type="primary" shape="round" size="small" onClick={this.joinRoom}>
        Join Video Chat
      </Button>
    );

    return (
      <VideoComponentWrapper>
        {joinOrLeaveRoomButton}
        {showLocalTrack}
      </VideoComponentWrapper>
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

export default connect(mapStateToProps, actions)(VideoComponent);
