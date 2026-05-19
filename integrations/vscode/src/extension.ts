import * as vscode from 'vscode';
import { speak } from './speak';
import { loadDict } from './dict';
import { makeHoverProvider } from './hover';

const FIRST_RUN_KEY = 'pronounce.firstRunCompleted';
const REPO_URL = 'https://github.com/anzy-renlab-ai/pronounce';
const SITE_URL = 'https://pronounce.renlab.ai/';

export function activate(ctx: vscode.ExtensionContext): void {
  const root = ctx.extensionPath;

  // eager-load so first hover/command has no parse latency
  loadDict(root);

  ctx.subscriptions.push(
    vscode.commands.registerCommand('pronounce.speak', (arg?: string | { word?: string }) => {
      const word = typeof arg === 'string' ? arg : arg?.word;
      if (!word) {
        vscode.window.showWarningMessage('Pronounce: no word provided.');
        return;
      }
      speak(root, word);
    }),

    vscode.commands.registerCommand('pronounce.speakSelection', () => {
      const ed = vscode.window.activeTextEditor;
      if (!ed) return;
      const sel = ed.document.getText(ed.selection).trim();
      const word = sel || ed.document.getText(ed.document.getWordRangeAtPosition(ed.selection.active) ?? new vscode.Range(0, 0, 0, 0));
      if (!word) {
        vscode.window.showWarningMessage('Pronounce: nothing selected.');
        return;
      }
      speak(root, word);
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
        placeHolder: `Search ${items.length} pronunciations…`,
      });
      if (pick) speak(root, pick.label);
    }),

    vscode.commands.registerCommand('pronounce.openWebsite', () => {
      void vscode.env.openExternal(vscode.Uri.parse(SITE_URL));
    }),

    vscode.commands.registerCommand('pronounce.starOnGitHub', () => {
      void vscode.env.openExternal(vscode.Uri.parse(REPO_URL));
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

  // Status bar item — persistent reminder + 1-click speak.
  const cfg = vscode.workspace.getConfiguration('pronounce');
  if (cfg.get<boolean>('statusBar', true)) {
    const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 50);
    bar.text = '$(unmute) sayit';
    bar.tooltip = 'Pronounce: click to speak the current selection · 817 sourced entries';
    bar.command = 'pronounce.speakSelection';
    bar.show();
    ctx.subscriptions.push(bar);
  }

  // First-run walkthrough — fires once per machine, not on every reload.
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
