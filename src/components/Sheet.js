import React from 'react';
import Line from './Line'

class Sheet extends React.Component {
  render() {
    return <svg width="100" height="100">
      <Line></Line>
    </svg>
  }
}

export default Sheet;