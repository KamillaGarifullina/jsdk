/** @param {Object<string, any>} blockExports */
export function registerBlocks(blockExports) {
  for (let blockName in blockExports) {
    let tagName = [...blockName].reduce((name, char) => {
      if (char.toUpperCase() === char) {
        char = '-' + char.toLowerCase();
      }
      return (name += char);
    }, '');
    if (tagName.startsWith('-')) {
      tagName = tagName.replace('-', '');
    }
    blockExports[blockName].reg?.(tagName);
  }
}
