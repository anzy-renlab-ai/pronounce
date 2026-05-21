import * as vscode from 'vscode';
import { speak } from './speak';
import { loadDict, dictSize } from './dict';
import { makeHoverProvider } from './hover';
import { recordSpeak } from './engagement';

const FIRST_RUN_KEY = 'pronounce.firstRunCompleted';
const REPO_URL = 'https://github.com/anzy-renlab-ai/pronounce';
const SITE_URL = 'https://pronounce.renlab.ai/';
const SPONSOR_URL = 'https://ko-fi.com/alvinanziyan';

export function activate(ctx: vscode.ExtensionContext): void {
  const root = ctx.extensionPath;
  loadDict(root);

  const speakAndRecord = (word: string) => {
    speak(root, word);
    void recordSpeak(ctx);
  };

  ctx.subscriptions.push(
    vscode.commands.registerCommand('pronounce.speak', (arg?: string | { word?: string }) => {
      const word = typeof arg === 'string' ? arg : arg?.word;
      if (!word) {
        vscode.window.showWarningMessage(vscode.l10n.t('Pronounce: no word provided.'));
        return;
      }
      speakAndRecord(word);
    }),

    vscode.commands.registerCommand('pronounce.speakSelection', () => {
      const ed = vscode.window.activeTextEditor;
      if (!ed) return;
      const sel = ed.document.getText(ed.selection).trim();
      const word = sel || ed.document.getText(ed.document.getWordRangeAtPosition(ed.selection.active) ?? new vscode.Range(0, 0, 0, 0));
      if (!word) {
        vscode.window.showWarningMessage(vscode.l10n.t('Pronounce: nothing selected.'));
        return;
      }
      speakAndRecord(word);
    }),

    vscode.commands.registerCommand('pronounce.search', async () => {
      const dict = loadDict(root);
      const items: vscode.QuickPickItem[] = Object.values(dict).map((e) => ({
        label: e.word,
        description: e.ipa ? `/${e.ipa.replace(/^\/|\/$/g, '')}/` : undefined,
        detail: e.respelling_us ? `say: ${e.respelling_us}` : undefined,
      }));
      const pick = await vscode.window.showQuickPick(items, {
        matchOnDescription: true,
        matchOnDetail: true,
        placeHolder: vscode.l10n.t('Search {0} pronunciations · ⌘⇧P → "Star" to support the dictionary', items.length),
      });
      if (pick) speakAndRecord(pick.label);
    }),

    vscode.commands.registerCommand('pronounce.openWebsite', () => {
      void vscode.env.openExternal(vscode.Uri.parse(SITE_URL));
    }),

    vscode.commands.registerCommand('pronounce.starOnGitHub', () => {
      void vscode.env.openExternal(vscode.Uri.parse(REPO_URL));
    }),

    vscode.commands.registerCommand('pronounce.sponsor', () => {
      void vscode.env.openExternal(vscode.Uri.parse(SPONSOR_URL));
    }),

    vscode.commands.registerCommand('pronounce.openWalkthrough', () => {
      void vscode.commands.executeCommand(
        'workbench.action.openWalkthrough',
        'sayit.pronounce#pronounce.welcome',
        false,
      );
    }),

    vscode.languages.registerHoverProvider({ scheme: 'file' }, makeHoverProvider(root)),
    vscode.languages.registerHoverProvider({ scheme: 'untitled' }, makeHoverProvider(root)),
  );

  // Status bar — persistent reminder + 1-click speak.
  // The tooltip is a Markdown string with a command link → Star, so users who
  // hover the status bar see the ★ Star CTA without intrusive prompts.
  const cfg = vscode.workspace.getConfiguration('pronounce');
  if (cfg.get<boolean>('statusBar', true)) {
    const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 50);
    bar.text = '$(unmute) sayit';
    const tip = new vscode.MarkdownString(
      `${vscode.l10n.t('**Pronounce** · {0} sourced dictionary entries', dictSize(root))}\n\n` +
      `${vscode.l10n.t('Click to speak the current selection.')}  \n` +
      `**[${vscode.l10n.t('★ Star on GitHub')}](command:pronounce.starOnGitHub)** — ${vscode.l10n.t('keeps the dictionary growing')}  \n` +
      `[${vscode.l10n.t('Search')}](command:pronounce.search) · ` +
      `[${vscode.l10n.t('Website')}](command:pronounce.openWebsite) · ` +
      `[${vscode.l10n.t('☕ Coffee')}](command:pronounce.sponsor)`,
    );
    tip.isTrusted = true;
    bar.tooltip = tip;
    bar.command = 'pronounce.speakSelection';
    bar.show();
    ctx.subscriptions.push(bar);
  }

  // First-run walkthrough — fires once per machine.
  if (!ctx.globalState.get<boolean>(FIRST_RUN_KEY)) {
    void ctx.globalState.update(FIRST_RUN_KEY, true);
    void vscode.commands.executeCommand(
      'workbench.action.openWalkthrough',
      'sayit.pronounce#pronounce.welcome',
      false,
    );
  }
}

export function deactivate(): void {}
