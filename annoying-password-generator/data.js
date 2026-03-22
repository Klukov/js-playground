// Homoglyph characters — visually identical to Latin letters
// Structure: { latin, script, unicode }
const HOMOGLYPHS = {
  // Cyrillic lowercase
  '\u0430': { latin: 'a', script: 'Cyrillic', unicode: 'U+0430' },
  '\u0435': { latin: 'e', script: 'Cyrillic', unicode: 'U+0435' },
  '\u043E': { latin: 'o', script: 'Cyrillic', unicode: 'U+043E' },
  '\u0440': { latin: 'p', script: 'Cyrillic', unicode: 'U+0440' },
  '\u0441': { latin: 'c', script: 'Cyrillic', unicode: 'U+0441' },
  '\u0445': { latin: 'x', script: 'Cyrillic', unicode: 'U+0445' },
  '\u0443': { latin: 'y', script: 'Cyrillic', unicode: 'U+0443' },
  '\u0456': { latin: 'i', script: 'Cyrillic', unicode: 'U+0456' },
  '\u0455': { latin: 's', script: 'Cyrillic', unicode: 'U+0455' },
  '\u0458': { latin: 'j', script: 'Cyrillic', unicode: 'U+0458' },
  // Cyrillic uppercase
  '\u0410': { latin: 'A', script: 'Cyrillic', unicode: 'U+0410' },
  '\u0412': { latin: 'B', script: 'Cyrillic', unicode: 'U+0412' },
  '\u0415': { latin: 'E', script: 'Cyrillic', unicode: 'U+0415' },
  '\u041D': { latin: 'H', script: 'Cyrillic', unicode: 'U+041D' },
  '\u041A': { latin: 'K', script: 'Cyrillic', unicode: 'U+041A' },
  '\u041C': { latin: 'M', script: 'Cyrillic', unicode: 'U+041C' },
  '\u041E': { latin: 'O', script: 'Cyrillic', unicode: 'U+041E' },
  '\u0420': { latin: 'P', script: 'Cyrillic', unicode: 'U+0420' },
  '\u0421': { latin: 'C', script: 'Cyrillic', unicode: 'U+0421' },
  '\u0422': { latin: 'T', script: 'Cyrillic', unicode: 'U+0422' },
  '\u0425': { latin: 'X', script: 'Cyrillic', unicode: 'U+0425' },
  '\u0406': { latin: 'I', script: 'Cyrillic', unicode: 'U+0406' },
  // Greek lowercase
  '\u03BF': { latin: 'o', script: 'Greek', unicode: 'U+03BF' },
  '\u03BD': { latin: 'v', script: 'Greek', unicode: 'U+03BD' },
  // Greek uppercase
  '\u0391': { latin: 'A', script: 'Greek', unicode: 'U+0391' },
  '\u0392': { latin: 'B', script: 'Greek', unicode: 'U+0392' },
  '\u0395': { latin: 'E', script: 'Greek', unicode: 'U+0395' },
  '\u0397': { latin: 'H', script: 'Greek', unicode: 'U+0397' },
  '\u0399': { latin: 'I', script: 'Greek', unicode: 'U+0399' },
  '\u039A': { latin: 'K', script: 'Greek', unicode: 'U+039A' },
  '\u039C': { latin: 'M', script: 'Greek', unicode: 'U+039C' },
  '\u039D': { latin: 'N', script: 'Greek', unicode: 'U+039D' },
  '\u039F': { latin: 'O', script: 'Greek', unicode: 'U+039F' },
  '\u03A1': { latin: 'P', script: 'Greek', unicode: 'U+03A1' },
  '\u03A4': { latin: 'T', script: 'Greek', unicode: 'U+03A4' },
  '\u03A7': { latin: 'X', script: 'Greek', unicode: 'U+03A7' },
  '\u0396': { latin: 'Z', script: 'Greek', unicode: 'U+0396' },
  // IPA
  '\u0251': { latin: 'a', script: 'IPA', unicode: 'U+0251' },
  '\u0261': { latin: 'g', script: 'IPA', unicode: 'U+0261' },
  '\u026A': { latin: 'i', script: 'IPA', unicode: 'U+026A' },
  // Fullwidth Latin
  '\uFF41': { latin: 'a', script: 'Fullwidth', unicode: 'U+FF41' },
  '\uFF42': { latin: 'b', script: 'Fullwidth', unicode: 'U+FF42' },
  '\uFF43': { latin: 'c', script: 'Fullwidth', unicode: 'U+FF43' },
  '\uFF44': { latin: 'd', script: 'Fullwidth', unicode: 'U+FF44' },
  '\uFF45': { latin: 'e', script: 'Fullwidth', unicode: 'U+FF45' },
  '\uFF46': { latin: 'f', script: 'Fullwidth', unicode: 'U+FF46' },
  '\uFF47': { latin: 'g', script: 'Fullwidth', unicode: 'U+FF47' },
  '\uFF48': { latin: 'h', script: 'Fullwidth', unicode: 'U+FF48' },
  '\uFF49': { latin: 'i', script: 'Fullwidth', unicode: 'U+FF49' },
  '\uFF4A': { latin: 'j', script: 'Fullwidth', unicode: 'U+FF4A' },
  '\uFF4B': { latin: 'k', script: 'Fullwidth', unicode: 'U+FF4B' },
  '\uFF4C': { latin: 'l', script: 'Fullwidth', unicode: 'U+FF4C' },
  '\uFF4D': { latin: 'm', script: 'Fullwidth', unicode: 'U+FF4D' },
  '\uFF4E': { latin: 'n', script: 'Fullwidth', unicode: 'U+FF4E' },
  '\uFF4F': { latin: 'o', script: 'Fullwidth', unicode: 'U+FF4F' },
  '\uFF50': { latin: 'p', script: 'Fullwidth', unicode: 'U+FF50' },
  '\uFF51': { latin: 'q', script: 'Fullwidth', unicode: 'U+FF51' },
  '\uFF52': { latin: 'r', script: 'Fullwidth', unicode: 'U+FF52' },
  '\uFF53': { latin: 's', script: 'Fullwidth', unicode: 'U+FF53' },
  '\uFF54': { latin: 't', script: 'Fullwidth', unicode: 'U+FF54' },
  '\uFF55': { latin: 'u', script: 'Fullwidth', unicode: 'U+FF55' },
  '\uFF56': { latin: 'v', script: 'Fullwidth', unicode: 'U+FF56' },
  '\uFF57': { latin: 'w', script: 'Fullwidth', unicode: 'U+FF57' },
  '\uFF58': { latin: 'x', script: 'Fullwidth', unicode: 'U+FF58' },
  '\uFF59': { latin: 'y', script: 'Fullwidth', unicode: 'U+FF59' },
  '\uFF5A': { latin: 'z', script: 'Fullwidth', unicode: 'U+FF5A' },
};

// Look-alike characters — not identical but visually similar to Latin letters
const LOOK_ALIKES = {
  // Greek lowercase
  '\u03B1': { latin: 'a', script: 'Greek', unicode: 'U+03B1' },  // α — alpha
  '\u03BA': { latin: 'k', script: 'Greek', unicode: 'U+03BA' },  // κ — kappa
  '\u03C1': { latin: 'p', script: 'Greek', unicode: 'U+03C1' },  // ρ — rho
  // Cyrillic lowercase
  '\u043A': { latin: 'k', script: 'Cyrillic', unicode: 'U+043A' },  // к — ka
  '\u043C': { latin: 'm', script: 'Cyrillic', unicode: 'U+043C' },  // м — em
};

// Build reverse lookup: latin letter → array of replacement characters
function buildReverseLookup(charMap) {
  const reverse = {};
  for (const [fakeChar, info] of Object.entries(charMap)) {
    const latin = info.latin;
    if (!reverse[latin]) reverse[latin] = [];
    reverse[latin].push(fakeChar);
  }
  return reverse;
}

const HOMOGLYPH_REPLACEMENTS = buildReverseLookup(HOMOGLYPHS);
const LOOK_ALIKE_REPLACEMENTS = buildReverseLookup(LOOK_ALIKES);
