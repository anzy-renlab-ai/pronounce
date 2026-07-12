import { spawn, ChildProcess, spawnSync } from 'node:child_process';
import * as vscode from 'vscode';
import { lookup } from './dict';

type Backend = 'say' | 'espeak-ng' | 'espeak' | 'powershell' | null;

let running: ChildProcess | null = null;
// Bumped on every speak() call. A killed process still fires its 'exit' handler,
// and that stale handler used to run `next()` and null out `running` — wiping the
// handle to the process the NEW call had just spawned. The next click then had
// nothing to cancel, so two `say` processes talked over each other. Handlers now
// no-op unless they belong to the current generation.
let generation = 0;
let cachedBackend: Backend | undefined;

function detectBackend(): Backend {
  if (cachedBackend !== undefined) return cachedBackend;
  const has = (cmd: string) => {
    try { return spawnSync('which', [cmd]).status === 0; }
    catch { return false; }
  };
  if (process.platform === 'darwin' || has('say')) cachedBackend = 'say';
  else if (has('espeak-ng')) cachedBackend = 'espeak-ng';
  else if (has('espeak')) cachedBackend = 'espeak';
  else if (process.platform === 'win32') cachedBackend = 'powershell';
  else cachedBackend = null;
  return cachedBackend;
}

function commandFor(backend: Exclude<Backend, null>, text: string, voice: string, rate: number): [string, string[]] {
  switch (backend) {
    case 'say':
      return ['/usr/bin/say', ['-v', voice, '-r', String(rate), text]];
    case 'espeak-ng':
      return ['espeak-ng', ['-v', 'en-us', '-s', String(rate), text]];
    case 'espeak':
      return ['espeak', ['-v', 'en-us', '-s', String(rate), text]];
    case 'powershell': {
      const psRate = Math.max(-10, Math.min(10, Math.round((rate - 175) / 25)));
      const escaped = text.replace(/'/g, "''");
      const script = `Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; $s.Rate = ${psRate}; $s.Speak('${escaped}')`;
      return ['powershell.exe', ['-NoProfile', '-Command', script]];
    }
  }
}

export function speak(extensionPath: string, word: string): void {
  const backend = detectBackend();
  if (!backend) {
    vscode.window.showErrorMessage(
      vscode.l10n.t(
        'Pronounce: no TTS backend found. Install one:\n' +
        '  macOS: built-in (`say`)\n' +
        '  Linux: `sudo apt install espeak-ng` (or yum/pacman/brew)\n' +
        '  Windows: PowerShell (built into modern Windows)',
      ),
    );
    return;
  }

  const cfg = vscode.workspace.getConfiguration('pronounce');
  const voice = cfg.get<string>('voice', 'Samantha');
  const rate = cfg.get<number>('rate', 130);
  const reps = cfg.get<number>('repetitions', 1);

  const entry = lookup(extensionPath, word);
  const spoken = entry?.respelling_us || word;

  const myGen = ++generation;

  if (running) {
    running.kill('SIGTERM');
    running = null;
  }

  const queue: string[] = Array(reps).fill(spoken);

  const next = () => {
    if (myGen !== generation) return;   // superseded by a newer speak() — stay out of its way
    const text = queue.shift();
    if (!text) {
      running = null;
      return;
    }
    const [cmd, args] = commandFor(backend, text, voice, rate);
    const child = spawn(cmd, args);
    if (myGen !== generation) { child.kill('SIGTERM'); return; }  // superseded mid-spawn
    running = child;
    child.on('exit', next);
    child.on('error', (err) => {
      if (myGen !== generation) return;
      vscode.window.showErrorMessage(vscode.l10n.t('Pronounce ({0}): {1}', backend, err.message));
      running = null;
    });
  };
  next();
}
