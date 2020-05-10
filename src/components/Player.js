import React from 'react';

class Player extends React.Component {
  play = () => {
    this.props.playbackChange({
      playing: true
    });
  }

  pause = () => {
    this.props.playbackChange({
      playing: false
    });
  }

  render = () => {
    let button;
    if (this.props.playback.playing) {
      button = <span className="PlayerAction" onClick={this.pause}>&#x23F8;</span>
    } else {
      button = <span className="PlayerAction" onClick={this.play}>&#x23F5;</span>
    }
    return (
      <div className="Player">
        <div className="PlayerInner">
          {button}
        </div>
      </div>
    )
  }
}

export default Player;