// ========== TopBar ==========
function TopBar({ onOpenPalette, onLogoClick }) {
  return (
    <header className="topbar">
      <div className="shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="brand" onClick={onLogoClick} data-comment-anchor="brand">
          <div className="dot"></div>
          <div className="name">say<em>it</em></div>
        </div>
        <nav className="nav">
          <a href="#dictionary">Browse</a>
          <a href="#quiz">Quiz</a>
          <a href="#famous">Hall of Fame</a>
          <a href="#cli">CLI</a>
          <a href="https://github.com/anzy-renlab-ai/pronounce" className="cta">★ Star on GitHub</a>
          <span className="kbd" onClick={onOpenPalette} title="Open command palette">
            <kbd>⌘</kbd><kbd>K</kbd>
          </span>
        </nav>
      </div>
    </header>
  );
}
window.TopBar = TopBar;

// ========== Hero ==========
function Hero({ onWordClick, registerEgg }) {
  const [active, setActive] = React.useState(false);
  const [current, setCurrent] = React.useState(DICT[0]);
  const idx = React.useRef(0);

  const play = () => {
    setActive(true);
    SpeechCtx.chain(current);
    registerEgg('hero');
    setTimeout(() => setActive(false), 2200);
  };

  // Auto-cycle words every 8s
  React.useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % 6;
      setCurrent(DICT[idx.current]);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero shell">
      <div className="eyebrow">
        <span className="live"></span>
        <span>{DICT_ALL.length} entries · MIT · VS Code · Cursor · Windsurf</span>
      </div>

      <div className="hero-grid">
        <div>
          <h1>
            <span className="it">How to</span> pronounce
            <br />
            <span className="word" onClick={play} title="Click to hear it">
              <span className="speaker"><Speaker size={14}/></span>
              {current.w}
            </span>
            <br />
            <span className="it">without the</span> cringe.
          </h1>
          <p className="lede">
            A community dictionary of how engineers <strong>actually</strong> say <code>kubectl</code>, <code>nginx</code>, <code>GIF</code>, <code>JSON</code>, <code>Pydantic</code>, <code>Knative</code>, <code>LaTeX</code>, <code>Postgres</code>…<br/>
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>with sources.</span>
          </p>
          <div className="cta-row">
            <a href="https://marketplace.visualstudio.com/items?itemName=sayit.pronounce" className="btn primary">
              Install for VS Code <span className="arrow">→</span>
            </a>
            <a href="#dictionary" className="btn">
              Browse {DICT_ALL.length} words
            </a>
            <a href="#quiz" className="btn">
              Take the quiz
            </a>
            <a href="https://github.com/anzy-renlab-ai/pronounce" className="btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/></svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Waveform panel */}
        <div className="wave-panel">
          <div className="wave-head">
            <span>now playing · {current.w}</span>
            <div className="dots"><span/><span/><span/></div>
          </div>
          <div className="wave-canvas">
            <Waveform active={active} />
          </div>
          <div className="wave-foot">
            <div>
              <div className="ipa">{current.ipa}</div>
              <div className="resp">"{current.resp}"</div>
            </div>
            <div className="src">{current.src || 'community'}</div>
          </div>
        </div>
      </div>

      <div className="metrics">
        <div className="metric"><div className="n">{DICT_ALL.length}</div><div className="l">Entries</div></div>
        <div className="metric"><div className="n">{DICT_ALL.filter(d => d.url).length}</div><div className="l">Sources cited</div></div>
        <div className="metric"><div className="n">{DICT_ALL.filter(d => d.conf === 'contested').length}</div><div className="l">Contested readings</div></div>
        <div className="metric"><div className="n">~<em>250</em></div><div className="l">Lines of bash</div></div>
      </div>
    </section>
  );
}
window.Hero = Hero;

// ========== Word grid ==========
function WordGrid({ registerEgg }) {
  const [playingIdx, setPlayingIdx] = React.useState(-1);
  const [filter, setFilter] = React.useState('all');
  const filtered = DICT.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'contested') return d.conf === 'contested';
    if (filter === 'creator') return d.conf === 'creator';
    return true;
  });

  const play = (i, entry) => {
    setPlayingIdx(i);
    SpeechCtx.chain(entry);
    if (entry.w === 'GIF') registerEgg('jiffy');
    setTimeout(() => setPlayingIdx(-1), 2400);
  };

  return (
    <section className="section shell" id="dictionary">
      <div className="section-head">
        <div className="idx">§ 02 · Dictionary</div>
        <h2>Try a few. <em>Click</em> to hear.</h2>
        <div className="aside">audio quality varies by browser. install the CLI for the canonical macOS rendering.</div>
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          ['all', `All · ${DICT.length}`],
          ['creator', `Creator-clarified · ${DICT.filter(d=>d.conf==='creator').length}`],
          ['contested', `Contested · ${DICT.filter(d=>d.conf==='contested').length}`],
        ].map(([k, l]) => (
          <button
            key={k}
            className={`btn ${filter === k ? 'primary' : ''}`}
            style={{ fontSize: 11, padding: '8px 14px' }}
            onClick={() => setFilter(k)}
          >{l}</button>
        ))}
      </div>

      <div className="try-grid">
        {filtered.map((d, i) => (
          <button
            key={d.w}
            className={`word-card ${playingIdx === i ? 'playing' : ''}`}
            onClick={() => play(i, d)}
            aria-label={`Hear ${d.w} pronounced ${d.resp}`}
          >
            <div className="word-top">
              <div className="w">{d.w}</div>
              <div className="play"><PlayIcon /></div>
            </div>
            <MiniWave active={playingIdx === i} />
            <div className="ipa">{d.ipa}</div>
            <div className="resp">"{d.resp}"</div>
            <div className="meta">
              <div className={`conf ${d.conf}`}>
                <span className="pip"></span>
                {d.conf}
              </div>
              <div>{d.src || '—'}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <a href="/browse" className="btn">See all {DICT_ALL.length} entries <span className="arrow">→</span></a>
      </div>
    </section>
  );
}
window.WordGrid = WordGrid;

// ========== Famous moments ==========
function Famous({ registerEgg }) {
  const speak = (m) => {
    registerEgg('famous');
    SpeechCtx.speak(`${m.w}. ${m.said}.`);
  };
  return (
    <section className="section shell" id="famous">
      <div className="section-head">
        <div className="idx">§ 03 · The Record</div>
        <h2>Some aren't opinions.<br/><em>The creators settled them on record.</em></h2>
        <div className="aside">Receipts attached. No vibes-based linguistics.</div>
      </div>
      <div className="famous">
        {FAMOUS.map(m => (
          <div
            className="moment"
            key={m.w}
            role="button"
            tabIndex={0}
            aria-label={`Hear ${m.w} pronounced ${m.said}`}
            onClick={() => speak(m)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); speak(m); } }}
          >
            <div>
              <span className="word">{m.w}</span> <span className="arrow">→</span> <span className="said">"{m.said}"</span>
            </div>
            <div className="src"><a href={m.url} onClick={(e) => e.stopPropagation()}>{m.src}</a></div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Famous = Famous;
