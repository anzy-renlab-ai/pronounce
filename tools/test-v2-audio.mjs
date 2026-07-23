import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const AUDIO_SOURCE = readFileSync(
  new URL('../docs/v2/audio.jsx', import.meta.url),
  'utf8',
);
const WAVEFORM_MARKER = '// ========== Waveform (canvas) ==========';
const markerIndex = AUDIO_SOURCE.indexOf(WAVEFORM_MARKER);

assert.notEqual(markerIndex, -1, 'audio.jsx must keep the Waveform marker');

const SPEECH_SOURCE = AUDIO_SOURCE.slice(0, markerIndex);

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

  const sandbox = {
    Audio: MockAudio,
    queueMicrotask,
  };

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
