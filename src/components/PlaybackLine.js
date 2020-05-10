import React from 'react';
import Values from './values';

class PlaybackLine extends React.Component {
  constructor(props) {
    super(props);
    this.start = 0;
    this.rafId = 0;
    this.playing = false;
    this.measure = 0;
    this.previousMeasuresDuration = 0;
    this.state = {
      x: 0,
      y: 0
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
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
      this.start = null;
      this.measure = this.props.playback.measure;
      this.previousMeasuresDuration = 0;
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
    if (this.playing) {
      return <rect width="1" height="240" x={this.state.x} y={this.state.y} fill="blue"></rect>
    } else {
      return null;
    }
  }
}

export default PlaybackLine;