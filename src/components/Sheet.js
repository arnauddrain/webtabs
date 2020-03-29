import React from 'react';
import Line from './Line'

class Sheet extends React.Component {
  render() {
    console.log('props', this.props)
    return <>
      <h1>{this.props.music.name}</h1>
      <svg width="1080" height="800">
        <Line number={0}></Line>
        <Line number={1}></Line>
      </svg>
    </>
  }
}

export default Sheet;