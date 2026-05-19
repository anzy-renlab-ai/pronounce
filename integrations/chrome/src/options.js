const defaults = { enabled: true, mode: 'click', rate: 0.95 };

function load() {
  chrome.storage.sync.get(defaults, (cfg) => {
    document.getElementById('enabled').checked = !!cfg.enabled;
    document.getElementById('mode').value = cfg.mode || 'click';
    document.getElementById('rate').value = cfg.rate;
    document.getElementById('rateLbl').textContent = (+cfg.rate).toFixed(2);
  });
}
document.getElementById('rate').addEventListener('input', (e) => {
  document.getElementById('rateLbl').textContent = (+e.target.value).toFixed(2);
});
document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set({
    enabled: document.getElementById('enabled').checked,
    mode: document.getElementById('mode').value,
    rate: +document.getElementById('rate').value,
  }, () => {
    const b = document.getElementById('save');
    const t = b.textContent;
    b.textContent = '✓ Saved';
    setTimeout(() => (b.textContent = t), 1200);
  });
});
load();
