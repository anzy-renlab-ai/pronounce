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
      md.appendMarkdown(`_${vscode.l10n.t('say:')}_ **${entry.respelling_us}**  \n`);
    }
    // Show alternate readings inline so "contested" words tell the whole story.
    if (entry.alt_respelling_us) {
      const alts = entry.alt_respelling_us.split('|').map(s => s.trim()).filter(Boolean);
      if (alts.length) {
        md.appendMarkdown(`_${vscode.l10n.t('or:')}_ ${alts.map(a => `**${a}**`).join(' · ')}  \n`);
      }
    }
    if (entry.confidence) {
      const badge = entry.confidence === 'creator-clarified' ? '✅' :
                    entry.confidence === 'contested' ? '⚖️' : '·';
      md.appendMarkdown(`${badge} _${entry.confidence}_`);
      if (entry.source_label) md.appendMarkdown(` · ${entry.source_label}`);
      md.appendMarkdown(`  \n`);
    }
    if (entry.notes) md.appendMarkdown(`\n${entry.notes}\n\n`);
    md.appendMarkdown(`[${vscode.l10n.t('🔊 Play')}](${playLink})`);
    md.appendMarkdown(`  ·  **[${vscode.l10n.t('★ Star on GitHub')}](command:pronounce.starOnGitHub)**`);
    if (entry.source_url) md.appendMarkdown(`  ·  [${vscode.l10n.t('source')}](${entry.source_url})`);
  } else {
    const requestUrl =
      `https://github.com/anzy-renlab-ai/pronounce/issues/new` +
      `?template=add-pronunciation.yml` +
      `&title=${encodeURIComponent(`Add pronunciation entry: ${word}`)}`;
    md.appendMarkdown(`**${word}**  \n[${vscode.l10n.t('🔊 Play (TTS letter-to-sound)')}](${playLink})`);
    md.appendMarkdown(`  ·  [${vscode.l10n.t('➕ Request entry')}](${requestUrl})`);
    md.appendMarkdown(`  ·  **[${vscode.l10n.t('★ Star this dictionary')}](command:pronounce.starOnGitHub)**`);
  }
  return md;
}
