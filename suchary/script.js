(function () {
  const LABELS = { windows: 'Windows', mac: 'macOS', linux: 'Linux' };

  function detectOs() {
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    const s = (platform + ' ' + navigator.userAgent).toLowerCase();
    if (/android|iphone|ipad|ipod/.test(s)) return null;
    if (/mac/.test(s)) return 'mac';
    if (/linux|x11|cros/.test(s)) return 'linux';
    if (/win/.test(s)) return 'windows';
    return null;
  }

  const detected = detectOs();
  const os = detected || 'windows';
  const info = { label: LABELS[os] };

  // Nazwy plików są zdefiniowane tylko w index.html (lista wersji).
  const source = document.querySelector('.version-item[data-os="' + os + '"] a[download]');
  const btn = document.getElementById('main-download');
  btn.href = source.getAttribute('href');
  btn.setAttribute('download', source.getAttribute('download'));
  btn.dataset.os = os;
  btn.textContent = 'Pobierz dla ' + info.label;

  document.getElementById('detect-note').textContent = detected
    ? 'Wykryto system: ' + info.label + '. Inne wersje znajdziesz poniżej.'
    : 'Nie wykryto systemu, domyślnie wybrano Windows. Inne wersje znajdziesz poniżej.';

  document.querySelectorAll('.version-item').forEach(function (item) {
    if (item.dataset.os === os) item.classList.add('current');
  });

  document.addEventListener('click', function (e) {
    const copy = e.target.closest('.copy-btn');
    if (copy) {
      const text = copy.parentElement.querySelector('code').textContent.trim();
      const done = function () {
        copy.textContent = 'Skopiowano!';
        setTimeout(function () { copy.textContent = 'Kopiuj'; }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done);
      return;
    }
    const a = e.target.closest('a[download]');
    if (!a || typeof umami === 'undefined') return;
    const item = a.closest('.version-item');
    umami.track('sucharyWeb-download-' + (a.dataset.os || (item && item.dataset.os) || os));
  });
})();