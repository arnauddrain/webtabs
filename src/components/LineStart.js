import React from 'react';

class LeftLine extends React.Component {
  render() {
    return <rect x="12" y={this.props.base + (this.props.step * this.props.number)} width="50" height="1"></rect>
  }
}

function LeftSheet() {
  const lines = [...Array(5).keys()].map(key => <LeftLine key={key} number={key} base={15} step={9} />);
  return (
    <>
      {lines}
      <image href="/svg/GClef.svg" x="15" y="5" width="20"></image>
    </>
  )
}

function LeftTab() {
  const lines = [...Array(6).keys()].map(key => <LeftLine key={key} number={key} base={165} step={11} />);
  return (
    <g fill="black">
      {lines}
      <text x="18" y="185" fontSize="22">T</text>
      <text x="18" y="201" fontSize="22">A</text>
      <text x="18" y="217" fontSize="22">B</text>
    </g>
  )
}

class LineStart extends React.Component {
  render() {
    return (
      <>
        <rect x="5" y="5" width="3" height="225" fill="black"></rect>
        <path d=" M5,5 C6,5,6,5,18,2 C12,8,6,8,6,8 z"
          fill="black" stroke="none"></path>
        <path d=" M5,230 C6,230,6,230,18,233 C12,227,6,227,6,227 z"
          fill="black" stroke="none"></path>
        <rect x="12" y="15" width="1" height="205" fill="black"></rect>
        <LeftSheet />
        <LeftTab />
      </>
    )
  }
}

export default LineStart;