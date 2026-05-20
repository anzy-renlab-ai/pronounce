import * as path from 'node:path';
import * as fs from 'node:fs';

export interface Entry {
  word: string;
  ipa?: string;
  respelling_us?: string;
  alt_ipa?: string;
  alt_respelling_us?: string;
  source_url?: string;
  source_label?: string;
  category?: string;
  confidence?: string;
  notes?: string;
}

let cache: Record<string, Entry> | null = null;

export function loadDict(extensionPath: string): Record<string, Entry> {
  if (cache) return cache;
  const p = path.join(extensionPath, 'out', 'dictionary.json');
  cache = JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, Entry>;
  return cache;
}

export function lookup(extensionPath: string, word: string): Entry | null {
  const dict = loadDict(extensionPath);
  return dict[word.toLowerCase()] ?? null;
}

export function dictSize(extensionPath: string): number {
  return Object.keys(loadDict(extensionPath)).length;
}
