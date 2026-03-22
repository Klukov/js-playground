// Check if a character is from a non-Latin suspicious script
// Allows: Basic Latin, Latin Extended (accented letters like ę, ö, ñ, ß, etc.),
// common punctuation, digits, whitespace, symbols
function isNonLatinSuspicious(ch) {
  const code = ch.codePointAt(0);
  // Basic Latin (ASCII): U+0000–U+007F
  if (code <= 0x007F) return false;
  // Latin Extended-A: U+0100–U+017F (Polish ę, ł, Czech ř, etc.)
  if (code >= 0x0100 && code <= 0x017F) return false;
  // Latin Extended-B: U+0180–U+024F
  if (code >= 0x0180 && code <= 0x024F) return false;
  // Latin Extended Additional: U+1E00–U+1EFF
  if (code >= 0x1E00 && code <= 0x1EFF) return false;
  // Latin-1 Supplement: U+0080–U+00FF (ö, ü, ñ, ß, à, é, etc.)
  if (code >= 0x0080 && code <= 0x00FF) return false;
  // Combining Diacritical Marks: U+0300–U+036F
  if (code >= 0x0300 && code <= 0x036F) return false;
  // General Punctuation: U+2000–U+206F
  if (code >= 0x2000 && code <= 0x206F) return false;
  // Currency Symbols: U+20A0–U+20CF
  if (code >= 0x20A0 && code <= 0x20CF) return false;
  // Common symbols, arrows, math: U+2100–U+27FF
  if (code >= 0x2100 && code <= 0x27FF) return false;
  // Emoji & misc symbols: U+1F000–U+1FAFF
  if (code >= 0x1F000 && code <= 0x1FAFF) return false;
  // Variation selectors (emoji modifiers): U+FE00–U+FE0F
  if (code >= 0xFE00 && code <= 0xFE0F) return false;
  // Everything else is suspicious (Cyrillic, Greek, Arabic, CJK, etc.)
  return true;
}

function detectScript(code) {
  if (code >= 0x0370 && code <= 0x03FF) return 'Greek';
  if (code >= 0x1F00 && code <= 0x1FFF) return 'Greek Extended';
  if (code >= 0x0400 && code <= 0x04FF) return 'Cyrillic';
  if (code >= 0x0500 && code <= 0x052F) return 'Cyrillic Supplement';
  if (code >= 0x0600 && code <= 0x06FF) return 'Arabic';
  if (code >= 0x0590 && code <= 0x05FF) return 'Hebrew';
  if (code >= 0x3040 && code <= 0x309F) return 'Hiragana';
  if (code >= 0x30A0 && code <= 0x30FF) return 'Katakana';
  if (code >= 0x4E00 && code <= 0x9FFF) return 'CJK';
  if (code >= 0x0E00 && code <= 0x0E7F) return 'Thai';
  if (code >= 0x10A0 && code <= 0x10FF) return 'Georgian';
  if (code >= 0x0530 && code <= 0x058F) return 'Armenian';
  if (code >= 0x0900 && code <= 0x097F) return 'Devanagari';
  if (code >= 0xFF00 && code <= 0xFFEF) return 'Fullwidth/Halfwidth';
  if (code >= 0x13A0 && code <= 0x13FF) return 'Cherokee';
  return 'Unknown script';
}

const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const cleanBtn = document.getElementById('clean-btn');
const resultBox = document.getElementById('result-box');
const resultTitle = document.getElementById('result-title');
const resultDetails = document.getElementById('result-details');

function resetResult() {
  resultBox.classList.add('hidden');
  resultBox.classList.remove('success', 'danger');
  resultTitle.textContent = '';
  resultDetails.textContent = '';
  checkBtn.disabled = false;
}

function checkText() {
  const text = textInput.value;
  if (!text.trim()) {
    resultBox.classList.remove('hidden', 'success');
    resultBox.classList.add('danger');
    resultTitle.textContent = '⚠️ Please enter text to check';
    resultDetails.textContent = '';
    checkBtn.disabled = true;
    return;
  }

  const found = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (SUSPICIOUS_CHARS[ch]) {
      const info = SUSPICIOUS_CHARS[ch];
      found.push({ pos: i + 1, char: ch, ...info });
    } else if (isNonLatinSuspicious(ch)) {
      const code = ch.codePointAt(0);
      const hex = 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
      found.push({ pos: i + 1, char: ch, latin: '?', script: detectScript(code), unicode: hex });
    }
  }

  resultBox.classList.remove('hidden');
  if (found.length === 0) {
    resultBox.classList.add('success');
    resultBox.classList.remove('danger');
    resultTitle.textContent = '✅ All clear! No suspicious characters found.';
    resultDetails.textContent = '';
  } else {
    resultBox.classList.add('danger');
    resultBox.classList.remove('success');
    resultTitle.textContent = `❌ Found ${found.length} suspicious character(s)!`;
    const lines = found.map(f =>
      `Position ${f.pos}: "${f.char}" → looks like Latin "${f.latin}" (${f.script}, ${f.unicode})`
    );
    resultDetails.textContent = lines.join('\n');
  }
  checkBtn.disabled = true;
}

function clearAll() {
  textInput.value = '';
  resetResult();
}

const charCount = document.getElementById('char-count');

function autoResize() {
  textInput.style.height = 'auto';
  textInput.style.height = textInput.scrollHeight + 'px';
}

function updateCharCount() {
  charCount.textContent = textInput.value.length;
}

textInput.addEventListener('input', () => {
  resetResult();
  updateCharCount();
  autoResize();
});
checkBtn.addEventListener('click', checkText);
cleanBtn.addEventListener('click', () => {
  clearAll();
  updateCharCount();
  autoResize();
});
