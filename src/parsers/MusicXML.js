class MusicXML {
  constructor() {
    this.attributes = {};
  }

  getTextValue(domElement, tagName, attributeName) {
    const elements = domElement.getElementsByTagName(tagName);
    if (!elements.length) {
      return this.attributes[tagName + attributeName];
    }
    let value;
    if (attributeName) {
      const element = [...elements].find(e => e.hasAttribute(attributeName));
      if (!element) {
        return this.attributes[tagName + attributeName];
      }
      value = element.getAttribute(attributeName);
    } else {
      value = elements[0].childNodes[0].nodeValue;
    }
    this.attributes[tagName + attributeName] = value;
    return value;
  }

  getBooleanValue(domElement, tagName) {
    return (domElement.getElementsByTagName(tagName).length > 0);
  }

  getNumberValue(domElement, tagName, attributeName) {
    return parseInt(this.getTextValue(domElement, tagName, attributeName));
  }

  parseNote(noteXML) {
    return {
      rest: this.getBooleanValue(noteXML, 'rest'),
      pitch: {
        step: this.getTextValue(noteXML, 'step'),
        octave: this.getNumberValue(noteXML, 'octave')
      },
      tab: {
        fret: this.getNumberValue(noteXML, 'fret'),
        string: this.getNumberValue(noteXML, 'string')
      },
      duration: this.getNumberValue(noteXML, 'duration'),
      type: this.getTextValue(noteXML, 'type'),
      isChord: this.getBooleanValue(noteXML, 'chord')
    };
  }

  parseMeasure(measureXML) {
    let measure = {
      number: measureXML.getAttribute('number'),
      divisions: this.getNumberValue(measureXML, 'divisions'),
      time: {
        beats: this.getNumberValue(measureXML, 'beats'),
        beatType: this.getNumberValue(measureXML, 'beat-type')
      },
      tempo: this.getNumberValue(measureXML, 'sound', 'tempo'),
      clef: {
        sign: this.getTextValue(measureXML, 'sign'),
        line: this.getNumberValue(measureXML, 'line'),
        octaveChange: this.getNumberValue(measureXML, 'clef-octave-change')
      },
      notes: [...measureXML.getElementsByTagName('note')].map(n => this.parseNote(n))
    };
    return measure;
  }

  parsePart(partXML) {
    return {
      id: partXML.id,
      measures: [...partXML.getElementsByTagName('measure')].map(m => this.parseMeasure(m))
    };
  }

  async parse(fileName) {
    const response = await fetch(fileName);
    const text = await response.text();
    const dataXML = new window.DOMParser().parseFromString(text, 'text/xml');

    return {
      name: this.getTextValue(dataXML, 'part-name'),
      parts: [...dataXML.getElementsByTagName('part')].map(p => this.parsePart(p))
    };
  }
}

export default MusicXML