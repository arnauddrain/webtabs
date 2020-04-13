import React from 'react';
import Note from './Note';

import Values from './values';

class Line extends React.Component {
  render() {
    return <rect x="0" y={this.props.base + (this.props.step * this.props.number)} width={Values.LINE_LENGTH} height="1"></rect>
  }
}

class MeasureSheet extends React.Component {
  render() {
    const notes = [];
    let currentDuration = 0;
    this.props.measure.notes.forEach((note, index) => {
      const noteDuration = note.duration / this.props.measure.divisions / 4;
      notes.push(
        <g transform={'translate(' + (10 + currentDuration) + ', 0)'} key={index}>
          <Note duration={noteDuration} note={note} measure={this.props.measure} />
        </g>);
      currentDuration += (Values.LINE_LENGTH - 20) * (noteDuration / (this.props.measure.time.beats / this.props.measure.time.beatType));
    });
    const lines = [...Array(5).keys()].map(key => <Line key={key} number={key} base={Values.SHEET_BASE} step={Values.SHEET_STEP} />);
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
    const lines = [...Array(6).keys()].map(key => <Line key={key} number={key} base={Values.TAB_BASE} step={Values.TAB_STEP} />);
    return lines
  }
}

class Measure extends React.Component {
  render() {
    return (
      <g transform={'translate(' + (62 + Values.LINE_LENGTH * this.props.number) + ', 0)'}>
        <rect x="300" y="15" width="1" height="37" fill="black"></rect>
        <rect x="300" y="165" width="1" height="56" fill="black"></rect>
        <MeasureSheet measure={this.props.measure} />
        <MeasureTab measure={this.props.measure} />
      </g>
    )
  }
}

export default Measure;