import MIDISounds from 'midi-sounds-react';
import React from 'react';
import Values from './values';

class PlaybackLine extends React.Component {
  constructor(props) {
    super(props);
    this.rafId = 0;
    this.playing = false;
    this.state = {
      x: 0,
      y: 0
    }
  }

  getValue = (letter) => {
    return {
      'A': 9,
      'B': 10,
      'C': 0,
      'D': 2,
      'E': 4,
      'F': 5,
      'G': 7
    }[letter];
  }

  reset = () => {
    this.start = null;
    this.previousMeasuresDuration = 0;
    this.currentNotes = [];
    this.measure = this.props.playback.measure;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  computeCurrentNote(measure, progress) {
    let noteDuration = 0;
    for (let i = 0; i < measure.notes.length; i++) {
      if (!measure.notes[i].isChord) {
        noteDuration += 60 / measure.tempo * 1000 * (measure.notes[i].duration / measure.divisions)
        if (noteDuration >= progress) {
          const notes = [measure.notes[i]];
          i++;
          while (i < measure.notes.length && measure.notes[i].isChord) {
            notes.push(measure.notes[i]);
            i++;
          }
          return notes;
        }
      }
    }
    return [];
  }

  animate = (timestamp) => {
    if (this.start === null) {
      this.start = timestamp;
    }
    let progress = timestamp - this.start - this.previousMeasuresDuration;
    let measure = this.props.music.parts[0].measures[this.measure];
    let measureDuration = 60 / measure.tempo * measure.time.beats * 1000;
    while (progress > measureDuration) {
      this.measure++;
      this.previousMeasuresDuration += measureDuration;
      progress -= measureDuration;
      measure = this.props.music.parts[0].measures[this.measure];
      measureDuration = 60 / measure.tempo * measure.time.beats * 1000;
    }
    const newNotes = this.computeCurrentNote(measure, progress);
    if (newNotes[0] !== this.currentNotes[0]) {
      this.currentNotes = newNotes;
      const duration = 60 / measure.tempo * (newNotes[0].duration / measure.divisions);
      const soundNotes = newNotes.filter(note => !note.rest);
      this.midiSounds.playChordNow(244, soundNotes.map(note => this.getValue(note.pitch.step) + 12 * note.pitch.octave), duration);
    }
    const x = 62 + Values.MEASURE_LENGTH * (this.measure % 3) + (progress / measureDuration) * Values.MEASURE_LENGTH;
    const y = (20 + 300 * Math.floor(this.measure / 3));
    this.setState({
      x: x,
      y: y
    });
    this.rafId = requestAnimationFrame(this.animate);
  }

  handlePlayingChange = (playing) => {
    this.playing = playing;
    if (this.playing) {
      this.reset();
      this.rafId = requestAnimationFrame(this.animate);
    } else {
      cancelAnimationFrame(this.rafId);
    }
  }

  render() {
    const playback = this.props.playback;
    if (playback.playing !== this.playing) {
      this.handlePlayingChange(playback.playing);
    }
    let rect = null;
    if (this.playing) {
      rect = <rect width="1" height="240" x={this.state.x} y={this.state.y} fill="blue"></rect>;
    }
    return (
      <>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[244]} />
        {rect}
      </>
    )
  }
}

export default PlaybackLine;