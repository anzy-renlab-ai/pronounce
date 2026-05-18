import { spawn, ChildProcess } from 'node:child_process';
import * as vscode from 'vscode';
import { lookup } from './dict';

let running: ChildProcess | null = null;

export function speak(extensionPath: string, word: string): void {
  if (process.platform !== 'darwin') {
    vscode.window.showErrorMessage(
      'Pronounce v0.1 is macOS-only (uses `say`). Linux/Windows backends on roadmap.',
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

  const args = ['-v', voice, '-r', String(rate)];
  const queue = Array(reps).fill(spoken);

  const next = () => {
    const text = queue.shift();
    if (!text) {
      running = null;
      return;
    }
    running = spawn('/usr/bin/say', [...args, text]);
    running.on('exit', next);
    running.on('error', (err) => {
      vscode.window.showErrorMessage(`Pronounce: ${err.message}`);
      running = null;
    });
  };
  next();
}
