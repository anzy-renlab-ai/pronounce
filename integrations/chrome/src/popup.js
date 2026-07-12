(async function () {
  const DICT_URL = chrome.runtime.getURL('src/dictionary.json');
  let dict = {};
  try {
    dict = await (await fetch(DICT_URL)).json();
  } catch (e) {
    document.getElementById('results').innerHTML =
      '<div class="empty">Failed to load dictionary.</div>';
    return;
  }
  const arr = Object.values(dict);
  document.getElementById('count').textContent = `${arr.length} sourced entries`;

  // Voice picker
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
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;

  function chain(entry) {
    speechSynthesis.cancel();
    const seq = [entry.respelling_us, entry.respelling_us];
    const alts = (entry.alt_respelling_us || '')
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const a of alts.slice(0, 1)) seq.push(`or, ${a}`);
    let i = 0;
    // The rate slider on the options page writes chrome.storage.sync — the popup
    // used to hardcode 0.92 and ignore it, so a user who slowed playback down (the
    // whole point of a pronunciation tool) saw no effect here. Same default the
    // content script uses.
    chrome.storage.sync.get({ rate: 0.95 }, ({ rate }) => {
      const tick = () => {
        if (i >= seq.length) return;
        const u = new SpeechSynthesisUtterance(seq[i++]);
        if (voice) u.voice = voice;
        u.rate = rate;
        u.onend = () => setTimeout(tick, 120);
        speechSynthesis.speak(u);
      };
      tick();
    });
  }

  const $q = document.getElementById('q');
  const $r = document.getElementById('results');
  let cursor = 0,
    current = [];

  function render() {
    if (!current.length) {
      $r.innerHTML = '<div class="empty">No match. Open a PR — every star helps.</div>';
      return;
    }
    $r.innerHTML = current
      .map(
        (e, i) => `
      <div class="row ${i === cursor ? 'sel' : ''}" data-i="${i}">
        <div><span class="w">${escapeHtml(e.word)}</span> &nbsp; <span class="ipa">${e.ipa ? escapeHtml(e.ipa) : ''}</span></div>
        <div class="resp">"${escapeHtml(e.respelling_us || '')}"${e.alt_respelling_us ? ` · or "${escapeHtml(e.alt_respelling_us.split('|')[0].trim())}"` : ''}</div>
      </div>`,
      )
      .join('');
    $r.querySelectorAll('.row').forEach((row) => {
      row.addEventListener('click', () => {
        cursor = +row.dataset.i;
        chain(current[cursor]);
        render();
      });
    });
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

  function update() {
    const q = $q.value.trim().toLowerCase();
    if (!q) current = arr.slice(0, 10);
    else
      current = arr
        .filter(
          (e) =>
            e.word.toLowerCase().includes(q) ||
            (e.respelling_us && e.respelling_us.toLowerCase().includes(q)) ||
            (e.alt_respelling_us && e.alt_respelling_us.toLowerCase().includes(q)),
        )
        .slice(0, 25);
    cursor = 0;
    render();
  }

  $q.addEventListener('input', update);
  $q.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursor = Math.min(current.length - 1, cursor + 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cursor = Math.max(0, cursor - 1);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (current[cursor]) chain(current[cursor]);
    }
  });
  update();
})();
