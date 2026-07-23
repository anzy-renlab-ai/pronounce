// ========== Speech + audio engine ==========
const SpeechCtx = {
  voice: null,
  ready: false,
  rate: 0.92,
  pitch: 1.0,
  active: null,
  _nextRequestId: 0,
  _canSpeak() {
    return (
      typeof window.speechSynthesis !== 'undefined' &&
      typeof window.SpeechSynthesisUtterance === 'function'
    );
  },
  init() {
    if (!this._canSpeak()) return;
    const synth = window.speechSynthesis;
    const pick = () => {
      const v = synth.getVoices();
      if (!v.length) return;
      this.voice =
        v.find(x => /Samantha/i.test(x.name)) ||
        v.find(x => /en-US/i.test(x.lang) && /Google/i.test(x.name)) ||
        v.find(x => /en/i.test(x.lang)) ||
        v[0];
      this.ready = true;
    };
    pick();
    synth.onvoiceschanged = pick;
  },
  _finish(req, status) {
    if (!req || req.finished) return;
    req.finished = true;
    if (this.active === req) this.active = null;
    queueMicrotask(() => {
      if (typeof req.onDone === 'function') {
        req.onDone({ requestId: req.id, status });
      }
    });
    if (status === 'ended' && typeof req.onEnd === 'function') {
      req.onEnd();
    }
  },
  _pause(req) {
    if (!req?.audio) return;
    try {
      req.audio.pause();
    } catch (_) {}
  },
  _cancelSpeech() {
    if (!this._canSpeak()) return;
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  },
  _begin(onDone) {
    const previous = this.active;
    if (previous && !previous.finished) {
      this._finish(previous, 'cancelled');
      this._pause(previous);
    }
    this._cancelSpeech();
    const req = {
      id: ++this._nextRequestId,
      onDone,
      finished: false,
      fallbackStarted: false,
      audio: null,
    };
    this.active = req;
    return req;
  },
  _speakQueue(req, queue, opts) {
    if (this.active !== req || req.finished) return;
    if (!this._canSpeak()) {
      this._finish(req, 'failed');
      return;
    }

    let i = 0;
    const next = () => {
      if (this.active !== req || req.finished) return;
      if (i >= queue.length) {
        this._finish(req, 'ended');
        return;
      }

      let utterance;
      try {
        utterance = new window.SpeechSynthesisUtterance(queue[i++]);
      } catch (_) {
        this._finish(req, 'failed');
        return;
      }
      if (this.voice) utterance.voice = this.voice;
      utterance.rate = opts.rate;
      utterance.pitch = opts.pitch;
      utterance.volume = opts.volume;

      let settled = false;
      utterance.onend = () => {
        if (settled) return;
        settled = true;
        next();
      };
      utterance.onerror = () => {
        if (settled) return;
        settled = true;
        if (this.active === req && !req.finished) {
          this._finish(req, 'failed');
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (_) {
        settled = true;
        this._finish(req, 'failed');
      }
    };
    next();
  },
  _fallback(req, entry) {
    if (
      this.active !== req ||
      req.finished ||
      req.fallbackStarted
    ) return;
    req.fallbackStarted = true;
    this._pause(req);
    req.audio = null;

    const primary = entry.resp || entry.w;
    const alternateValues = Array.isArray(entry.alts)
      ? entry.alts
      : (entry.alt == null ? [] : [entry.alt]);
    const alternates = alternateValues
      .map(value => String(value).trim())
      .filter(Boolean);
    const queue = [
      primary,
      primary,
      primary,
      ...alternates.map(value => `or, ${value}`),
    ];
    this._speakQueue(req, queue, {
      rate: this.rate,
      pitch: this.pitch,
      volume: 1,
    });
  },
  cancel(requestId) {
    const req = this.active;
    if (!req || req.id !== requestId || req.finished) return;
    this._finish(req, 'cancelled');
    this._pause(req);
    this._cancelSpeech();
  },
  playEntry(entry, opts = {}) {
    const req = this._begin(opts.onDone);
    const fallback = () => this._fallback(req, entry);

    try {
      const audio = new Audio(`/audio/${entry.slug}.mp3`);
      req.audio = audio;
      audio.onended = () => {
        if (
          this.active === req &&
          !req.finished &&
          !req.fallbackStarted
        ) this._finish(req, 'ended');
      };
      audio.onerror = fallback;
      const playing = audio.play();
      if (playing && typeof playing.catch === 'function') {
        playing.catch(fallback);
      }
    } catch (_) {
      fallback();
    }
    return req.id;
  },
  speak(text, opts = {}) {
    const req = this._begin(opts.onDone);
    req.onEnd = opts.onend;
    this._speakQueue(req, [text], {
      rate: opts.rate ?? this.rate,
      pitch: opts.pitch ?? this.pitch,
      volume: opts.volume ?? 1,
    });
    return req.id;
  },
  chain(entry, opts = {}) {
    return this.playEntry(entry, opts);
  },
};
SpeechCtx.init();
window.SpeechCtx = SpeechCtx;

// ========== Waveform (canvas) ==========
function Waveform({ active, color = '#8fd694', dim = '#3a2c22', bars = 64, height = 140 }) {
  const ref = React.useRef(null);
  const raf = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr); }
      ctx.clearRect(0, 0, w, h);
      const bw = w / bars;
      const gap = bw * 0.35;
      const barW = bw - gap;
      for (let i = 0; i < bars; i++) {
        // multi-octave shape
        const phase = (i / bars) * Math.PI * 4;
        const env = Math.sin((i / bars) * Math.PI); // bell envelope
        const wob1 = Math.sin(phase + t * 0.05);
        const wob2 = Math.sin(phase * 2.3 + t * 0.08);
        const amp = active
          ? (0.4 + 0.6 * Math.abs(wob1 * 0.65 + wob2 * 0.35)) * env
          : (0.10 + 0.10 * Math.abs(wob1)) * env;
        const bh = Math.max(2, amp * (h - 8));
        const x = i * bw + gap / 2;
        const y = (h - bh) / 2;
        ctx.fillStyle = active ? color : dim;
        ctx.beginPath();
        const r = Math.min(barW / 2, 2);
        roundRect(ctx, x, y, barW, bh, r);
        ctx.fill();
      }
      t += 1;
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [active, color, bars]);
  return <canvas ref={ref} style={{ width: '100%', height }} />;
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

window.Waveform = Waveform;

// ========== Helpers ==========
function MiniWave({ active, count = 18 }) {
  const seedH = React.useMemo(
    () => Array.from({ length: count }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7))),
    [count]
  );
  return (
    <div className="mini-wave">
      {seedH.map((h, i) => (
        <span
          key={i}
          style={{
            height: `${(active ? (40 + Math.random() * 60) : (h * 100))}%`,
            transition: 'height 0.15s ease',
            transitionDelay: `${i * 8}ms`,
          }}
        />
      ))}
    </div>
  );
}
window.MiniWave = MiniWave;

function Speaker({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}
window.Speaker = Speaker;

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor">
      <polygon points="2,1 11,6 2,11"/>
    </svg>
  );
}
window.PlayIcon = PlayIcon;
