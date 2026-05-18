import * as vscode from 'vscode';
import { lookup, Entry } from './dict';

const WORD_RE = /[a-zA-Z][a-zA-Z0-9_.\-+#]*/;

export function makeHoverProvider(extensionPath: string): vscode.HoverProvider {
  return {
    provideHover(doc, pos) {
      const cfg = vscode.workspace.getConfiguration('pronounce');
      if (!cfg.get<boolean>('hoverEnabled', true)) return null;
      const onlyKnown = cfg.get<boolean>('hoverOnlyKnownWords', true);

      const range = doc.getWordRangeAtPosition(pos, WORD_RE);
      if (!range) return null;
      const word = doc.getText(range);
      if (!word) return null;

      const entry = lookup(extensionPath, word);
      if (!entry && onlyKnown) return null;

      return new vscode.Hover(renderMarkdown(word, entry), range);
    },
  };
}

function renderMarkdown(word: string, entry: Entry | null): vscode.MarkdownString {
  const playArgs = encodeURIComponent(JSON.stringify([{ word }]));
  const playLink = `command:pronounce.speak?${playArgs}`;
  const md = new vscode.MarkdownString();
  md.isTrusted = true;
  md.supportHtml = false;

  if (entry) {
    const display = entry.word ?? word;
    md.appendMarkdown(`**${display}**`);
    if (entry.ipa) md.appendMarkdown(` — \`/${entry.ipa.replace(/^\/|\/$/g, '')}/\``);
    md.appendMarkdown(`  \n`);
    if (entry.respelling_us) {
      md.appendMarkdown(`_say:_ **${entry.respelling_us}**  \n`);
    }
    if (entry.confidence) {
      md.appendMarkdown(`_${entry.confidence}_`);
      if (entry.source_label) md.appendMarkdown(` · ${entry.source_label}`);
      md.appendMarkdown(`  \n`);
    }
    if (entry.notes) md.appendMarkdown(`\n${entry.notes}\n\n`);
    md.appendMarkdown(`[🔊 Play](${playLink})`);
    if (entry.source_url) md.appendMarkdown(`  ·  [source](${entry.source_url})`);
  } else {
    md.appendMarkdown(`**${word}**  \n[🔊 Play (TTS letter-to-sound)](${playLink})`);
  }
  return md;
}
