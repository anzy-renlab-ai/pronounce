// ========== Speech + audio engine ==========
const SpeechCtx = {
  voice: null,
  ready: false,
  rate: 0.92,
  pitch: 1.0,
  init() {
    if (!('speechSynthesis' in window)) return;
    const pick = () => {
      const v = speechSynthesis.getVoices();
      if (!v.length) return;
      this.voice =
        v.find(x => /Samantha/i.test(x.name)) ||
        v.find(x => /en-US/i.test(x.lang) && /Google/i.test(x.name)) ||
        v.find(x => /en/i.test(x.lang)) ||
        v[0];
      this.ready = true;
    };
    pick();
    speechSynthesis.onvoiceschanged = pick;
  },
  speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) return;
    if (opts.cancel !== false) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.rate = opts.rate ?? this.rate;
    u.pitch = opts.pitch ?? this.pitch;
    u.volume = opts.volume ?? 1;
    if (opts.onend) u.onend = opts.onend;
    speechSynthesis.speak(u);
    return u;
  },
  // chain primary + alternates, "or: <alt>"
  chain(entry) {
    speechSynthesis.cancel();
    const utter = (t, after) => {
      const u = new SpeechSynthesisUtterance(t);
      if (this.voice) u.voice = this.voice;
      u.rate = this.rate; u.pitch = this.pitch;
      if (after) u.onend = after;
      speechSynthesis.speak(u);
    };
    const queue = [entry.resp, entry.resp];
    if (entry.alt) queue.push(`or, ${entry.alt}`);
    let i = 0;
    const next = () => {
      if (i >= queue.length) return;
      const t = queue[i++];
      utter(t, i < queue.length ? next : null);
    };
    next();
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
