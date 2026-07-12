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
      const rawWord = doc.getText(range);
      if (!rawWord) return null;

      // Try the exact token first so dotted entries (next.js, three.js) resolve.
      // If that misses, retry with trailing punctuation stripped — a sentence-
      // final "kubectl." / "YAML." otherwise matches the whole token and misses
      // the dictionary key, making the hover silently vanish (the single most
      // common place a dev hovers a tech word in prose).
      let word = rawWord;
      let entry = lookup(extensionPath, rawWord);
      let hoverRange = range;
      if (!entry) {
        const trimmed = rawWord.replace(/[.\-+#_]+$/, '');
        if (trimmed && trimmed !== rawWord) {
          const trimmedEntry = lookup(extensionPath, trimmed);
          if (trimmedEntry) {
            entry = trimmedEntry;
            word = trimmed;
            hoverRange = new vscode.Range(range.start, range.start.translate(0, trimmed.length));
          }
        }
      }

      if (!entry && onlyKnown) return null;

      return new vscode.Hover(renderMarkdown(word, entry), hoverRange);
    },
  };
}

// Dictionary text is data, not markup. Neutralize the characters that would let
// a row's notes/labels close out of their span and inject their own link — a
// trusted hover renders `command:` URIs, so an injected link would be clickable.
function esc(s: string): string {
  return s.replace(/[\\`*_{}[\]()<>#+\-.!|]/g, '\\$&');
}

// Only http(s) may become a link target; anything else renders as inert text.
// Parens are percent-encoded rather than rejected — 25 sources are Wikipedia
// URLs like /wiki/Monad_(functional_programming), and a bare ")" would close the
// markdown link early.
function safeUrl(u: string): string | null {
  if (!/^https?:\/\/\S+$/i.test(u)) return null;
  return u.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function renderMarkdown(word: string, entry: Entry | null): vscode.MarkdownString {
  const playArgs = encodeURIComponent(JSON.stringify([{ word }]));
  const playLink = `command:pronounce.speak?${playArgs}`;
  const md = new vscode.MarkdownString();
  // Trust only our own two commands, never the full command surface.
  md.isTrusted = { enabledCommands: ['pronounce.speak', 'pronounce.starOnGitHub'] };
  md.supportHtml = false;

  if (entry) {
    const display = entry.word ?? word;
    md.appendMarkdown(`**${esc(display)}**`);
    if (entry.ipa) md.appendMarkdown(` — \`/${entry.ipa.replace(/^\/|\/$/g, '').replace(/`/g, '')}/\``);
    md.appendMarkdown(`  \n`);
    if (entry.respelling_us) {
      md.appendMarkdown(`_${vscode.l10n.t('say:')}_ **${esc(entry.respelling_us)}**  \n`);
    }
    // Show alternate readings inline so "contested" words tell the whole story.
    if (entry.alt_respelling_us) {
      const alts = entry.alt_respelling_us.split('|').map(s => s.trim()).filter(Boolean);
      if (alts.length) {
        md.appendMarkdown(`_${vscode.l10n.t('or:')}_ ${alts.map(a => `**${esc(a)}**`).join(' · ')}  \n`);
      }
    }
    if (entry.confidence) {
      const badge = entry.confidence === 'creator-clarified' ? '✅' :
                    entry.confidence === 'contested' ? '⚖️' : '·';
      md.appendMarkdown(`${badge} _${esc(entry.confidence)}_`);
      if (entry.source_label) md.appendMarkdown(` · ${esc(entry.source_label)}`);
      md.appendMarkdown(`  \n`);
    }
    if (entry.notes) md.appendMarkdown(`\n${esc(entry.notes)}\n\n`);
    md.appendMarkdown(`[${vscode.l10n.t('🔊 Play')}](${playLink})`);
    md.appendMarkdown(`  ·  **[${vscode.l10n.t('★ Star on GitHub')}](command:pronounce.starOnGitHub)**`);
    const src = entry.source_url ? safeUrl(entry.source_url) : null;
    if (src) md.appendMarkdown(`  ·  [${vscode.l10n.t('source')}](${src})`);
  } else {
    const requestUrl =
      `https://github.com/anzy-renlab-ai/pronounce/issues/new` +
      `?template=add-pronunciation.yml` +
      `&title=${encodeURIComponent(`Add pronunciation entry: ${word}`)}`;
    md.appendMarkdown(`**${esc(word)}**  \n[${vscode.l10n.t('🔊 Play (TTS letter-to-sound)')}](${playLink})`);
    md.appendMarkdown(`  ·  [${vscode.l10n.t('➕ Request entry')}](${requestUrl})`);
    md.appendMarkdown(`  ·  **[${vscode.l10n.t('★ Star this dictionary')}](command:pronounce.starOnGitHub)**`);
  }
  return md;
}
