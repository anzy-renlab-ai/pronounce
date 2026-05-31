// ========== Terminal demo ==========
function Terminal({ registerEgg }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText('git clone https://github.com/anzy-renlab-ai/pronounce.git && cd pronounce && ./install.sh');
    setCopied(true);
    registerEgg('install');
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="section shell" id="cli">
      <div className="section-head">
        <div className="idx">§ 04 · CLI</div>
        <h2>Sound, <em>not transcription.</em></h2>
        <div className="aside">~250 lines of bash. zero deps. wraps the macOS <code>say</code> engine you already have.</div>
      </div>

      <div className="terminal-split">
        <div className="copy">
          <h3>Heard, <em>not just read.</em></h3>
          <p>
            IPA is a reference — like a dictionary entry for a foreign word. You don't learn how to pronounce <code>schadenfreude</code> by squinting at <code>/ˈʃɑːdənˌfrɔɪdə/</code>.
          </p>
          <p>
            You learn it by hearing someone say it three times. <strong style={{ color: 'var(--ink)', fontStyle: 'italic' }}>sayit</strong> wires your OS's TTS to a one-shot CLI so the answer is sound, not a phonetic transcription.
          </p>
          <div className="install" onClick={copy}>
            <span className="dollar">$</span>
            <span>git clone https://github.com/anzy-renlab-ai/pronounce.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</span>
            <span className="copy-state">{copied ? '✓ copied' : 'click to copy'}</span>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-head">
            <div className="dots"><span/><span/><span/></div>
            <div className="title">sayit · ~/projects</div>
          </div>
          <div className="terminal-body">
            <div className="ln"><span className="prompt">$</span> <span className="cmd">say-it</span> kubectl</div>
            <div className="ln"><span className="speak">🔊</span> <span className="out">koob control. koob control. koob control. <span className="comment">or: cube cuddle. or: kube C T L.</span></span></div>
            <div className="ln">&nbsp;</div>
            <div className="ln"><span className="prompt">$</span> <span className="cmd">say-it</span> GIF</div>
            <div className="ln"><span className="speak">🔊</span> <span className="out">jif. jif. jif. <span className="comment">or: gif.&nbsp;&nbsp;# with receipts — Wilhite, 2013</span></span></div>
            <div className="ln">&nbsp;</div>
            <div className="ln"><span className="prompt">$</span> <span className="cmd">say-it</span> <span className="flag">--why</span> JSON</div>
            <div className="ln"><span className="key">word</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="val">JSON</span></div>
            <div className="ln"><span className="key">ipa</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="val">/ˈdʒeɪsən/</span></div>
            <div className="ln"><span className="key">respelling_us</span>&nbsp; <span className="val">jay son</span></div>
            <div className="ln"><span className="key">source</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="val">Wikipedia § Pronunciation</span></div>
            <div className="ln"><span className="key">confidence</span>&nbsp;&nbsp;&nbsp;&nbsp; <span className="val">creator</span></div>
            <div className="ln">&nbsp;</div>
            <div className="ln"><span className="prompt">$</span> <span className="cursor"></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Terminal = Terminal;

// ========== Features ==========
function Features() {
  const items = [
    { n: '01', title: `${DICT_ALL.length} entries, source-cited`, desc: 'Project names, products, programmer jargon, AI/ML projects and researchers. Every entry tagged with confidence and linked to a real source.', chips: ['--why', '--solo', '--alt'] },
    { n: '02', title: 'Multi-reading audio awareness', desc: 'When a word is contested — GIF, SQL, GUI, kubectl — the CLI audibly chains the alternates ("…or: gif").', chips: ['--all'] },
    { n: '03', title: 'Claude Code skill included', desc: 'Ask Claude "how do you pronounce X?" — it replies with audio, IPA, and a source citation, not a phonetic guess.', chips: ['mcp-server'] },
    { n: '04', title: 'Zero deps, pure bash', desc: 'Wraps the TTS engine you already have — macOS say, Linux espeak-ng, or Windows PowerShell. No npm, no sudo, no surprises.', chips: ['./install.sh'] },
    { n: '05', title: 'Pluggable alternates', desc: '--alt for the rival reading, --all for every variant, --solo to skip the chain, --why for the entry with source URL.', chips: ['--alt', '--all'] },
    { n: '06', title: 'Community-owned', desc: 'The dictionary is a TSV file you can edit. Open a PR with your favorite mispronounced project.', chips: ['data/pronunciations.tsv'] },
  ];
  return (
    <section className="section shell">
      <div className="section-head">
        <div className="idx">§ 05 · What's in the box</div>
        <h2>Small surface, <em>weird depth.</em></h2>
        <div className="aside">Open the source — it really is just one bash file and a TSV.</div>
      </div>
      <div className="features">
        {items.map(it => (
          <div className="feature" key={it.n}>
            <div className="badge"><span className="num">{it.n}</span> &nbsp;/&nbsp; FEATURE</div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
            <div className="glyph">
              {it.chips.map(c => <code key={c}>{c}</code>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Features = Features;

// ========== Quiz ==========
function Quiz({ registerEgg }) {
  const QUESTIONS = React.useMemo(() => [
    {
      w: 'kubectl',
      opts: [
        { t: 'koob control', correct: true, pct: '41%' },
        { t: 'cube cuddle', pct: '28%' },
        { t: 'kube C T L', pct: '21%' },
        { t: 'kub-cuttle', pct: '10%' },
      ],
    },
    {
      w: 'nginx',
      opts: [
        { t: 'engine X', correct: true, pct: '72%' },
        { t: 'N-jinks', pct: '14%' },
        { t: 'enn-jin-ex', pct: '11%' },
        { t: 'n-jinx', pct: '3%' },
      ],
    },
    {
      w: 'GIF',
      opts: [
        { t: 'jif (creator-clarified)', correct: true, pct: '38%' },
        { t: 'gif (hard g)', pct: '61%' },
        { t: 'jee-eye-eff', pct: '1%' },
      ],
    },
  ], []);
  const [qi, setQi] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const q = QUESTIONS[qi];

  const pick = (o, i) => {
    setPicked(i);
    if (o.correct) {
      registerEgg('quiz');
      SpeechCtx.speak(o.t.replace(/\(.*\)/, '').trim());
    }
    setTimeout(() => {
      setPicked(null);
      setQi((qi + 1) % QUESTIONS.length);
    }, 1800);
  };

  return (
    <section className="section shell" id="quiz">
      <div className="section-head">
        <div className="idx">§ 06 · Quiz</div>
        <h2>How well do you <em>actually</em> know?</h2>
        <div className="aside">15 questions. Sources at the end. Score saved locally.</div>
      </div>
      <div className="quiz">
        <div className="qcopy">
          <h3>Stop hedging. <em>Find out.</em></h3>
          <p>Pick what you think people say. We grade against creators (when on record) and the community (when not). Each answer comes with a source you can click through.</p>
          <a href="/quiz.html" className="btn primary" style={{ alignSelf: 'flex-start' }}>Start full quiz <span className="arrow">→</span></a>
        </div>
        <div className="qvis">
          <div className="qcard">
            <div className="q-num">Question {qi + 1} of {QUESTIONS.length} · click to answer</div>
            <div className="q-word">{q.w}</div>
            <div className="q-opts">
              {q.opts.map((o, i) => (
                <div
                  key={o.t}
                  className={`q-opt ${picked === i && o.correct ? 'correct' : ''}`}
                  onClick={() => pick(o, i)}
                >
                  <span>{o.t}</span>
                  <span className="pct">{o.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Quiz = Quiz;

// ========== FAQ ==========
function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section shell">
      <div className="section-head">
        <div className="idx">§ 07 · Questions</div>
        <h2>Frequently <em>actually</em> asked.</h2>
        <div className="aside">Nothing here is filler. Every Q is one a real user opened on the repo.</div>
      </div>
      <div className="faq">
        {FAQS.map((f, i) => (
          <React.Fragment key={i}>
            <div className={`q ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="qn">{String(i + 1).padStart(2, '0')}</div>
              <h5>{f.q}</h5>
              <div className="plus">+</div>
            </div>
            <div className="a"><div className="a-inner" dangerouslySetInnerHTML={{ __html: f.a }} /></div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
window.FAQ = FAQ;

// ========== Footer ==========
function Footer({ registerEgg }) {
  return (
    <footer>
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-tagline">
            A community pronunciation dictionary <em>for the names developers actually use.</em> Open source. MIT.
          </div>
          <div>
            <h6>Use</h6>
            <a href="https://marketplace.visualstudio.com/items?itemName=sayit.pronounce">Install for VS Code</a>
            <a href="#dictionary">Browse</a>
            <a href="#quiz">Quiz</a>
            <a href="#famous">Hall of Fame</a>
            <a href="#cli">CLI install</a>
          </div>
          <div>
            <h6>Build</h6>
            <a href="https://github.com/anzy-renlab-ai/pronounce">GitHub</a>
            <a href="https://github.com/anzy-renlab-ai/pronounce/blob/main/CONTRIBUTING.md">Contributing</a>
            <a href="https://github.com/anzy-renlab-ai/pronounce/blob/main/CHANGELOG.md">Roadmap</a>
            <a href="https://github.com/anzy-renlab-ai/pronounce/blob/main/data/pronunciations.tsv">TSV source</a>
          </div>
          <div>
            <h6>Pair</h6>
            <a href="https://github.com/anzy-renlab-ai/pronounce/tree/main/skills/pronounce-word">Claude Code skill</a>
            <a href="https://github.com/anzy-renlab-ai/pronounce/tree/main/mcp-server">MCP server</a>
            <a href="https://open-vsx.org/extension/sayit/pronounce">Open VSX (Cursor/Zed)</a>
            <a href="https://github.com/anzy-renlab-ai/pronounce/tree/main/integrations/raycast">Raycast</a>
          </div>
        </div>
        <div className="legal">
          <div>
            sayit · MIT · v2.5.0 · <span className="yr" onClick={() => registerEgg('year')}>© 2026</span>
          </div>
          <div>built so you'd stop saying "kub-cuttle"</div>
        </div>
        <div className="mark" onClick={() => registerEgg('mark')}>say<em>it.</em></div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
