const fontFamilyAliases = {
  'DM Sans': 'DM Sans Variable',
  Inter: 'Inter Variable',
  Roboto: 'Roboto Flex Variable',
  'Roboto Flex': 'Roboto Flex Variable',
  'Source Sans 3': 'Source Sans 3',
  'Source Sans 3 Variable': 'Source Sans 3',
  'IBM Plex Sans': 'IBM Plex Sans Variable',
  Lora: 'Lora Variable',
  Merriweather: 'Merriweather Variable',
  Montserrat: 'Inter Variable',
  Georgia: 'Lora Variable',
  'Playfair Display': 'Lora Variable',
  'Times New Roman': 'Times New Roman',
  'Courier Prime': 'IBM Plex Sans Variable',
  'JetBrains Mono': 'IBM Plex Sans Variable',
};

const availableFontFamilies = new Set(Object.values(fontFamilyAliases));

export function resolveFontFamily(fontFamily) {
  if (fontFamilyAliases[fontFamily]) return fontFamilyAliases[fontFamily];
  return availableFontFamilies.has(fontFamily) ? fontFamily : 'DM Sans Variable';
}
