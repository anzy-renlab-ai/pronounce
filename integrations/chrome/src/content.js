// Pronounce — content script.
// Detects dictionary words on the page, shows a tooltip on click (not hover,
// to avoid spam), and speaks them via Web Speech API.

(async function () {
  const DICT_URL = chrome.runtime.getURL('src/dictionary.json');
  const ICON_URL = chrome.runtime.getURL('icons/icon-48.png');

  // Load dict
  let dict = {};
  try {
    const res = await fetch(DICT_URL);
    dict = await res.json();
  } catch (e) {
    console.warn('[Pronounce] failed to load dictionary', e);
    return;
  }

  // Load settings (defaults)
  const settings = await new Promise((r) =>
    chrome.storage.sync.get(
      { enabled: true, mode: 'click', rate: 0.95 },
      r,
    ),
  );
  if (!settings.enabled) return;

  // ---------- Web Speech ----------
  let voice = null;
  function pickVoice() {
    const vs = speechSynthesis.getVoices();
    if (!vs.length) return;
    voice =
      vs.find((v) => /Samantha/i.test(v.name)) ||
      vs.find((v) => /en-US/i.test(v.lang) && /Google/i.test(v.name)) ||
      vs.find((v) => /en/i.test(v.lang)) ||
      vs[0];
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = settings.rate;
    speechSynthesis.speak(u);
  }
  function chain(entry) {
    const seq = [entry.respelling_us, entry.respelling_us];
    const alts = (entry.alt_respelling_us || '')
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const a of alts.slice(0, 1)) seq.push(`or, ${a}`);
    let i = 0;
    const tick = () => {
      if (i >= seq.length) return;
      const u = new SpeechSynthesisUtterance(seq[i++]);
      if (voice) u.voice = voice;
      u.rate = settings.rate;
      u.onend = () => setTimeout(tick, 120);
      speechSynthesis.speak(u);
    };
    speechSynthesis.cancel();
    tick();
  }

  // ---------- Tooltip ----------
  let tip = null;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.id = 'pronounce-tip';
    tip.style.cssText =
      'position:fixed;z-index:2147483647;display:none;max-width:380px;font-family:-apple-system,sans-serif;font-size:13px;line-height:1.5;background:#222;color:#f4ecde;border:1px solid #454;border-radius:8px;padding:12px 14px;box-shadow:0 10px 30px -8px rgba(0,0,0,.7);';
    tip.addEventListener('click', (e) => e.stopPropagation());
    document.documentElement.appendChild(tip);
    return tip;
  }
  function hideTip() {
    if (tip) tip.style.display = 'none';
  }
  function showTipFor(entry, x, y) {
    const t = ensureTip();
    const ipa = (entry.ipa || '').replace(/^\/|\/$/g, '');
    const alts = (entry.alt_respelling_us || '')
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
    const badge =
      entry.confidence === 'creator-clarified'
        ? '✅'
        : entry.confidence === 'contested'
        ? '⚖️'
        : '·';
    t.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <img src="${ICON_URL}" width="20" height="20" style="border-radius:4px" alt="">
        <strong style="font-size:15px;color:#fff">${escapeHtml(entry.word)}</strong>
        ${ipa ? `<code style="color:#8fd694;background:none;padding:0">/${escapeHtml(ipa)}/</code>` : ''}
      </div>
      <div style="margin-top:6px"><em style="color:#c9bfa9">say:</em> <strong style="color:#8fd694">${escapeHtml(entry.respelling_us || '')}</strong></div>
      ${alts.length ? `<div style="margin-top:2px;color:#8a8270"><em>or:</em> ${alts.map((a) => `<strong>${escapeHtml(a)}</strong>`).join(' · ')}</div>` : ''}
      <div style="margin-top:8px;color:#8a8270;font-size:11px">${badge} ${escapeHtml(entry.confidence || '')}${entry.source_label ? ' · ' + escapeHtml(entry.source_label) : ''}</div>
      ${entry.notes ? `<div style="margin-top:8px;color:#e8e2d4;font-size:12px;font-style:italic">${escapeHtml(entry.notes.slice(0, 200))}</div>` : ''}
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid #333;display:flex;gap:12px;font-size:12px">
        <a href="#" data-pn-action="play" style="color:#8fd694;text-decoration:none">🔊 Play</a>
        ${entry.source_url ? `<a href="${escapeHtml(entry.source_url)}" target="_blank" rel="noopener" style="color:#8fd694;text-decoration:none">source ↗</a>` : ''}
        <a href="https://github.com/anzy-renlab-ai/pronounce" target="_blank" rel="noopener" style="color:#8a8270;text-decoration:none">★ star</a>
      </div>
    `;
    t.style.display = 'block';
    const r = t.getBoundingClientRect();
    const vw = window.innerWidth,
      vh = window.innerHeight;
    let nx = Math.min(x + 12, vw - r.width - 12);
    let ny = Math.min(y + 12, vh - r.height - 12);
    if (nx < 8) nx = 8;
    if (ny < 8) ny = 8;
    t.style.left = nx + 'px';
    t.style.top = ny + 'px';

    // wire play button
    const playEl = t.querySelector('[data-pn-action="play"]');
    if (playEl) playEl.onclick = (e) => {
      e.preventDefault();
      chain(entry);
    };
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));
  }

  // ---------- Word matching ----------
  // May START with a digit (the dictionary has `2FA`) but must contain a letter, so
  // bare numbers like `2024` or a port number are still not tokens.
  const WORD_RE = /(?=[a-zA-Z0-9_+#.-]*[a-zA-Z])[a-zA-Z0-9][a-zA-Z0-9_+#.-]*/g;
  function lookupTokenAt(text, offset) {
    WORD_RE.lastIndex = 0;
    let m;
    while ((m = WORD_RE.exec(text))) {
      const start = m.index,
        end = start + m[0].length;
      if (offset >= start && offset <= end) {
        // Try the exact token first so dotted entries (next.js, three.js) resolve.
        // If that misses, retry with trailing punctuation stripped: a sentence-final
        // "kubectl." / "YAML." otherwise matches the whole token, misses the key, and
        // the tooltip silently never appears — which is exactly where a dev clicks a
        // tech word in prose. Same fallback the VS Code hover already does.
        const k = m[0].toLowerCase();
        if (dict[k]) return dict[k];
        const trimmed = k.replace(/[.\-+#_]+$/, '');
        if (trimmed && trimmed !== k && dict[trimmed]) return dict[trimmed];
        return null;
      }
    }
    return null;
  }

  // ---------- Trigger ----------
  // Default mode: click-only (avoids hover spam on text-heavy pages).
  document.addEventListener(
    'click',
    (e) => {
      if (tip && tip.contains(e.target)) return; // click inside tooltip
      // Don't hijack normal clicks on links / inputs
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'a' || tag === 'button') {
        return hideTip();
      }
      // Require Alt or Cmd/Ctrl to avoid hijacking selections
      const triggerOnPlainClick = settings.mode === 'click';
      if (!triggerOnPlainClick && !(e.altKey || e.metaKey || e.ctrlKey)) return;

      // Find text node + offset
      let range;
      if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY);
      } else if (document.caretPositionFromPoint) {
        const p = document.caretPositionFromPoint(e.clientX, e.clientY);
        if (p) {
          range = document.createRange();
          range.setStart(p.offsetNode, p.offset);
          range.collapse(true);
        }
      }
      if (!range) return;
      const node = range.startContainer;
      if (!node || node.nodeType !== Node.TEXT_NODE) return hideTip();
      const text = node.textContent || '';
      const entry = lookupTokenAt(text, range.startOffset);
      if (!entry) return hideTip();
      showTipFor(entry, e.clientX, e.clientY);
    },
    true,
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideTip();
  });
  document.addEventListener('scroll', hideTip, true);

  console.log(`[Pronounce] active · ${Object.keys(dict).length} entries`);
})();
