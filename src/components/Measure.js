import React from 'react';
import Note from './Note';
import TabNote from './TabNote';
import Values from './values';

class Line extends React.Component {
  render() {
    return <rect x="0" y={this.props.base + (this.props.step * this.props.number)} width={Values.MEASURE_LENGTH} height="1"></rect>
  }
}

class MeasureSheet extends React.Component {
  render() {
    return [...Array(5).keys()].map(key => <Line key={key} number={key} base={Values.SHEET_BASE} step={Values.SHEET_STEP} />);
  }
}

class MeasureTab extends React.Component {
  render() {
    return [...Array(6).keys()].map(key => <Line key={key} number={key} base={Values.TAB_BASE} step={Values.TAB_STEP} />);
  }
}

class MeasureNotes extends React.Component {
  generateNotes(note, noteDuration, index, currentDuration) {
    return <g transform={'translate(' + (10 + currentDuration) + ', 0)'} key={index}>
      <Note duration={noteDuration} note={note} measure={this.props.measure} />
      <TabNote note={note} measure={this.props.measure} />
    </g>
  }

  render() {
    const notes = [];
    let currentDuration = 0;
    let index = 0;
    while (index < this.props.measure.notes.length) {
      const note = this.props.measure.notes[index];
      const noteDuration = note.duration / this.props.measure.divisions / 4;
      notes.push(this.generateNotes(note, noteDuration, index, currentDuration));
      index++;
      while (index < this.props.measure.notes.length && this.props.measure.notes[index].isChord) {
        notes.push(this.generateNotes(this.props.measure.notes[index], noteDuration, index, currentDuration));
        index++;
      }
      currentDuration += (Values.MEASURE_LENGTH - 20) * (noteDuration / (this.props.measure.time.beats / this.props.measure.time.beatType));
    }
    return notes
  }
}

class Measure extends React.Component {
  render() {
    const measure = this.props.measure;
    return (
      <g transform={'translate(' + (62 + Values.MEASURE_LENGTH * this.props.number) + ', 0)'}>
        <rect x="300" y="15" width="1" height="37" fill="black"></rect>
        <rect x="300" y="165" width="1" height="56" fill="black"></rect>
        <MeasureSheet measure={measure} />
        <MeasureTab measure={measure} />
        <MeasureNotes measure={measure} />
      </g>
    )
  }
}

export default Measure;