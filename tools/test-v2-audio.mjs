import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { syncCountText } from '../integrations/vscode/scripts/count-sync.mjs';

const AUDIO_SOURCE = readFileSync(
  new URL('../docs/v2/audio.jsx', import.meta.url),
  'utf8',
);
const SECTIONS_1_SOURCE = readFileSync(
  new URL('../docs/v2/sections-1.jsx', import.meta.url),
  'utf8',
);
const SECTIONS_2_SOURCE = readFileSync(
  new URL('../docs/v2/sections-2.jsx', import.meta.url),
  'utf8',
);
const EGGS_SOURCE = readFileSync(
  new URL('../docs/v2/eggs.jsx', import.meta.url),
  'utf8',
);
const APP_SOURCE = readFileSync(
  new URL('../docs/v2/app.jsx', import.meta.url),
  'utf8',
);
const V2_DATA_BUILDER_SOURCE = readFileSync(
  new URL('./build-v2-data.py', import.meta.url),
  'utf8',
);
const V2_INDEX_SOURCE = readFileSync(
  new URL('../docs/v2/index.html', import.meta.url),
  'utf8',
);
const BUNDLE_SOURCE = readFileSync(
  new URL('../docs/v2/bundle.js', import.meta.url),
  'utf8',
);
const WAVEFORM_MARKER = '// ========== Waveform (canvas) ==========';
const markerIndex = AUDIO_SOURCE.indexOf(WAVEFORM_MARKER);

assert.notEqual(markerIndex, -1, 'audio.jsx must keep the Waveform marker');

const SPEECH_SOURCE = AUDIO_SOURCE.slice(0, markerIndex);

test('VS Code count copy keeps total, sourced, and creator metrics distinct', () => {
  const stale = [
    '1,880 entries; 1,260 carry a citable source',
    '1,260 also carry a citable source',
    '1,260 of 1,880 entries carry a citable source',
    '1,260 sourced entries',
    '101 settled by the creator; 172 the community still argues',
    '1880 条社区维护词条，其中 1260 条带来源引用，101 条为作者确认',
  ].join('\n');

  assert.equal(
    syncCountText(stale, {
      count: 1903,
      sourceCount: 1283,
      creatorCount: 108,
      contestedCount: 175,
    }),
    [
      '1,903 entries; 1,283 carry a citable source',
      '1,283 also carry a citable source',
      '1,283 of 1,903 entries carry a citable source',
      '1,283 sourced entries',
      '108 settled by the creator; 175 the community still argues',
      '1903 条社区维护词条，其中 1283 条带来源引用，108 条为作者确认',
    ].join('\n'),
  );
});

function sourceBlock(source, start, end) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex);
  assert.notEqual(startIndex, -1, `source must contain ${start}`);
  assert.notEqual(endIndex, -1, `source must contain ${end}`);
  return source.slice(startIndex, endIndex);
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function loadEngine({
  hasSpeech = true,
  hasQueueMicrotask = true,
  play = () => new Promise(() => {}),
} = {}) {
  const audioInstances = [];
  const spoken = [];

  class MockAudio {
    constructor(src) {
      this.src = src;
      this.pauseCalls = 0;
      this.playCalls = 0;
      audioInstances.push(this);
    }

    play() {
      this.playCalls += 1;
      return play(this);
    }

    pause() {
      this.pauseCalls += 1;
    }
  }

  class MockUtterance {
    constructor(text) {
      this.text = text;
    }
  }

  const sandbox = { Audio: MockAudio };
  if (hasQueueMicrotask) sandbox.queueMicrotask = queueMicrotask;

  let speechSynthesis;
  if (hasSpeech) {
    speechSynthesis = {
      cancelCalls: 0,
      getVoices: () => [],
      speak(utterance) {
        spoken.push(utterance);
      },
      cancel() {
        this.cancelCalls += 1;
      },
    };
    sandbox.speechSynthesis = speechSynthesis;
    sandbox.SpeechSynthesisUtterance = MockUtterance;
  }

  sandbox.window = sandbox;
  vm.runInContext(SPEECH_SOURCE, vm.createContext(sandbox), {
    filename: 'docs/v2/audio.jsx',
  });

  return {
    SpeechCtx: sandbox.SpeechCtx,
    audioInstances,
    speechSynthesis,
    spoken,
  };
}

function eventPairs(events) {
  return events.map(({ requestId, status }) => [requestId, status]);
}

function flushTasks() {
  return new Promise(resolve => setImmediate(resolve));
}

function endSpeechQueue(spoken) {
  let index = 0;
  while (index < spoken.length) {
    const utterance = spoken[index];
    index += 1;
    utterance.onend?.();
    assert.ok(index < 20, 'speech queue must terminate');
  }
}

test('SpeechCtx playback contract', async t => {
  await t.test('MP3 success settles ended exactly once', async () => {
    const events = [];
    const env = loadEngine();

    const requestId = env.SpeechCtx.playEntry(
      { slug: 'c--', w: 'ignored word', resp: 'C plus plus' },
      { onDone: event => events.push(event) },
    );

    assert.equal(requestId, 1);
    assert.equal(env.audioInstances.length, 1);
    assert.equal(env.audioInstances[0].src, '/audio/c--.mp3');

    env.audioInstances[0].onended();
    assert.deepEqual(eventPairs(events), [], 'completion must be asynchronous');
    await flushTasks();
    assert.deepEqual(eventPairs(events), [[requestId, 'ended']]);

    env.audioInstances[0].onended();
    env.audioInstances[0].onerror();
    await flushTasks();
    assert.deepEqual(eventPairs(events), [[requestId, 'ended']]);
  });

  await t.test('missing queueMicrotask still settles asynchronously exactly once', async () => {
    const events = [];
    const env = loadEngine({ hasQueueMicrotask: false });
    const requestId = env.SpeechCtx.playEntry(
      { slug: 'promise-defer', w: 'promise defer' },
      { onDone: event => events.push(event) },
    );

    env.audioInstances[0].onended();
    env.audioInstances[0].onended();
    assert.deepEqual(eventPairs(events), [], 'completion must remain asynchronous');
    await flushTasks();
    assert.deepEqual(eventPairs(events), [[requestId, 'ended']]);
  });

  await t.test('onerror plus rejected play fall back only once', async () => {
    const playback = deferred();
    const events = [];
    const env = loadEngine({ play: () => playback.promise });

    const requestId = env.SpeechCtx.playEntry(
      { slug: 'gif', w: 'GIF', resp: 'jif', alts: [] },
      { onDone: event => events.push(event) },
    );

    env.audioInstances[0].onerror();
    assert.equal(env.spoken.length, 1);
    playback.reject(new Error('play rejected'));
    await flushTasks();
    assert.equal(env.spoken.length, 1, 'failure signals must share one fallback');

    endSpeechQueue(env.spoken);
    await flushTasks();
    assert.equal(env.spoken.length, 3);
    assert.deepEqual(eventPairs(events), [[requestId, 'ended']]);
  });

  await t.test('superseded rejected play never speaks stale fallback', async () => {
    const firstPlayback = deferred();
    const events = [];
    let playCount = 0;
    const env = loadEngine({
      play: () => {
        playCount += 1;
        return playCount === 1 ? firstPlayback.promise : new Promise(() => {});
      },
    });

    const firstId = env.SpeechCtx.playEntry(
      { slug: 'first', w: 'first' },
      { onDone: event => events.push(event) },
    );
    const secondId = env.SpeechCtx.playEntry(
      { slug: 'second', w: 'second' },
      { onDone: event => events.push(event) },
    );

    assert.ok(secondId > firstId, 'request IDs must increase monotonically');
    assert.equal(env.audioInstances[0].pauseCalls, 1);
    firstPlayback.reject(new Error('late rejection'));
    await flushTasks();

    assert.equal(env.spoken.length, 0);
    assert.deepEqual(eventPairs(events), [[firstId, 'cancelled']]);

    env.audioInstances[1].onended();
    await flushTasks();
    assert.deepEqual(eventPairs(events), [
      [firstId, 'cancelled'],
      [secondId, 'ended'],
    ]);
  });

  await t.test('cancel settles old request once', async () => {
    const playback = deferred();
    const events = [];
    const env = loadEngine({ play: () => playback.promise });
    const requestId = env.SpeechCtx.playEntry(
      { slug: 'cancel-me', w: 'cancel me' },
      { onDone: event => events.push(event) },
    );
    const audio = env.audioInstances[0];
    const ended = audio.onended;
    const failed = audio.onerror;

    env.SpeechCtx.cancel(requestId);
    env.SpeechCtx.cancel(requestId);
    ended();
    failed();
    playback.reject(new Error('late rejection after cancellation'));

    assert.deepEqual(eventPairs(events), [], 'completion must be asynchronous');
    await flushTasks();
    assert.equal(audio.pauseCalls, 1);
    assert.deepEqual(eventPairs(events), [[requestId, 'cancelled']]);
  });

  await t.test('fallback speaks primary three times and every trimmed alternate', async () => {
    const events = [];
    const env = loadEngine();
    const requestId = env.SpeechCtx.playEntry(
      {
        slug: 'niche',
        w: 'niche',
        resp: 'neesh',
        alts: [' nitch ', '', ' neech '],
        alt: 'legacy alternate',
      },
      { onDone: event => events.push(event) },
    );

    env.audioInstances[0].onerror();
    endSpeechQueue(env.spoken);
    await flushTasks();

    assert.deepEqual(
      env.spoken.map(utterance => utterance.text),
      ['neesh', 'neesh', 'neesh', 'or, nitch', 'or, neech'],
    );
    assert.deepEqual(eventPairs(events), [[requestId, 'ended']]);
  });

  await t.test('fallback supports compatibility alt only when alts are absent', async () => {
    const env = loadEngine();
    const requestId = env.SpeechCtx.chain(
      { slug: 'legacy', w: 'legacy', alt: ' old reading ' },
      {},
    );

    assert.equal(requestId, 1, 'chain must remain a playEntry compatibility alias');
    env.audioInstances[0].onerror();
    endSpeechQueue(env.spoken);
    await flushTasks();

    assert.deepEqual(
      env.spoken.map(utterance => utterance.text),
      ['legacy', 'legacy', 'legacy', 'or, old reading'],
    );
  });

  await t.test('missing Web Speech settles failed asynchronously', async () => {
    const events = [];
    const env = loadEngine({ hasSpeech: false });
    const requestId = env.SpeechCtx.playEntry(
      { slug: 'missing', w: 'missing' },
      { onDone: event => events.push(event) },
    );

    env.audioInstances[0].onerror();
    assert.deepEqual(eventPairs(events), []);
    await flushTasks();
    assert.deepEqual(eventPairs(events), [[requestId, 'failed']]);
  });

  await t.test('utterance error settles failed exactly once', async () => {
    const events = [];
    const env = loadEngine();
    const requestId = env.SpeechCtx.playEntry(
      { slug: 'broken-speech', w: 'broken speech' },
      { onDone: event => events.push(event) },
    );

    env.audioInstances[0].onerror();
    const utterance = env.spoken[0];
    utterance.onerror();
    utterance.onend();
    assert.deepEqual(eventPairs(events), []);
    await flushTasks();
    assert.deepEqual(eventPairs(events), [[requestId, 'failed']]);
    assert.equal(env.spoken.length, 1);
  });

  await t.test('direct speak cancels active MP3 and preserves options', async () => {
    const events = [];
    const env = loadEngine();
    const playId = env.SpeechCtx.playEntry(
      { slug: 'mp3', w: 'MP3' },
      { onDone: event => events.push(event) },
    );
    const cancelCallsBeforeSpeak = env.speechSynthesis.cancelCalls;
    const speakId = env.SpeechCtx.speak('say it', {
      rate: 1.4,
      pitch: 0.75,
      volume: 0.4,
      onDone: event => events.push(event),
    });

    assert.ok(speakId > playId);
    assert.equal(env.audioInstances[0].pauseCalls, 1);
    assert.equal(env.speechSynthesis.cancelCalls, cancelCallsBeforeSpeak + 1);
    assert.equal(env.spoken.length, 1);
    assert.equal(env.spoken[0].text, 'say it');
    assert.equal(env.spoken[0].rate, 1.4);
    assert.equal(env.spoken[0].pitch, 0.75);
    assert.equal(env.spoken[0].volume, 0.4);

    env.spoken[0].onend();
    assert.deepEqual(eventPairs(events), []);
    await flushTasks();
    assert.deepEqual(eventPairs(events), [
      [playId, 'cancelled'],
      [speakId, 'ended'],
    ]);
  });

  await t.test('legacy direct-speak onend runs once only after success', async () => {
    const ended = [];
    const successful = loadEngine();
    successful.SpeechCtx.speak('successful', {
      onend: () => ended.push('successful'),
    });
    successful.spoken[0].onend();
    successful.spoken[0].onend();
    await flushTasks();
    assert.deepEqual(ended, ['successful']);

    const cancelled = loadEngine();
    const cancelledId = cancelled.SpeechCtx.speak('cancelled', {
      onend: () => ended.push('cancelled'),
    });
    const cancelledUtterance = cancelled.spoken[0];
    cancelled.SpeechCtx.cancel(cancelledId);
    cancelledUtterance.onend();
    await flushTasks();

    const failed = loadEngine();
    failed.SpeechCtx.speak('failed', {
      onend: () => ended.push('failed'),
    });
    failed.spoken[0].onerror();
    failed.spoken[0].onend();
    await flushTasks();

    assert.deepEqual(ended, ['successful']);
  });
});

test('deployed v2 bundle matches its JSX sources', () => {
  const sourceHash = createHash('sha256')
    .update(AUDIO_SOURCE)
    .update(SECTIONS_1_SOURCE)
    .update(SECTIONS_2_SOURCE)
    .update(EGGS_SOURCE)
    .update(APP_SOURCE)
    .digest('hex');

  assert.ok(
    BUNDLE_SOURCE.startsWith(`/* v2-source-sha256: ${sourceHash} */\n`),
    'docs/v2/bundle.js is stale; run bash tools/build-v2-bundle.sh',
  );
});

test('dictionary playback consumer source contract', async t => {
  const hero = sourceBlock(SECTIONS_1_SOURCE, 'function Hero(', 'window.Hero = Hero;');
  const wordGrid = sourceBlock(
    SECTIONS_1_SOURCE,
    'function WordGrid(',
    'window.WordGrid = WordGrid;',
  );
  const famous = sourceBlock(
    SECTIONS_1_SOURCE,
    'function Famous(',
    'window.Famous = Famous;',
  );
  const palette = sourceBlock(
    EGGS_SOURCE,
    'function CommandPalette(',
    'window.CommandPalette = CommandPalette;',
  );
  const karaoke = sourceBlock(
    EGGS_SOURCE,
    'function Karaoke(',
    'window.Karaoke = Karaoke;',
  );
  const quiz = sourceBlock(SECTIONS_2_SOURCE, 'function Quiz(', 'window.Quiz = Quiz;');
  const typeToSpeak = sourceBlock(
    APP_SOURCE,
    '// Type-to-speak:',
    '// Logo triple-click',
  );
  const logo = sourceBlock(APP_SOURCE, '// Logo triple-click', '// global ripple');

  for (const [name, source] of [
    ['sections-1.jsx', SECTIONS_1_SOURCE],
    ['sections-2.jsx', SECTIONS_2_SOURCE],
    ['eggs.jsx', EGGS_SOURCE],
    ['app.jsx', APP_SOURCE],
  ]) {
    await t.test(`${name} has no legacy dictionary chain calls`, () => {
      assert.doesNotMatch(source, /SpeechCtx\.chain\(/);
    });
  }

  await t.test('Hero owns canonical entry playback until matching completion', () => {
    assert.match(hero, /const requestRef = React\.useRef\(null\);/);
    assert.match(
      hero,
      /const requestId = SpeechCtx\.playEntry\(\s*current,\s*\{\s*onDone:/s,
    );
    assert.match(hero, /if \(requestRef\.current !== requestId\) return;/);
    assert.match(hero, /requestRef\.current = requestId;/);
    assert.match(hero, /SpeechCtx\.cancel\(requestRef\.current\);/);
    assert.doesNotMatch(hero, /setTimeout\(/);
  });

  await t.test('Hero rotation pauses and restarts around active playback', () => {
    assert.match(hero, /if \(active\) return;/);
    assert.match(hero, /\}, \[active\]\);/);
  });

  await t.test('WordGrid owns canonical entry playback until matching completion', () => {
    assert.match(wordGrid, /const requestRef = React\.useRef\(null\);/);
    assert.match(
      wordGrid,
      /const requestId = SpeechCtx\.playEntry\(\s*entry,\s*\{\s*onDone:/s,
    );
    assert.match(wordGrid, /if \(requestRef\.current !== requestId\) return;/);
    assert.match(wordGrid, /requestRef\.current = requestId;/);
    assert.match(wordGrid, /SpeechCtx\.cancel\(requestRef\.current\);/);
    assert.doesNotMatch(wordGrid, /setTimeout\(/);
  });

  await t.test('Famous resolves and plays the full dictionary entry', () => {
    assert.match(famous, /DICT_ALL\.find\(d => d\.w === m\.w\)/);
    assert.match(famous, /SpeechCtx\.playEntry\(entry\)/);
  });

  await t.test('Command Palette Enter plays the selected entry', () => {
    assert.match(
      palette,
      /else if \(e\.key === 'Enter'\)[\s\S]*?if \(r\) SpeechCtx\.playEntry\(r\);/,
    );
  });

  await t.test('Command Palette click plays the selected entry', () => {
    assert.match(palette, /onClick=\{\(\) => SpeechCtx\.playEntry\(r\)\}/);
  });

  await t.test('type-to-speak plays the matched entry', () => {
    assert.match(typeToSpeak, /SpeechCtx\.playEntry\(match\);/);
  });

  await t.test('Karaoke continues only from its current successful request', () => {
    assert.doesNotMatch(karaoke, /onend:/);
    assert.match(karaoke, /onDone:/);
    assert.match(karaoke, /completedRequestId !== activeRequestId/);
    assert.match(karaoke, /status !== 'ended'/);
  });

  await t.test('Karaoke cleanup disposes timers and its owned request', () => {
    assert.match(karaoke, /disposed = true;/);
    assert.match(karaoke, /clearTimeout\(nextTimer\);/);
    assert.match(karaoke, /SpeechCtx\.cancel\(activeRequestId\);/);
  });

  await t.test('free-text Quiz and logo feedback remain direct speech', () => {
    assert.match(quiz, /SpeechCtx\.speak\(/);
    assert.match(logo, /SpeechCtx\.speak\(/);
  });
});

test('v2 product and release fact source contract', async t => {
  const currentSources = [
    ['sections-1.jsx', SECTIONS_1_SOURCE],
    ['sections-2.jsx', SECTIONS_2_SOURCE],
    ['eggs.jsx', EGGS_SOURCE],
    ['build-v2-data.py', V2_DATA_BUILDER_SOURCE],
    ['index.html', V2_INDEX_SOURCE],
  ];

  for (const [name, source] of currentSources) {
    await t.test(`${name} omits retired product claims`, () => {
      assert.doesNotMatch(source, /~250/i);
      assert.doesNotMatch(source, /On the roadmap/i);
      assert.doesNotMatch(source, /powered by Web Speech API/i);
    });
  }

  await t.test('homepage describes committed MP3 playback with Web Speech fallback', () => {
    assert.match(SECTIONS_1_SOURCE, /(?:committed canonical|canonical committed) MP3/i);
    assert.match(SECTIONS_1_SOURCE, /Web Speech[^.]*fallback/i);
    assert.match(V2_DATA_BUILDER_SOURCE, /(?:committed canonical|canonical committed) MP3/i);
    assert.match(V2_DATA_BUILDER_SOURCE, /Web Speech[^.]*fallback/i);
  });

  await t.test('homepage describes all three shipped OS backends', () => {
    assert.match(SECTIONS_2_SOURCE, /macOS[^.]*say/i);
    assert.match(SECTIONS_2_SOURCE, /Linux[^.]*espeak-ng[^.]*espeak/i);
    assert.match(SECTIONS_2_SOURCE, /Windows[^.]*System\.Speech/i);
    assert.match(V2_DATA_BUILDER_SOURCE, /macOS[^.]*say/i);
    assert.match(V2_DATA_BUILDER_SOURCE, /Linux[^.]*espeak-ng[^.]*espeak/i);
    assert.match(V2_DATA_BUILDER_SOURCE, /Windows[^.]*System\.Speech/i);
  });

  await t.test('homepage derives and displays sourced coverage without universal claims', () => {
    assert.match(
      SECTIONS_2_SOURCE,
      /const sourcedCount = DICT_ALL\.filter\(d\s*=>\s*d\.url\)\.length;/,
    );
    assert.match(
      SECTIONS_2_SOURCE,
      /`\$\{sourcedCount\} of \$\{DICT_ALL\.length\} entries source-cited`/,
    );
    assert.doesNotMatch(
      `${SECTIONS_1_SOURCE}\n${SECTIONS_2_SOURCE}`,
      /(?:all|every) (?:1,903|1903|\$\{DICT_ALL\.length\})[^.\n]*(?:source|cited)/i,
    );
    assert.doesNotMatch(SECTIONS_2_SOURCE, /Every entry[^.\n]*(?:source|linked)/i);
    assert.match(SECTIONS_2_SOURCE, /a source citation when available/i);
    assert.doesNotMatch(
      SECTIONS_2_SOURCE,
      /audio, IPA, and a source citation, not a phonetic guess/i,
    );
  });

  await t.test('footer and noindex scaffold identify the v2.28.1 release', () => {
    assert.match(SECTIONS_2_SOURCE, /sayit · MIT · v2\.28\.1 ·/);
    assert.match(V2_INDEX_SOURCE, /1,903 entries[^"\n]*1,283[^"\n]*cited sources/i);
  });

  await t.test('noindex scaffold uses root OG URL and deferred same-origin runtime scripts', () => {
    assert.match(
      V2_INDEX_SOURCE,
      /<meta property="og:url" content="https:\/\/pronounce\.renlab\.ai\/">/,
    );
    assert.match(
      V2_INDEX_SOURCE,
      /<script defer src="\/v2\/vendor\/react\.production\.min\.js"><\/script>/,
    );
    assert.match(
      V2_INDEX_SOURCE,
      /<script defer src="\/v2\/vendor\/react-dom\.production\.min\.js"><\/script>/,
    );
    assert.doesNotMatch(V2_INDEX_SOURCE, /unpkg\.com/);
  });
});
