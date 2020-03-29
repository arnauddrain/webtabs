async function parse(fileName) {
  const response = await fetch(fileName);
  const text = await response.text();
  const dataXML = new window.DOMParser().parseFromString(text, 'text/xml');

  const music = {};

  music.name = dataXML.getElementsByTagName('part-name')[0].childNodes[0].nodeValue;

  music.parts = [];
  const partsXML = dataXML.getElementsByTagName('part');
  for (const partXML of partsXML) {
    const part = {};
    part.id = partXML.id;
    part.measures = [];
    const measuresXML = partXML.getElementsByTagName('measure');
    for (const measureXML of measuresXML) {
      const measure = {};
      measure.number = measureXML.getAttribute('number');
      part.measures.push(measure);
    }
    music.parts.push(part);
  }
  return music;
}

export { parse }