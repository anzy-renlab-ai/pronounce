// ========== Main App ==========
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff6a3d",
  "showHud": true,
  "autoSpeak": false,
  "layoutDensity": "comfortable"
}/*EDITMODE-END*/;

function App() {
  // Tweaks panel stripped for production — keep defaults inline.
  const tweaks = TWEAK_DEFAULTS;

  // Easter eggs state
  const [found, setFound] = React.useState(new Set());
  const [hudOpen, setHudOpen] = React.useState(tweaks.showHud);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [karaokeOn, setKaraokeOn] = React.useState(false);
  const [toast, setToast] = React.useState({ show: false, eyebrow: '', msg: '' });
  const logoClicks = React.useRef(0);
  const logoTimer = React.useRef(null);

  React.useEffect(() => { setHudOpen(tweaks.showHud); }, [tweaks.showHud]);

  const showToast = React.useCallback((eyebrow, msg) => {
    setToast({ show: true, eyebrow, msg });
    setTimeout(() => setToast({ show: false, eyebrow, msg }), 2600);
  }, []);

  const registerEgg = React.useCallback((id) => {
    setFound(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      const eg = EGGS.find(e => e.id === id);
      if (eg) showToast('Easter egg found', eg.label);
      return next;
    });
  }, [showToast]);

  // ====== Keyboard shortcuts: ⌘K, /, Konami, type-to-speak ======
  React.useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
    let konamiIdx = 0;
    let typed = '';
    let typedTimer = null;

    const onKey = (e) => {
      // ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(p => !p);
        return;
      }
      // ESC
      if (e.key === 'Escape') {
        if (paletteOpen) setPaletteOpen(false);
        if (karaokeOn) setKaraokeOn(false);
        return;
      }
      // ignore if typing in input
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      // '/' opens palette
      if (e.key === '/') {
        e.preventDefault();
        setPaletteOpen(true);
        registerEgg('slash');
        return;
      }

      // Konami
      if (e.key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          setKaraokeOn(true);
          registerEgg('konami');
        }
      } else {
        konamiIdx = e.key === KONAMI[0] ? 1 : 0;
      }

      // Type-to-speak: build a word from letter keys, auto-speak after pause
      if (/^[a-zA-Z]$/.test(e.key)) {
        typed += e.key.toLowerCase();
        if (typed.length > 16) typed = typed.slice(-16);
        clearTimeout(typedTimer);
        typedTimer = setTimeout(() => {
          // try match
          const source = window.DICT_ALL || DICT;
          const match = source.find(d =>
            d.w.toLowerCase() === typed ||
            d.w.toLowerCase().replace(/[^a-z]/g, '') === typed
          );
          if (match) {
            SpeechCtx.chain(match);
            showToast('You typed it · we said it', `"${match.w}" → ${match.resp}`);
            if (match.w.toLowerCase() === 'gif') registerEgg('jiffy');
          }
          typed = '';
        }, 700);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, karaokeOn, registerEgg, showToast]);

  // Logo triple-click
  const onLogoClick = (e) => {
    logoClicks.current += 1;
    clearTimeout(logoTimer.current);
    // ripple
    window.spawnRipple(e.clientX, e.clientY, tweaks.accent);
    // small sound on each click
    SpeechCtx.speak(['say', 'it', 'now'][logoClicks.current - 1] || 'say it', { rate: 1.4 });
    if (logoClicks.current >= 3) {
      registerEgg('logo');
      setKaraokeOn(true);
      logoClicks.current = 0;
    }
    logoTimer.current = setTimeout(() => { logoClicks.current = 0; }, 1200);
  };

  // global ripple on accent clicks
  React.useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest('.btn.primary, .word-card.playing, .speaker, .play, .word .speaker');
      if (t) window.spawnRipple(e.clientX, e.clientY, tweaks.accent);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [tweaks.accent]);

  return (
    <React.Fragment>
      <TopBar onOpenPalette={() => setPaletteOpen(true)} onLogoClick={onLogoClick} />
      <main id="main">
        <Hero registerEgg={registerEgg} />
        <WordGrid registerEgg={registerEgg} />
        <Famous registerEgg={registerEgg} />
        <Terminal registerEgg={registerEgg} />
        <Features />
        <Quiz registerEgg={registerEgg} />
        <FAQ />
      </main>
      <Footer registerEgg={registerEgg} />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} registerEgg={registerEgg} />
      <EggHud found={found} open={hudOpen} onClose={() => setHudOpen(false)} />
      <Karaoke on={karaokeOn} onClose={() => setKaraokeOn(false)} />
      <Toast {...toast} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
