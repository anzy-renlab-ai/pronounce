// ========== Sounds-like ==========
// Someone hears "engine x" and types exactly that; a substring search over the
// spelling cannot answer it. Both sides are reduced to a vowel-free skeleton so
// they land on the same key. This is the second copy of this function — the
// first ships inside tools/build-site.sh for the v1/zh/browse pages —
// and tools/test-site-search.mjs fails if the two stop agreeing.
function soundKey(s) {
  return String(s || '').toLowerCase().replace(/[^a-z]+/g, '')
    .replace(/([aeiou])h/g, '$1')
    .replace(/you/g, 'u').replace(/ph/g, 'f').replace(/ck/g, 'k')
    .replace(/qu/g, 'kw').replace(/wh/g, 'w').replace(/x/g, 'ks')
    .replace(/c(?=[eiy])/g, 's').replace(/c/g, 'k').replace(/q/g, 'k')
    .replace(/z/g, 's').replace(/(.)\1+/g, '$1')
    .replace(/[aeiou]+/g, 'a').replace(/a/g, '');
}
function entrySoundKeys(d) {
  return [d.w, d.resp, d.alt]
    .filter(Boolean).join('|').split('|')
    .map(soundKey).filter((k) => k.length >= 3);
}

// ========== Command Palette ==========
function CommandPalette({ open, onClose, registerEgg }) {
  const [q, setQ] = React.useState('');
  const [cursor, setCursor] = React.useState(0);
  const inputRef = React.useRef(null);

  const { results, phonetic } = React.useMemo(() => {
    const source = window.DICT_ALL || DICT;
    if (!q.trim()) return { results: source.slice(0, 8), phonetic: false };
    const needle = q.toLowerCase();
    const spelled = source.filter(d =>
      d.w.toLowerCase().includes(needle) ||
      d.resp.toLowerCase().includes(needle) ||
      (d.alt && d.alt.toLowerCase().includes(needle))
    );
    // Spelling first, sounds-like only when the spelling found nothing, so a
    // normal query never mixes phonetic noise into its results.
    if (spelled.length) return { results: spelled.slice(0, 12), phonetic: false };
    const qk = soundKey(q);
    if (qk.length < 3) return { results: [], phonetic: false };
    const heard = source.filter(d => entrySoundKeys(d).indexOf(qk) !== -1);
    return { results: heard.slice(0, 12), phonetic: heard.length > 0 };
  }, [q]);

  React.useEffect(() => {
    if (open) {
      setQ('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      registerEgg('palette');
    }
  }, [open]);

  React.useEffect(() => { setCursor(0); }, [q]);

  const onKey = (e) => {
    if (e.key === 'Escape') { onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(results.length - 1, c + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(0, c - 1)); }
    else if (e.key === 'Enter') {
      const r = results[cursor];
      if (r) SpeechCtx.playEntry(r);
    }
  };

  return (
    <div className={`palette-mask ${open ? 'open' : ''}`} onClick={onClose} aria-hidden={!open}>
      <div
        className="palette"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette — search dictionary"
      >
        <div className="input-row">
          <span className="glyph">say-it</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="type a word, or how it sounds — nginx, engine x…"
          />
          <span className="esc">ESC</span>
        </div>
        <div className="results">
          {results.length === 0 && (
            <div style={{ padding: '36px 22px', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 12 }}>
              No match. Submit a PR — every star helps.
            </div>
          )}
          {phonetic && (
            <div style={{ padding: '10px 22px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 11 }}>
              no spelling match — these sound like it
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={r.w}
              className={`row ${i === cursor ? 'active' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => SpeechCtx.playEntry(r)}
            >
              <div className="pw">{r.w}</div>
              <div className="presp">"{r.resp}"{r.alt ? <span style={{ color: 'var(--ink-3)' }}> · or "{r.alt}"</span> : null}</div>
              <div className="pipa">{r.ipa}</div>
              <div className="pkey">↵ play</div>
            </div>
          ))}
        </div>
        <div className="foot">
          <div className="keys">
            <span><kbd>↑↓</kbd> navigate</span>
            <span><kbd>↵</kbd> hear</span>
            <span><kbd>esc</kbd> close</span>
          </div>
          <div>canonical MP3 · Web Speech fallback</div>
        </div>
      </div>
    </div>
  );
}
window.CommandPalette = CommandPalette;

// ========== Easter-egg HUD ==========
function EggHud({ found, open, onClose }) {
  if (!open) return null;
  const total = EGGS.length;
  const got = found.size;
  return (
    <div className="egg-hud">
      <h6>
        <span>Easter eggs · {got}/{total}</span>
        <span className="close" onClick={onClose}>×</span>
      </h6>
      <ul>
        {EGGS.map(e => (
          <li key={e.id} className={found.has(e.id) ? 'found' : ''}>{e.label}</li>
        ))}
      </ul>
    </div>
  );
}
window.EggHud = EggHud;

// ========== Toast ==========
function Toast({ msg, eyebrow, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="t-eyebrow">{eyebrow}</div>
      <div>{msg}</div>
    </div>
  );
}
window.Toast = Toast;

// ========== Karaoke (Konami) ==========
function Karaoke({ on, onClose }) {
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  const PHRASES = [
    { say: 'koob control', word: 'kubectl' },
    { say: 'engine X', word: 'nginx' },
    { say: 'jay-son', word: 'JSON' },
    { say: 'pie-dantic', word: 'Pydantic' },
    { say: 'jang-go', word: 'Django' },
    { say: 'lay-tek', word: 'LaTeX' },
  ];

  React.useEffect(() => {
    if (!on) return;
    setPhraseIdx(0);
    let i = 0;
    let disposed = false;
    let nextTimer = null;
    let activeRequestId = null;
    const speakNext = () => {
      if (disposed || i >= PHRASES.length) return;
      const p = PHRASES[i];
      setPhraseIdx(i);
      const requestId = SpeechCtx.speak(p.say, {
        onDone: ({ requestId: completedRequestId, status }) => {
          if (
            disposed ||
            completedRequestId !== activeRequestId ||
            status !== 'ended'
          ) return;
          activeRequestId = null;
          i++;
          nextTimer = setTimeout(speakNext, 350);
        },
      });
      activeRequestId = requestId;
    };
    speakNext();
    return () => {
      disposed = true;
      if (nextTimer !== null) clearTimeout(nextTimer);
      if (activeRequestId !== null) {
        SpeechCtx.cancel(activeRequestId);
        activeRequestId = null;
      }
    };
  }, [on]);

  if (!on) return null;
  const cur = PHRASES[phraseIdx];
  return (
    <div className={`karaoke ${on ? 'on' : ''}`}>
      <div className="ex" onClick={onClose}>esc · exit karaoke</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '.2em' }}>
        ↑ ↑ ↓ ↓ ← → ← → · DEVELOPER KARAOKE
      </div>
      <div className="lyric">
        <span className="hit">{cur.word}</span> <span style={{ color: 'var(--ink-3)' }}>·</span> <span style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: '0.5em' }}>"{cur.say}"</span>
      </div>
      <div className="sub">{phraseIdx + 1} / {PHRASES.length} · sing along</div>
    </div>
  );
}
window.Karaoke = Karaoke;

// ========== Ripple effect ==========
window.spawnRipple = function (x, y, color = '#8fd694') {
  const el = document.createElement('div');
  el.className = 'ripple';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.borderColor = color;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
};
