import React from 'react';

const LINE_LENGTH = 300;

class Line extends React.Component {
  render() {
    return <rect x="0" y={this.props.base + (this.props.step * this.props.number)} width={LINE_LENGTH} height="1"></rect>
  }
}

class MeasureSheet extends React.Component {
  render() {
    const notes = [];
    let currentDuration = 0;
    this.props.measure.notes.forEach((note, index) => {
      const noteDuration = note.duration * (1 / this.props.measure.time.beatType);
      let icon;
      if (noteDuration >= 1) {
        icon = 'Round';
      } else if (noteDuration >= 0.5) {
        icon = 'White';
      } else {
        icon = 'Black';
      }
      notes.push(<image key={index} href={'/svg/' + icon + 'Note.svg'} x={10 + currentDuration} y="20"></image>);
      currentDuration += LINE_LENGTH * note.duration / this.props.measure.time.beats;
    });
    const lines = [...Array(5).keys()].map(key => <Line key={key} number={key} base={15} step={9} />);
    return (
      <>
        {notes}
        {lines}
      </>
    )
  }
}

class MeasureTab extends React.Component {
  render() {
    const lines = [...Array(6).keys()].map(key => <Line key={key} number={key} base={165} step={11} />);
    return lines
  }
}

class Measure extends React.Component {
  render() {
    return (
      <g transform={'translate(' + (62 + 300 * this.props.number) + ', 0)'}>
        <rect x="300" y="15" width="1" height="37" fill="black"></rect>
        <rect x="300" y="165" width="1" height="56" fill="black"></rect>
        <MeasureSheet measure={this.props.measure} />
        <MeasureTab measure={this.props.measure} />
      </g>
    )
  }
}

export default Measure;