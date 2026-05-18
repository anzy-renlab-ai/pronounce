// ========== Command Palette ==========
function CommandPalette({ open, onClose, registerEgg }) {
  const [q, setQ] = React.useState('');
  const [cursor, setCursor] = React.useState(0);
  const inputRef = React.useRef(null);

  const results = React.useMemo(() => {
    const source = window.DICT_ALL || DICT;
    if (!q.trim()) return source.slice(0, 8);
    const needle = q.toLowerCase();
    return source.filter(d =>
      d.w.toLowerCase().includes(needle) ||
      d.resp.toLowerCase().includes(needle) ||
      (d.alt && d.alt.toLowerCase().includes(needle))
    ).slice(0, 12);
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
      if (r) SpeechCtx.chain(r);
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
            placeholder="type a word — kubectl, nginx, GIF…"
          />
          <span className="esc">ESC</span>
        </div>
        <div className="results">
          {results.length === 0 && (
            <div style={{ padding: '36px 22px', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 12 }}>
              No match. Submit a PR — every star helps.
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={r.w}
              className={`row ${i === cursor ? 'active' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => SpeechCtx.chain(r)}
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
          <div>powered by Web Speech API</div>
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
    const speakNext = () => {
      if (i >= PHRASES.length) return;
      const p = PHRASES[i];
      setPhraseIdx(i);
      SpeechCtx.speak(p.say, {
        onend: () => { i++; setTimeout(speakNext, 350); }
      });
    };
    speakNext();
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
window.spawnRipple = function (x, y, color = '#ff6a3d') {
  const el = document.createElement('div');
  el.className = 'ripple';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.borderColor = color;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
};
