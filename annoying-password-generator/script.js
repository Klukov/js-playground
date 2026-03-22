const LATIN_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const passwordDisplay = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const lengthInput = document.getElementById('length-input');
const optDash = document.getElementById('opt-dash');
const optHomoglyphs = document.getElementById('opt-homoglyphs');
const optLookalikes = document.getElementById('opt-lookalikes');
const minSpecialInput = document.getElementById('min-special');

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function pickRandom(arr) {
  return arr[randomInt(arr.length)];
}

/**
 * Generate a raw Latin password of the given length.
 * If replaceableChars is provided and minSpecial > 0, ensures at least
 * minSpecial positions contain characters from replaceableChars.
 */
function generateLatinPassword(length, replaceableChars, minSpecial) {
  const chars = [];
  for (let i = 0; i < length; i++) {
    chars.push(LATIN_CHARS[randomInt(LATIN_CHARS.length)]);
  }

  if (replaceableChars.length > 0 && minSpecial > 0) {
    const guaranteed = Math.min(minSpecial, length);
    const indices = Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
    for (let i = 0; i < guaranteed; i++) {
      chars[indices[i]] = pickRandom(replaceableChars);
    }
  }

  return chars.join('');
}

/**
 * Collect selected dictionaries based on checked options.
 * Returns an array of reverse-lookup maps (latin → [fakeChars]).
 */
function collectDictionaries() {
  const dictionaries = [];
  if (optHomoglyphs.checked) dictionaries.push(HOMOGLYPH_REPLACEMENTS);
  if (optLookalikes.checked) dictionaries.push(LOOK_ALIKE_REPLACEMENTS);
  return dictionaries;
}

/**
 * Build a random one-to-one reverse lookup for this generation.
 * For each latin letter that has replacements, pick exactly one random fake char.
 * This ensures consistency — the same latin letter always maps to the same fake char
 * within a single password, so a reader won't notice two different-looking variants.
 */
function buildRandomReverseLookup(dictionaries) {
  const allFakes = {};
  for (const dict of dictionaries) {
    for (const [latin, fakes] of Object.entries(dict)) {
      if (!allFakes[latin]) allFakes[latin] = [];
      allFakes[latin].push(...fakes);
    }
  }

  const lookup = {};
  for (const [latin, fakes] of Object.entries(allFakes)) {
    lookup[latin] = pickRandom(fakes);
  }
  return lookup;
}

/**
 * Replace characters in the password using the given one-to-one lookup.
 *
 * Picks exactly minSpecial random replaceable positions and swaps them
 * with their fake character from the lookup.
 * If minSpecial is 0 or there are no replaceable positions, returns the password unchanged.
 */
function sprinkleReplacements(password, lookup, minSpecial) {
  if (Object.keys(lookup).length === 0) return password;

  const chars = [...password];
  const replaceableIndices = [];

  for (let i = 0; i < chars.length; i++) {
    if (lookup[chars[i]]) {
      replaceableIndices.push(i);
    }
  }

  if (replaceableIndices.length === 0 || minSpecial <= 0) return password;

  const shuffled = replaceableIndices.sort(() => Math.random() - 0.5);
  const count = Math.min(minSpecial, shuffled.length);

  for (let i = 0; i < count; i++) {
    const idx = shuffled[i];
    chars[idx] = lookup[chars[idx]];
  }

  return chars.join('');
}

/**
 * Calculate group sizes for dash-separated password.
 *
 * Base group size is 5. Remainder handling:
 *   remainder 0 → all groups of 5
 *   remainder 1 → first group gets 6, rest 5
 *   remainder 2 → first two groups get 6, rest 5
 *   remainder 3 → last two groups get 4, rest 5
 *   remainder 4 → last group gets 4, rest 5
 *
 * Returns an array of group sizes, e.g. [6, 5, 5, 5] for length 21.
 */
function calculateDashGroups(totalLength) {
  if (totalLength <= 5) return [totalLength];

  const remainder = totalLength % 5;
  const baseGroupCount = Math.floor(totalLength / 5);

  if (remainder === 0) {
    return Array(baseGroupCount).fill(5);
  }

  if (remainder === 1) {
    const groups = Array(baseGroupCount).fill(5);
    groups[0] = 6;
    return groups;
  }

  if (remainder === 2) {
    const groups = Array(baseGroupCount).fill(5);
    groups[0] = 6;
    groups[1] = 6;
    return groups;
  }

  if (remainder === 3) {
    const groupCount = baseGroupCount + 1;
    const groups = Array(groupCount).fill(5);
    groups[groupCount - 2] = 4;
    groups[groupCount - 1] = 4;
    return groups;
  }

  // remainder === 4
  const groupCount = baseGroupCount + 1;
  const groups = Array(groupCount).fill(5);
  groups[groupCount - 1] = 4;
  return groups;
}

/**
 * Apply dash separators to a password string based on calculated groups.
 */
function applyDashSeparators(password, groups) {
  const parts = [];
  let offset = 0;
  for (const size of groups) {
    parts.push(password.slice(offset, offset + size));
    offset += size;
  }
  return parts.join('-');
}

/**
 * Main generation: build password, apply replacements, format with dashes.
 */
function generate() {
  const length = Math.max(6, Math.min(100, parseInt(lengthInput.value) || 20));
  lengthInput.value = length;

  const minSpecial = Math.max(0, parseInt(minSpecialInput.value) || 1);
  const dictionaries = collectDictionaries();
  const lookup = buildRandomReverseLookup(dictionaries);

  const replaceableChars = Object.keys(lookup);
  let password = generateLatinPassword(length, replaceableChars, minSpecial);
  password = sprinkleReplacements(password, lookup, minSpecial);

  if (optDash.checked) {
    const groups = calculateDashGroups(length);
    password = applyDashSeparators(password, groups);
  }

  passwordDisplay.textContent = password;
}

function copyToClipboard() {
  const text = passwordDisplay.textContent;
  if (!text || text.startsWith('Click')) return;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.classList.add('copied');
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.textContent = '📋 Copy';
    }, 1500);
  });
}

generateBtn.addEventListener('click', () => {
  generate();
  if (typeof umami !== 'undefined') umami.track('annoyingPasswordGenerator-button-generate');
});
copyBtn.addEventListener('click', copyToClipboard);

// Generate a default password on page load
generate();
