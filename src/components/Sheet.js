import React from 'react';
import Line from './Line';
import PlaybackLine from './PlaybackLine';

class Sheet extends React.Component {
  render() {
    const nbLines = Math.ceil(this.props.music.parts[0].measures.length / 3);
    const height = 20 + nbLines * 300;
    let lines = [...Array(nbLines).keys()].map((l, i) => <Line number={i} key={i} music={this.props.music} />);
    return <>
      <h1>{this.props.music.name}</h1>
      <svg width="1080" height={height}>
        <PlaybackLine playback={this.props.playback} music={this.props.music} />
        {lines}
      </svg>
    </>
  }
}

export default Sheet;