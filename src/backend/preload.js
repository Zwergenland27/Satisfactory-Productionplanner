const { Titlebar } = require('custom-electron-titlebar')

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    backgroundColor: '#333',
    shadow: true
  });
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})