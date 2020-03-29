async function parse(fileName) {
  const response = await fetch(fileName);
  const text = await response.text();
  const data = new window.DOMParser().parseFromString(text, 'text/xml');

  const music = {};
  music.name = data.getElementsByTagName('part-name')[0].childNodes[0].nodeValue;

  return music;
}

export { parse }