import React from 'react';
import Line from './Line'

class Sheet extends React.Component {
  render() {
    const nbLines = Math.ceil(this.props.music.parts[0].measures.length / 3);
    const height = nbLines * 310;
    let lines = [...Array(nbLines).keys()].map((l, i) => <Line number={i} key={i} music={this.props.music} />);
    return <>
      <h1>{this.props.music.name}</h1>
      <svg width="1080" height={height}>
        {lines}
      </svg>
    </>
  }
}

export default Sheet;