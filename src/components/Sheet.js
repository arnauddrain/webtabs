import React from 'react';
import Line from './Line'

class Sheet extends React.Component {
  render() {
    return <svg width="1080" height="800">
      <Line number={0}></Line>
      <Line number={1}></Line>
    </svg>
  }
}

export default Sheet;