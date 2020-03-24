import React from 'react';

class Line extends React.Component {
  render() {
    return <rect x="0" y={this.props.base + (this.props.step * this.props.number)} width="300" height="1"></rect>
  }
}

class BlockNotes extends React.Component {
  render() {
    const lines = [...Array(5).keys()].map(key => <Line key={key} number={key} base={15} step={9} />);
    return lines
  }
}

class BlockTab extends React.Component {
  render() {
    const lines = [...Array(6).keys()].map(key => <Line key={key} number={key} base={165} step={11} />);
    return lines
  }
}

class LineBlock extends React.Component {
  render() {
    return (
      <g transform={'translate(' + (62 + 300 * this.props.number) + ', 0)'}>
        <rect x="300" y="15" width="1" height="37" fill="black"></rect>
        <rect x="300" y="165" width="1" height="56" fill="black"></rect>
        <BlockNotes />
        <BlockTab />
      </g>
    )
  }
}

export default LineBlock;