import { spawn, ChildProcess, spawnSync } from 'node:child_process';
import * as vscode from 'vscode';
import { lookup } from './dict';

type Backend = 'say' | 'espeak-ng' | 'espeak' | 'powershell' | null;

let running: ChildProcess | null = null;
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
      'Pronounce: no TTS backend found. Install one:\n' +
      '  macOS: built-in (`say`)\n' +
      '  Linux: `sudo apt install espeak-ng` (or yum/pacman/brew)\n' +
      '  Windows: PowerShell (built into modern Windows)',
    );
    return;
  }

  const cfg = vscode.workspace.getConfiguration('pronounce');
  const voice = cfg.get<string>('voice', 'Samantha');
  const rate = cfg.get<number>('rate', 200);
  const reps = cfg.get<number>('repetitions', 1);

  const entry = lookup(extensionPath, word);
  const spoken = entry?.respelling_us || word;

  if (running) {
    running.kill('SIGTERM');
    running = null;
  }

  const queue: string[] = Array(reps).fill(spoken);

  const next = () => {
    const text = queue.shift();
    if (!text) {
      running = null;
      return;
    }
    const [cmd, args] = commandFor(backend, text, voice, rate);
    running = spawn(cmd, args);
    running.on('exit', next);
    running.on('error', (err) => {
      vscode.window.showErrorMessage(`Pronounce (${backend}): ${err.message}`);
      running = null;
    });
  };
  next();
}
