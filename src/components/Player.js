import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true
    }
  }

  onClick = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  render() {
    let button;
    if (this.state.playing) {
      button = <>&#x23F5;</>
    } else {
      button = <>&#x23F8;</>
    }
    return (
      <div className="Player">
        <div className="PlayerInner">
          <span className="PlayerAction" onClick={this.onClick}>
            {button}
          </span>
        </div>
      </div>
    )
  }
}

export default Player;