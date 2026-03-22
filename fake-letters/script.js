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
    if (HOMOGLYPHS[ch]) {
      const info = HOMOGLYPHS[ch];
      found.push({ pos: i + 1, char: ch, ...info });
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
