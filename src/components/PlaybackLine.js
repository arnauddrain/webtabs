import React from 'react';
import Values from './values';

class PlaybackLine extends React.Component {
  render() {
    const playback = this.props.playback;
    if (playback.playing) {
      const x = 62 + Values.LINE_LENGTH * playback.measure % 3;
      const y = (20 + 300 * Math.floor(playback.measure / 3));
      return <rect width="1" height="240" x={x} y={y} fill="blue">
        <animate attributeType="XML" attributeName="x" from={x} to={x + Values.LINE_LENGTH}
          dur="10s" repeatCount="indefinite" />
      </rect>
    } else {
      return null;
    }
  }
}

export default PlaybackLine;