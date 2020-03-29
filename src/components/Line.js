import React from 'react';
import LineStart from './LineStart';
import LineBlock from './LineBlock';

class Line extends React.Component {
  render() {
    const measures = this.props.music.parts[0].measures.slice(this.props.number * 3, this.props.number * 3 + 3);
    const measuresElem = measures.map((m, index) => <LineBlock key={m.number} number={index} />);
    return (
      <g transform={'translate(0, ' + (20 + 300 * this.props.number) + ')'}>
        <LineStart />
        {measuresElem}
      </g>
    )
  }
}

export default Line;