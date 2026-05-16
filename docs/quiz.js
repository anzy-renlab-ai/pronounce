// Pronunciation quiz — uses ENTRIES from script.js
(function(){
  if (typeof ENTRIES === 'undefined') return;

  const FAMOUS_WORDS = new Set(['nginx','GIF','GNU','etcd','PostgreSQL','MySQL','Debian','Django','LaTeX','TeX','Lua','SQL','JSON','CIDR','JWT']);

  const state = {
    mode: 'all',
    len: 10,
    qs: [],
    idx: 0,
    score: 0,
    history: [],
  };

  function pool() {
    if (state.mode === 'contested') return ENTRIES.filter(e => e.conf === 'contested');
    if (state.mode === 'famous') return ENTRIES.filter(e => FAMOUS_WORDS.has(e.w));
    return ENTRIES.slice();
  }

  function shuffle(arr){
    const a = arr.slice();
    for (let i = a.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  function genQuestions() {
    const p = pool();
    const picks = shuffle(p).slice(0, state.len);
    return picks.map(correct => {
      const wrongPool = shuffle(p.filter(e => e.w !== correct.w));
      const distractors = wrongPool.slice(0, 3);
      const options = shuffle([correct, ...distractors]);
      return { correct, options };
    });
  }

  function startQuiz() {
    state.qs = genQuestions();
    state.idx = 0;
    state.score = 0;
    state.history = [];
    renderQ();
  }

  function playWord(w) {
    if (typeof playEntry === 'function') { playEntry(w); return; }
    if (!('speechSynthesis' in window)) return;
    const e = ENTRIES.find(x => x.w === w);
    if (!e) return;
    const u = new SpeechSynthesisUtterance(e.r || w);
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  function renderQ() {
    const stage = document.getElementById('quiz-stage');
    if (state.idx >= state.qs.length) { renderSummary(); return; }
    const { correct, options } = state.qs[state.idx];
    stage.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">
          <span>Question ${state.idx+1} / ${state.qs.length}</span>
          <span class="score">★ ${state.score}</span>
        </div>
        <div class="quiz-word">${escape(correct.w)}</div>
        <p class="quiz-prompt">
          <button onclick="window.__quizPlay('${escapeAttr(correct.w)}')" aria-label="Play pronunciation">▶ hear it</button>
          &nbsp;Which respelling matches?
        </p>
        <div class="quiz-options" id="quiz-opts" role="radiogroup" aria-label="Pronunciation choices">
          ${options.map((o, i) => `
            <button class="quiz-option" data-w="${escapeAttr(o.w)}" data-r="${escapeAttr(o.r)}" data-correct="${o.w === correct.w ? '1' : '0'}" aria-label="Option ${i+1}: ${escapeAttr(o.r)}">${escape(o.r)}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-fb"></div>
      </div>`;
    stage.querySelectorAll('.quiz-option').forEach(btn => btn.addEventListener('click', () => answer(btn, correct)));
  }

  function answer(btn, correct) {
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach(o => o.classList.add('locked'));
    const isRight = btn.dataset.correct === '1';
    if (isRight) { btn.classList.add('correct'); state.score++; }
    else { btn.classList.add('wrong'); opts.forEach(o => { if (o.dataset.correct === '1') o.classList.add('correct'); }); }
    state.history.push({ w: correct.w, right: isRight });
    playWord(correct.w);
    const fb = document.getElementById('quiz-fb');
    const slug = correct.w.toLowerCase().replace(/[^a-z0-9._-]/g,'-');
    const src = correct.url ? `<div class="src">📖 <a href="${escapeAttr(correct.url)}" target="_blank" rel="noopener">${escape(correct.srcLabel || 'source')}</a></div>` : '';
    fb.innerHTML = `
      ${isRight ? '<strong style="color: var(--accent-2)">Correct!</strong>' : '<strong style="color: var(--accent)">Not quite.</strong>'}
      &nbsp;${escape(correct.w)} → <span style="font-family: var(--mono); color: var(--fg)">${escape(correct.r)}</span>
      <span style="color: var(--muted); font-family: var(--mono); font-size: 12px; margin-left: 8px;">${escape(correct.ipa)}</span>
      <p style="margin: 8px 0 0; line-height: 1.55;">${escape(correct.notes || '')}</p>
      ${src}
      <button class="quiz-next" onclick="window.__quizNext()">${state.idx === state.qs.length - 1 ? 'See results →' : 'Next →'}</button>`;
    fb.classList.add('shown');
  }

  window.__quizNext = function(){ state.idx++; renderQ(); };
  window.__quizPlay = playWord;

  function renderSummary() {
    const stage = document.getElementById('quiz-stage');
    const pct = Math.round((state.score / state.qs.length) * 100);
    const lvl = pct >= 90 ? '🏆 Pronunciation laureate'
              : pct >= 75 ? '🥇 Senior speaker'
              : pct >= 50 ? '🥈 Conference-ready'
              : pct >= 25 ? '🥉 Still learning'
              : '🐣 First day on the job';
    const wrong = state.history.filter(h => !h.right).map(h => h.w);
    const tweet = encodeURIComponent(`I scored ${state.score}/${state.qs.length} (${pct}%) on the developer pronunciation quiz — ${lvl}\n\nTry it: https://pronounce.renlab.ai/quiz.html`);
    if (state.score === state.qs.length && typeof window.confettiBurst === 'function') {
      window.confettiBurst(160);
    }
    stage.innerHTML = `
      <div class="quiz-card quiz-summary">
        <div style="color: var(--muted); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Final score</div>
        <div class="big">${state.score}/${state.qs.length}</div>
        <div class="lvl">${lvl}</div>
        <div style="color: var(--muted-strong); font-size: 15px;">${pct}% · ${state.qs.length - state.score} to review</div>
        ${wrong.length ? `<div style="margin-top: 18px; color: var(--muted-strong); font-size: 14px;">Review: ${wrong.map(w => `<a href="./word/${w.toLowerCase().replace(/[^a-z0-9._-]/g,'-')}.html" style="color: var(--accent); font-family: var(--mono); margin: 0 4px;">${escape(w)}</a>`).join('')}</div>` : ''}
        <div class="actions">
          <button onclick="window.__quizRestart()">Try again</button>
          <a class="secondary" href="https://twitter.com/intent/tweet?text=${tweet}" target="_blank" rel="noopener">Share score</a>
          <a class="secondary" href="./browse.html">Browse all words</a>
        </div>
      </div>`;
  }

  window.__quizRestart = startQuiz;

  function escape(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function escapeAttr(s){ return escape(s); }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-mode]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      state.mode = b.dataset.mode;
      startQuiz();
    }));
    document.querySelectorAll('[data-len]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-len]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      state.len = parseInt(b.dataset.len, 10);
      startQuiz();
    }));
    startQuiz();
  });
})();
