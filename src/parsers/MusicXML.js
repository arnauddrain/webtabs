function getTextValue(domElement, tagName) {
  const elements = domElement.getElementsByTagName(tagName);
  if (!elements.length) {
    return null;
  }
  return elements[0].childNodes[0].nodeValue;
}

function parseNote(noteXML) {
  return {
    pitch: {
      step: getTextValue(noteXML, 'step'),
      octave: getTextValue(noteXML, 'octave')
    },
    duration: getTextValue(noteXML, 'duration'),
    type: getTextValue(noteXML, 'type')
  };
}

function parseMeasure(measureXML) {
  return {
    number: measureXML.getAttribute('number'),
    time: {
      beats: getTextValue(measureXML, 'beats'),
      beatType: getTextValue(measureXML, 'beat-type')
    },
    clef: {
      sign: getTextValue(measureXML, 'sign'),
      line: getTextValue(measureXML, 'line')
    },
    notes: [...measureXML.getElementsByTagName('note')].map(n => parseNote(n))
  };
}

function parsePart(partXML) {
  return {
    id: partXML.id,
    measures: [...partXML.getElementsByTagName('measure')].map(m => parseMeasure(m))
  };
}

async function parse(fileName) {
  const response = await fetch(fileName);
  const text = await response.text();
  const dataXML = new window.DOMParser().parseFromString(text, 'text/xml');

  return {
    name: getTextValue(dataXML, 'part-name'),
    parts: [...dataXML.getElementsByTagName('part')].map(p => parsePart(p))
  };
}

export { parse }